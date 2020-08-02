//Module Loading
var express = require("express");
var request = require("request");
const cheerio = require("cheerio");
const axios = require("axios");
var bodyParser = require("body-parser");
const dotenv=require('dotenv')

var app = express();
dotenv.config();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
//variables
var parsedata = "";
var siteUrl = "";
var result = {};
var globalresult = {};
var id = "";
var postcount = "";
var count1 = 0;
var IsNextPage = true;
var end_Cursor = null;
let profilepicurl = "";
let full_name = "";
let bio = "";
var serachterm = "";
var list = {};

const fetchData = async () => {
    try {
        result = await axios.get(siteUrl);
        globalresult = result.data;
        // console.log(globalresult);               //return file as object
        return cheerio.load(result.data);
    }
    catch (e) {
        console.error(e); // log internal error
        return next(new Error('Internal Server Error')); // return public error to client
    }

};
app.get("/", async (req, res) => {
    try {
        res.render("home.ejs");
    }
    catch (e) {
        console.error(e); // log internal error
        return next(new Error('Internal Server Error')); // return public error to client
    }
});

app.post("/username", async (req, res) => {
    try {
        parsedata = req.body.userID;
        // siteUrl = "https://www.instagram.com/" + parsedata + "/?__a=1";
        siteUrl = `${process.env.Basic_uri}/${parsedata}/?__a=1`;
        //for getting user ID and post count of user
        await fetchData();
        //id=globalresult.logging_page_id.slice(12,22);
        id = globalresult.graphql.user.id;
        console.log(id)
        profilepicurl = globalresult.graphql.user.profile_pic_url;
        full_name = globalresult.graphql.user.full_name;
        bio = globalresult.graphql.user.biography;
        postcount = globalresult.graphql.user.edge_owner_to_timeline_media.count;
        //using their data in another api to get all media
        //itteration to fetch all data using end curser and new link
        // siteUrl = 'https://instagram.com/graphql/query/?query_hash=44efc15d3c13342d02df0b5a9fa3d33f&variables={"id":' + id + ',"first":50,"after":null}';
        siteUrl = `${process.env.Main_uri}${id},"first":50,"after":null}`;
        globalresult = {};
        await fetchData();
        IsNextPage = globalresult.data.user.edge_owner_to_timeline_media.page_info.has_next_page;
        end_Cursor = globalresult.data.user.edge_owner_to_timeline_media.page_info.end_cursor;
        data = globalresult.data.user.edge_owner_to_timeline_media.edges;

        res.render("resultup.ejs", { nextpage: IsNextPage, endcursor: end_Cursor, data: data, userid: id, postcount: postcount, fullname: full_name, bio: bio, k: count1, profilepicurl: profilepicurl, username: parsedata });
    }
    catch (e) {
        console.error(e); // log internal error
        return next(new Error('Internal Server Error')); // return public error to client
    }
});
app.get("/next", async (req, res) => {
    try {
        // siteUrl = 'https://instagram.com/graphql/query/?query_hash=44efc15d3c13342d02df0b5a9fa3d33f&variables={"id":' + id + ',"first":50,"after":"' + end_Cursor + '"}';
           siteUrl=`${process.env.Main_uri}${id},"first":50,"after":"${end_Cursor}"}`;
        await fetchData();
        IsNextPage = globalresult.data.user.edge_owner_to_timceline_media.page_info.has_next_page;
        end_Cursor = globalresult.data.user.edge_owner_to_timeline_media.page_info.end_cursor;
        data = globalresult.data.user.edge_owner_to_timeline_media.edges;
        res.render("resultup.ejs", { nextpage: IsNextPage, endcursor: end_Cursor, data: data, userid: id, postcount: postcount, fullname: full_name, bio: bio, k: count1, profilepicurl: profilepicurl, username: parsedata })

    } catch (e) {
        console.error(e); // log internal error
        return next(new Error('Internal Server Error')); // return public error to client
    }
})

app.get("/inframe/bar", async (req, res) => {

    try {

        res.render("search.ejs");
    } catch (e) {
        console.log(e);
        return next(new Error('Internal Server Error'));
    }
})

app.post("/inframe/term", async (req, res) => {
    try {
        serachterm = req.body.search;

        // siteUrl = 'https://www.instagram.com/web/search/topsearch/?context=blended&query=' + serachterm;
        siteUrl = `${process.env.Search_uri}${serachterm}`;
        await fetchData();
        list = globalresult.users;
        //console.log(list);

        res.render("term.ejs", { list: list });
    } catch (e) {
        console.log(e);
        return next(new Error('Internal Server Error'));
    }
})

app.listen(5000, () => {
    console.log("Serever online");
});
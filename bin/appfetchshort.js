//Module Loading
var express = require("express");
var request = require("request");
const cheerio = require("cheerio");
const axios = require("axios");
var bodyParser = require("body-parser");

var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
//variables
var parsedata = {};
var siteUrl = "";
var result = {};
var result2 = {};
var globalresult = {};
var id="";
var postcount="";
var count1=0;
var IsNextPage=true;
var end_Cursor=null;
let profilepicurl="";
let full_name="";
let bio="";

const fetchData = async () => {
    try {
        result = await axios.get(siteUrl);
        
        globalresult = result.data;               //return file as object
        return cheerio.load(result.data);
    }
    catch (e) {
        console.error(e); // log internal error
        return next(new Error('Internal Server Error')); // return public error to client
    }
    
};
app.get("/",async (req, res) =>{
    try{
    res.render("home.ejs");
    }
    catch (e) {
        console.error(e); // log internal error
        return next(new Error('Internal Server Error')); // return public error to client
    }
});

app.get("/username", async (req, res)=> {
    try {
        
       // siteUrl = "https://www.instagram.com/p/B8ggYH-JvWf/";
      // siteUrl = "https://www.instagram.com/rajo_shree";
    //   siteUrl = "https://stackoverflow.com/questions/54965978/passing-data-from-node-js-to-html-using-ejs";
    //   siteUrl = "https://p.coomeet.com/gender";
    //   siteUrl = "https://www.google.com";
      siteUrl = "https://www.geeksforgeeks.org/java/";

        //siteUrl = 'https://instagram.com/graphql/query/?query_hash=44efc15d3c13342d02df0b5a9fa3d33f&variables={"id":4179440085,"first":50,"after":null}';
        await fetchData();
        
        parsedata=globalresult;
        console.log(typeof parsedata);
      //  console.log(parsedata);

      // data=globalresult.data.user.edge_owner_to_timeline_media.edges;
      res.render("fetchshort.ejs",{htmlcode:parsedata})
  
       // res.render("resultup.ejs", {endcursor:end_Cursor,data:data, userid:id, postcount:postcount,fullname:full_name,bio:bio,k:count1,profilepicurl:profilepicurl,username:parsedata});
    }
    catch (e) {
        console.error(e); // log internal error
        return next(new Error('Internal Server Error')); // return public error to client
    }
});


app.listen(3000, () => {
    console.log("Serever online");
 });
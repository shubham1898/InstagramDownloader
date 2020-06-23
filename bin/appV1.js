//Module Loading
var express = require("express");
var request = require("request");
const cheerio = require("cheerio");
const axios = require("axios");
var bodyParser = require("body-parser");

var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
//variables
var parsedata="";
var siteUrl = "";
var result = {};
var globalresult={};
var ret={};

//body
const fetchData = async() => {// 
    try{
       result =await  axios.get(siteUrl);//
    console.log(result.data);
    globalresult=result.data;
    console.log(globalresult);
fetchdata(globalresult);
   // console.log(typeof result.data.graphql.user.edge_followed_by.count);               //return file as object
   return cheerio.load(result.data);}
   catch (e) {
      console.error(e); // log internal error
      return next(new Error('Internal Server Error')); // return public error to client
    }
 };

function fetchdata(globe){
   ret=globe;
   // console.log(ret);
}
app.get("/", function (req, res) {
   // console.log(siteUrl);
   // fetchData();
   res.render("home.ejs");
});
var i=0;
app.post("/username",async function (req, res) {
    try{
       parsedata = req.body.userID;
   //  siteUrl = "https://www.instagram.com/"+parsedata+"/?__a=1";
    siteUrl='https://instagram.com/graphql/query/?query_id=17888483320059182&variables={"id":"1951415043","first":20,"after":null}';
    console.log(siteUrl);
   await fetchData();                                //!important await will stop the code till its attched code is not completely executed then it wil move to next line
                                                      //await is only used with async function
   // console.log(ret);
   // console.log(globalresult.data.user.edge_owner_to_timeline_media.edges[2].node.display_url);
   // fetchData();
   console.log(globalresult.data.user.edge_owner_to_timeline_media.edges[2].node.display_url);

  console.log(typeof parsedata);
  
   res.render("result.ejs",{userid:parsedata});
}
catch (e) {
   console.error(e); // log internal error
   return next(new Error('Internal Server Error')); // return public error to client
 }
});

app.listen(3000, () => {
   console.log("Serever online");
});


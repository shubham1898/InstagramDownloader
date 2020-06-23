// var express=require("express");
// var request=require("request");
// const cheerio = require("cheerio");
// const axios = require("axios");
// const siteUrl = "https://www.instagram.com/shubhamshrivastav1898/?__a=1";
// var result={};

//   var app=express();
// var bodyParser=require("body-parser");
//                                                           // app.use(express.static("public"));
// app.use(bodyParser.urlencoded({extended: true}));

//                                                         // app.get("/",(req,res)=>{
//                                                         //     // res.send("Connected 123")
//                                                         //     res.render("home.ejs");
//                                                         // });
//                                                         // app.get("/",(req,res)=>{
//                                                         //        var url= "http://www.instagram.com/shubhamshrivastav1898/?__a=1";
//                                                         //         console.log(url);
// const fetchData = async () => {
//      result = await axios.get(siteUrl);//
//     console.log(typeof result.data.graphql.user.edge_followed_by.count);               //return file as object
//     return cheerio.load(result.data);
//   };
 

//   app.get("/",(req,res)=>{
//     //   console.log(result.data); 
//     fetchData();
//     res.send(result.data.logging_page_id);
//   });

//     // request("www.google.com",function(error,body,response){          !Important Normal api request will not work use chrrio and axio get json file
//     //     if(!error && response.statusCode == 200){
//     //         console.log(typeof body);
//     //         var parsedata=JSON.parse(body);
//     //         res.send(parsedata);
//     //          console.log(parsedata);
//     //     }
       
//     // });
// // });
// app.listen(3000,()=>{
//     console.log("Serever online")
// });
app.post("/username",function (req, res) {
    try{
       parsedata = req.body.userID;
   //  siteUrl = "https://www.instagram.com/"+parsedata+"/?__a=1";
    siteUrl='https://instagram.com/graphql/query/?query_id=17888483320059182&variables={"id":"1951415043","first":20,"after":null}';
    console.log(siteUrl);
   await fetchData();
   // console.log(ret);
//    console.log(globalresult.data.user.edge_owner_to_timeline_media.edges[2].node.display_url);
//    fetchData();
   console.log(globalresult.data.user.edge_owner_to_timeline_media.edges[2].node.display_url);

  console.log(typeof parsedata);
  
   res.render("result.ejs",{userid:parsedata});
}
catch (e) {
   console.error(e); // log internal error
   return next(new Error('Internal Server Error')); // return public error to client
 }
});
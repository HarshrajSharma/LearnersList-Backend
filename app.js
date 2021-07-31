const express = require("express");
const axios = require("axios");
const https = require("https");
const bodyParser = require("body-parser");
var cors = require("cors");
const { response } = require("express");
require("dotenv").config();

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cors());
app.use(bodyParser.json());

let enteredURL = "";
let playlistId = "";
let fetchedDetails = []; //Will sve complete JSON file from api request.
let videoID = []; //Will save video ID of each video in the playlist.
let fetchedJSON;

function paginationVideoId() {
  if(response.data.nextPageToken===null){
    //Send the appended videoIdArray
    res.send(videoIdArray);
  }else{
    axios.get()
    .then(function (respons) {

      let fetched = respons.data.items;

      //This will log video ID of all the videos in the playlist
      fetched.forEach((element) => {

          videoIdArray.push(element.snippet.resourceId.videoId);
      });

      console.log(videoIdArray);
      res.send(videoIdArray);
  })
  }
  paginationVideoId();
}

app.get("/", function (req, res) {
  
    res.send("Hello!");
});


//This /linkSerch route receives a youtube playlist link and sends back the playlist ID
app.post("/linkSearch", function (req, res) {
    // res.send("Hello Link!")
    let playlistLink = req.body.playlistLink;
    // console.log(link)
    let playlistID = playlistLink.substring(38);
    // console.log(playlistID);
    res.send(playlistID);
  });





//This /videoArray route receives a playlist ID and sends back the array of video ID
app.post("/videoIdArray", function (req, res) {
  
  let videoIdArray = [];
  // console.log(req.body.playlistID);
  const url =
    "https://www.googleapis.com/youtube/v3/playlistItems?key=" +
    process.env.YTAPICHECK +
    "&playlistId=" +
    req.body.playlistID +
    "&part=snippet&maxResults=1001";
    // console.log(process.env.YTAPI)
    axios.get(url)
    .then(function (response) {

        let fetched = response.data.items;

        //This will log video ID of all the videos in the playlist
        fetched.forEach((element) => {

            videoIdArray.push(element.snippet.resourceId.videoId);
        });
        // paginationVideoId();
        // console.log(videoIdArray);
        res.send(videoIdArray);
    })
    .catch((error)=>{
      console.log("Error Found!");
      res.sendStatus(404);
    })
});



// This /videoTitle route recieves a playlist ID and sends back the array of video title from the playlist
app.post("/videoTitle", function (req, res) {
  
    let videoTitleArray = [];

  // console.log(req.body.playlistID);
  const url =
    "https://www.googleapis.com/youtube/v3/playlistItems?key=" +
    process.env.YTAPICHECK +
    "&playlistId=" +
    req.body.playlistID +
    "&part=snippet&maxResults=1001";
  // console.log(process.env.YTAPI)
  axios.get(url)
  .then(function (response) {
    
    let fetched = response.data.items;
    
    //This will log video ID of all the videos in the playlist
    fetched.forEach((element) => {
      
      videoTitleArray.push(element.snippet.title);
    });
    // console.log(videoTitleArray);  
    res.send(videoTitleArray);
  })
  .catch((error)=>{
    console.log("Error Found!");
    res.sendStatus(404);
  })
});



app.listen(process.env.PORT || 5000, function () {
  console.log("Server started at port 5000");
});

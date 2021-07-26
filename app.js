const express = require("express");
const axios = require("axios");
const https = require("https");
const bodyParser = require("body-parser");
var cors = require("cors");
require("dotenv").config();


const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cors());
app.use(bodyParser.json());

let enteredURL = "";
let playlistId = "";
let fetchedDetails = [];  //Will sve complete JSON file from api request.
let videoID = [];         //Will save video ID of each video in the playlist.





app.get("/", function (req, res) {
    // res.sendFile(__dirname+"/index.html");
    if (videoID.length === 0) {
        res.sendFile(__dirname + "/index.html")
    } else {
        // res.send("VideoID found");
        videoID.forEach(element => {
            res.write("<p>" + element + "</p>");
        });
        res.send();
    }
});
app.post("/", function (req, res) {
    res.send("Done");
    console.log(req.body.link);
    enteredURL = req.body.link;
    playlistId = enteredURL.substring(38,);


    const url = "https://www.googleapis.com/youtube/v3/playlistItems?key=" + process.env.YTAPI + "&playlistId=" + playlistId + "&part=contentDetails";
    console.log(process.env.YTAPI)
    axios.get(url).then(function (response) {
        // console.log(response.data);
        fetchedDetails = response.data.items;
        // console.log(fetchedDetails);



        //This will log video ID of all the videos in the playlist
        fetchedDetails.forEach(element => {
            // console.log(element.id);
            videoID.push(element.contentDetails.videoId);
        });
        console.log(videoID);
    });




});


app.post("/videoIdArray", function (req, res) {

    let playlistLink = "https://www.youtube.com/playlist?list=" + req.body.playlistID;
    // console.log(playlistLink);
    let videoIdArray = [];



    console.log(req.body.playlistID);
    const url = "https://www.googleapis.com/youtube/v3/playlistItems?key=" + process.env.YTAPICHECK + "&playlistId=" + req.body.playlistID + "&part=contentDetails&maxResults=100";
    // console.log(process.env.YTAPI)
    axios.get(url).then(function (response) {
        // console.log(response.data);
        let fetched = response.data.items;
        // console.log(fetchedDetails);



        //This will log video ID of all the videos in the playlist
        fetched.forEach(element => {
            // console.log(element.id);
            videoIdArray.push(element.contentDetails.videoId);
        });
        console.log(videoIdArray);
        res.send(videoIdArray);
    });
    // res.send(videoIdArray);

});



app.post("/test", (req, res)=>{
    console.log(req.body.playlistID);
    let a=[];
    a.push(req.body.playlistID);
    a.push(req.body.playlistID);
    a.push(req.body.playlistID);
    a.push(req.body.playlistID);
    res.send(a);
})




app.post("/linkSearch", function (req, res) {
    // res.send("Hello Link!");
    let playlistLink = req.body.playlistLink;
    // console.log(link);
    let playlistID = playlistLink.substring(38,);
    console.log(playlistID);
    res.send(playlistID);
});

app.listen(5000, function () {
    console.log("Server started at port 5000");
})

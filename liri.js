require("dotenv").config();

var fs = require("fs");

var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

var arg1 = process.argv[2];
var arg2 = process.argv[3];

//if the user wants to view their last 20 tweets and post dates
if (arg1 === "my-tweets") {
    console.log("User command is accepted.");
} 
//if the user wants to look up a song (artist(s), song name, preview link, album)
else if (arg1 === "spotify-this-song" && arg2 !== " ") {
    console.log("User command is accepted.");
} //if the user leaves arg2 blank
else if (arg1 === "spotify-this-song" && arg2 === " ") {
    console.log("User command is accepted, but only for The Sign");
}
//if the user enters a movie name as arg2
else if (arg1 === "movie-this" && arg2 !== " ") {
    console.log("User command is accepted.");
} 
//if the user does NOT enter a movie name
else if (arg1 === "movie-this" && arg2 === " ") {
    console.log("User command is accepted.");
} 
//if the user wants to.......
else if (arg1 === "do-what-it-says") {
    fs.readFile("random.txt", "utf-8", function(error, data) {
        if (error) {
          return console.log("Failed to execute do-what-it-says" + error);
        } else {
            console.log(data);
            console.log("User command do-what-it-says is accepted.");
        }
    });
}
else {
    //when the user enters an invalid command
    console.log("User command not accepted, punk!");
}
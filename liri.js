require("dotenv").config();

var fs = require("fs");
var request = require("request");
var keys = require("./keys.js");
var Twitter = require("twitter");
var Spotify = require("spotify");

var arg1 = process.argv[2];
var arg2 = process.argv[3];

function displayTweets() {
    //URL leads to LIRINodeTime's profile timeline
    var client = new Twitter(keys.twitter);
    var twitterArray = [];
    var params = {screen_name: "rwieberdink1",
                exclude_replies: true,
                count: 20,
                };
    client.get("statuses/user_timeline", params, function(error, tweets, response) {
        if (!error) {
            for (var i =0; i <= 19; i++) {
                twitterArray.push(tweets);
                console.log("Created at: " + tweets[i].created_at +
                            "\n" + tweets[i].text +
                            "\n" + tweets[i].user.name + "\n");
            }
            
        }
    });
} 

function displaySpotify() {
    var spotify = new Spotify(keys.spotify);

}

function displayMovie() {
    var movie = process.argv[3];
    request("https://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy", function(error, response, body) {
        if (error) {
            console.log("OMDB request DENIED, suckah!");
        } else if (!error && response.statusCode === 200) {
            var movieData = JSON.parse(body);
            console.log("Movie Title: " + movieData.Title + 
                    "\nYear Released: " + movieData.Year + 
                    "\nIMDB Rating: " + movieData.imdbRating +
                    "\nRotten Tomatoes: " + movieData.Ratings[1].Value + 
                    "\nCountry: " + movieData.Country + 
                    "\nLanguage: " + movieData.Language + 
                    "\nPlot: " + movieData.Plot + 
                    "\nActors: " + movieData.Actors);
        }
    });
}

function displayFillerMovie() {
    request("https://www.omdbapi.com/?t=mr+nobody&y=&plot=short&apikey=trilogy", function(error, response, body) {
        if (error) {
            console.log("OMDB request denied. Whoops.");
        } else if (!error && response.statusCode === 200) {
            var movieData = JSON.parse(body);
            console.log("Movie Title: " + movieData.Title + 
                    "\nYear Released: " + movieData.Year + 
                    "\nIMDB Rating: " + movieData.imdbRating +
                    "\nRotten Tomatoes: " + movieData.Ratings[1].Value + 
                    "\nCountry: " + movieData.Country + 
                    "\nLanguage: " + movieData.Language + 
                    "\nPlot: " + movieData.Plot + 
                    "\nActors: " + movieData.Actors);
        }
    });
}

//if the user wants to view their last 20 tweets and post dates
if (arg1 === "my-tweets") {
    console.log("User command is accepted.");
    displayTweets();
} 
//if the user wants to look up a song (artist(s), song name, preview link, album)
else if (arg1 === "spotify-this-song" && arg2 !== " ") {
    console.log("User command is accepted.");
} //if the user leaves arg2 blank
else if (arg1 === "spotify-this-song" && arg2 === " ") {
    console.log("User command is accepted, but only for The Sign");
}
//if the user enters a movie name as arg2
else if (arg1 === "movie-this" && arg2) {
    console.log("User command is accepted.");
    displayMovie();
} 
//if the user does NOT enter a movie name
else if (arg1 === "movie-this" && !arg2) {
    console.log("Whoops! User did not provide a movie title.");
    displayFillerMovie();
} 
//if the user wants to.......
else if (arg1 === "do-what-it-says") {
    fs.readFile("random.txt", "utf-8", function(error, data) {
        if (error) {
          return console.log("Failed to execute do-what-it-says" + error);
        } else {
            var string = data.split(",");
            console.log("Argument 1: " + data[0] + "Argument 2: " + data[1]);
            console.log("User command do-what-it-says is accepted.");
        }
    });
}
else {
    //when the user enters an invalid command
    console.log("User command not accepted, punk!");
}
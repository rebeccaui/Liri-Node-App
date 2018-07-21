require("dotenv").config();

var fs = require("fs");
var request = require("request");
var keys = require("./keys.js");
var Twitter = require("twitter");
var Spotify = require("node-spotify-api");

//Accept user arguments from the command line
var arg1 = process.argv[2];
var arg2 = process.argv[3];
for(var i = 4; i < process.argv.length; i++) {
    var arg2 = arg2 + " " + process.argv[i];
    }

    //if the user wants to view their last 20 tweets and post dates
if (arg1 === "my-tweets") {
    displayTweets();
} 
//if the user wants to look up a song (artist(s), song name, preview link, album)
else if (arg1 === "spotify-this-song" && arg2) {
    displaySpotify();
} //if the user leaves arg2 blank
else if (arg1 === "spotify-this-song" && !arg2) {
    displayFillerSpotify();
}
//if the user enters a movie name as arg2
else if (arg1 === "movie-this" && arg2) {
    displayMovie();
} 
//if the user does NOT enter a movie name
else if (arg1 === "movie-this" && !arg2) {
    displayFillerMovie();
} 
//if the user wants to.......
else if (arg1 === "do-what-it-says") {
    fs.readFile("random.txt", "utf-8", function(error, data) {
        if (error) {
          return console.log("Failed to execute do-what-it-says: " + error);
        } else {
            var string = data.split(",");
            console.log("Argument 1: " + data[0] + "Argument 2: " + data[1]);
            console.log("User command do-what-it-says is accepted.");
        }
    });
}
else {
    //when the user enters an invalid command
    console.log("Hello! I am LIRI." + 
                "\nThink of me as your pocket dictionary!" +
                "\nUse your computer's command line to get info about..." +
                "\nMusic: node liri.js spotify-this-song song-title" +
                "\nMy Tweets: node liri.js my-tweets" +
                "\nMovies: node liri.js movie-this movie-title" +
                "\n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
}

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
    spotify.search({type: 'track', query: arg2, limit: 3}, function(error, data) {
        if (error) {
            return console.log("Error while retrieving a user's song: " + error);
        } else {
            console.log("Here is your song: ");
            for (var i = 0; i <= 2; i++) {
                var songInfo = data.tracks.items[i];
                console.log("-----------------------------------------" +
                            "\nArtists: " + songInfo.artists[0].name + 
                            "\nSong: " + songInfo.name +
                            "\nPreview: " + songInfo.external_urls.spotify +
                            "\nAlbum: " + songInfo.album.name);
            }
            
        }
    });
}

function displayFillerSpotify() {
    var spotify = new Spotify(keys.spotify);
    spotify.search({type: 'track', query: "cant-help-falling-in-love", limit: 1}, function(error, data) {
        if (error) {
            return console.log("Error while retrieving a filler song: " + error);
        } else {
            console.log("Please provide me with a song title. Here is one of my favorites.");
            var songInfo = data.tracks.items[0];
            console.log("-----------------------------------------" +
                        "\nArtists: " + songInfo.artists[0].name + 
                        "\nSong: " + songInfo.name +
                        "\nPreview: " + songInfo.external_urls.spotify +
                        "\nAlbum: " + songInfo.album.name);
        }
    });
}

function displayMovie() {
    request("https://www.omdbapi.com/?t=" + arg2 + "&y=&plot=short&apikey=trilogy", function(error, response, body) {
        if (error) {
            console.log("OMDB request denied.");
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
            console.log("OMDB filler movie request denied.");
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
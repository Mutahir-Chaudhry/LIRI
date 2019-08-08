//think about using inqurier
//Read and set any environment variables with the dotenv package
require("dotenv").config();

//Require node package for reading and writing files with 
var fs = require("fs")

// Import the keys.js file and store it in a variable
var keys = require("./keys.js");

//Require AXIOS for our API Calls
var axios = require("axios");

//Creating variables to hold command line commands and values
var action = process.argv[2];

var value = process.argv[3];

//Creating switch-case statement so liri.js can take in one of the following commands
switch (action) {
    case "concert-this":
      concertThis();
      break;
    
    case "spotify-this-song":
      spotifyThis();
      break;
    
    case "movie-this":
      movieThis();
      break;
    
    case "do-what-it-says":
      doThis();
      break;
    }

//Import Spotify API and store as variable
var Spotify = require('node-spotify-api');
 
var spotify = new Spotify(keys.spotify);

function spotifyThis() {
    spotify.search({ type: 'track', query: "Superstitious" }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        for (i = 0; i < data.tracks.items.length; i++) {
            var name = data.tracks.items[i].name
            var artists = data.tracks.items[i].artists[0].name
            var album = data.tracks.items[i].album.name
            var url = data.tracks.items[i].external_urls.spotify
            fs.appendFile("random.txt", JSON.stringify(name, artists, album, url), function (err) {
                    if (err) {
                        console.log(err);
                    }
                    // If no error is experienced, we'll log the phrase "Content Added" to our node console.
                    else {
                        console.log("Content Added!");
                    }
                });
        }
    })
};

function movieThis() {
// Then run a request with axios to the OMDB API with the movie specified
var queryUrl = "http://www.omdbapi.com/?t=" + value + "&y=&plot=short&apikey=6382e4d1";

// This line is just to help us debug against the actual URL.
console.log(queryUrl);

axios.get(queryUrl).then(
  function(response) {
    console.log("--------Title--------")
    console.log(response.data.Title);
    console.log("---------Year---------")
    console.log(response.data.Year);
    console.log("-----IMDB Rating-----")
    console.log(response.data.imdbRating);
    console.log("-------Country--------")
    console.log(response.data.Country);
    console.log("-------Language-------")
    console.log(response.data.Language);
    console.log("---------Plot---------")
    console.log(response.data.Plot);
    console.log("--------Actors--------")
    console.log(response.data.Actors);
  })
  .catch(function(error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.log("---------------Data---------------");
      console.log(error.response.data);
      console.log("---------------Status---------------");
      console.log(error.response.status);
      console.log("---------------Status---------------");
      console.log(error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an object that comes back with details pertaining to the error that occurred.
      console.log(error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log("Error", error.message);
    }
    console.log(error.config);
  })};
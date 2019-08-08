//think about using inqurier
//Read and set any environment variables with the dotenv package
require("dotenv").config();

//Require node package for reading and writing files with 
var fs = require("fs")

// Import the keys.js file and store it in a variable
var keys = require("./keys.js");

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

spotifyThis();
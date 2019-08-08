//think about using inqurier
//Read and set any environment variables with the dotenv package
require("dotenv").config();

//Require node package for reading and writing files with 
var fs = require("fs")

// Import the keys.js file and store it in a variable
var keys = require("./keys.js");

//
var moment = require('moment');
moment().format();

//Require AXIOS for our API Calls
var axios = require("axios");

//Import Spotify API and store as variable
var Spotify = require('node-spotify-api');

//Import spotify id and secret and store them as a variable as well
var spotify = new Spotify(keys.spotify);

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
    spotify.search({ type: 'track', query: value }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        for (i = 0; i < data.tracks.items.length; i++) {
            var name = data.tracks.items[i].name
            var artists = data.tracks.items[i].artists[0].name
            var album = data.tracks.items[i].album.name
            var url = data.tracks.items[i].external_urls.spotify

            console.log("Name: " + name)
            console.log("Artist(s): " + artists)
            console.log("Album:" + album)
            console.log("Link: " + url)

            fs.appendFile("log.txt", "\n " + JSON.stringify(name), function (err) {
                if (err) {
                    console.log(err);
                }
                // If no error is experienced, we'll log the phrase "Content Added" to our node console.
                else {
                    console.log("Name Added!");
                }
            });
            fs.appendFile("log.txt", ", " + JSON.stringify(artists), function (err) {
                if (err) {
                    console.log(err);
                }
                // If no error is experienced, we'll log the phrase "Content Added" to our node console.
                else {
                    console.log("Artists Added!");
                }
            });
            fs.appendFile("log.txt", ", " + JSON.stringify(album), function (err) {
                if (err) {
                    console.log(err);
                }
                // If no error is experienced, we'll log the phrase "Content Added" to our node console.
                else {
                    console.log("Album Added!");
                }
            });
            fs.appendFile("log.txt", ", " + JSON.stringify(url), function (err) {
                if (err) {
                    console.log(err);
                }
                // If no error is experienced, we'll log the phrase "Content Added" to our node console.
                else {
                    console.log("URL Added!");
                }
            });
        }
    })
};
function concertThis(){
    var queryUrl = "https://rest.bandsintown.com/artists/" + value + "/events?app_id=codingbootcamp"

    axios.get(queryUrl).then(
        function(response) {
            console.log(response.data[0])
            for (i = 0; i < response.data.length; i++) {
            var momentTime = moment(response.data[i].datetime).format('MM/DD/YYYY');
            console.log("\nThis concert will be held on " + momentTime + " and the location of this concert is " + response.data[i].venue.name + ", located in the city of " + response.data[i].venue.city + ", " + response.data[i].venue.country + ".")
        }
    }).catch(function (error) {
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
                console.log(error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log("Error", error.message);
            }
            console.log(error.config);
        })
}

function movieThis() {
    // Then run a request with axios to the OMDB API with the movie specified
    var queryUrl = "http://www.omdbapi.com/?t=" + value + "&y=&plot=short&apikey=6382e4d1";

    axios.get(queryUrl).then(
        function (response) {
            var title = response.data.Title;
            console.log(title);

            var year = response.data.Year;
            console.log("Year: " + year);

            var imdbRating = response.data.imdbRating;
            console.log("imdbRating: " + imdbRating);

            var country = response.data.Country;
            console.log("Country of Production: " + country);

            var language = response.data.Language;
            console.log("Language:" + language);

            var plot = response.data.Plot;
            console.log("Plot: " + plot);

            var actors = response.data.Actors;
            console.log("Actors: " + actors);
        })
        .catch(function (error) {
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
                console.log(error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log("Error", error.message);
            }
            console.log(error.config);
        })
};

function doThis() {
    fs.readFile("random.txt", "utf8", function (error, data) {
        // Then split it by commas (to make it more readable)
        var dataArr = data.split(",");

        // We will then re-display the content as an array for later use.
        console.log(dataArr[0]);
        var action = dataArr[0];

        console.log(dataArr[1]);
        var value = dataArr[1];

        // If the code experiences any errors it will log the error to the console.
        if (error) {
            return console.log(error);
        }else if (action === "spotify-this-song") {
            //Havent figured this out yet
        }
    });
}

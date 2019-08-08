//think about using inqurier
//Read and set any environment variables with the dotenv package
require("dotenv").config();

//Require node package for reading and writing files with 
var fs = require("fs")

// Import the keys.js file and store it in a variable
var keys = require("./keys.js");

//Require moment.js for time conversions
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

//concert-this function
function concertThis(){
    var queryUrl = "https://rest.bandsintown.com/artists/" + value + "/events?app_id=codingbootcamp"

    axios.get(queryUrl).then(
        function(response) {

            console.log(response.data[0])

            for (i = 0; i < response.data.length; i++) {

            var momentTime = moment(response.data[i].datetime).format('MM/DD/YYYY');
            var name = response.data[i].venue.name;
            var city = response.data[i].venue.city;
            var country = response.data[i].venue.country;
            
            console.log("\nNew Concert!\nDate of concert: " + momentTime)
            console.log("Venue name: " + name)
            console.log("City: " + city)
            console.log("Country: " + country)

            fs.appendFile("log.txt", "\nNew Concert!\n This concert is on " + JSON.stringify(momentTime), function (err) {
                if (err) {
                    console.log(err);
                }
            });
            fs.appendFile("log.txt", ", at " + JSON.stringify(name), function (err) {
                if (err) {
                    console.log(err);
                }
            });
            fs.appendFile("log.txt", ", in the city of " + JSON.stringify(city), function (err) {
                if (err) {
                    console.log(err);
                }
            });
            fs.appendFile("log.txt", ", " + JSON.stringify(country), function (err) {
                if (err) {
                    console.log(err);
                }
            });
            
        }
    }).catch(function (error) {
            if (error.response) {

                console.log("---------------Data---------------");
                console.log(error.response.data);
                console.log("---------------Status---------------");
                console.log(error.response.status);
                console.log("---------------Status---------------");
                console.log(error.response.headers);

            } else if (error.request) {
                console.log(error.request);

            } else {

                console.log("Error", error.message);
            }
            console.log(error.config);
        })
}

//spotify-this-song function
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

            console.log("\nNew Song!\nName: " + name)
            console.log("Artist(s): " + artists)
            console.log("Album:" + album)
            console.log("Link: " + url)

            fs.appendFile("log.txt", "\nNew Song!\n " + JSON.stringify(name), function (err) {
                if (err) {
                    console.log(err);
                }
            });
            fs.appendFile("log.txt", ". Created by " + JSON.stringify(artists), function (err) {
                if (err) {
                    console.log(err);
                }
            });
            fs.appendFile("log.txt", ". For the album " + JSON.stringify(album), function (err) {
                if (err) {
                    console.log(err);
                }
            });
            fs.appendFile("log.txt", ". Link to song: " + JSON.stringify(url), function (err) {
                if (err) {
                    console.log(err);
                }
            });
        }
    })
};

//movie-this function
function movieThis() {
    // Then run a request with axios to the OMDB API with the movie specified
    var queryUrl = "http://www.omdbapi.com/?t=" + value + "&y=&plot=short&apikey=6382e4d1";

    axios.get(queryUrl).then(
        function (response) {
            var title = response.data.Title;
            var year = response.data.Year;
            var imdbRating = response.data.imdbRating;
            var country = response.data.Country;
            var language = response.data.Language;
            var plot = response.data.Plot;
            var actors = response.data.Actors;
            
            console.log("\nNew Movie!\n"+ title);
            console.log("Year: " + year);
            console.log("imdbRating: " + imdbRating);
            console.log("Country of Production: " + country);
            console.log("Language:" + language);
            console.log("Plot: " + plot);
            console.log("Actors: " + actors);

            fs.appendFile("log.txt", "\nNew Movie!\n " + JSON.stringify(title), function (err) {
                if (err) {
                    console.log(err);
                }
            });
            fs.appendFile("log.txt", " came out in " + JSON.stringify(year), function (err) {
                if (err) {
                    console.log(err);
                }
            });
            fs.appendFile("log.txt", ". It is rated at  " + JSON.stringify(imdbRating), function (err) {
                if (err) {
                    console.log(err);
                }
            });
            fs.appendFile("log.txt", ", and was filmed in " + JSON.stringify(country), function (err) {
                if (err) {
                    console.log(err);
                }
            });
            fs.appendFile("log.txt", ". It is in  " + JSON.stringify(language), function (err) {
                if (err) {
                    console.log(err);
                }
            });
            fs.appendFile("log.txt", ". It's plot is: " + JSON.stringify(plot), function (err) {
                if (err) {
                    console.log(err);
                }
            });
            fs.appendFile("log.txt", ". The actors in this film are " + JSON.stringify(actors), function (err) {
                if (err) {
                    console.log(err);
                }
            });
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

//do-what-it-says function
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
        spotifyThis(track, "I Want it That Way")
        }
    });
}
//Read and set any environment variables with the dotenv package
require("dotenv").config();

//Import the keys.js file and store it in a variable
var keys = require("./keys.js");

//Access spotify key
var spotify = new Spotify(keys.spotify);

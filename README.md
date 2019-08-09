# LIRI
Welcome to LIRI! LIRI is a one of a kind command line interface node application that utilizes various API's to log information about an artist, song,or movie, depending on the action and value provided on the command line by the user. 

Some specific technologies we use in this application include various node modules, including the spotify API module, AXIOS, moment.js, and dotenv.config. The application itself is run in the terminal of one's local machine with the use of node on the command line. 

From a high-level perspective, the application takes user input from the command line and returns and logs the information pertaining to the song, artist, band, or movie provided by the user to the console, as well as a log.txt file. 

The application starts off with a list of various node packages required to utilize the functionality of our API's stored into global variables (See Figure 1). Next, the application stores user-input from the command line, and using a switch case statement, is able to take the user's input and call various actions that invoke a specific function (See Figure 2).

![Figure 1 - Initial Variables](https://github.com/Mutahir-Chaudhry/liri-node-app/blob/master/Images/LIRI%20Demo%20Initial%20Variables%20and%20Requirements.png)

![Figure 2 - Switch Statement](https://github.com/Mutahir-Chaudhry/liri-node-app/blob/master/Images/LIRI%20Demo%20Switch%20Case.png)

The first function option is called by the concert-this action. If a user calls this action and supplies the name of an artist or band after the action, the function uses Axios to make a call to the BandsInTown API, and returns the venue name, city, and country, and logs this information to the console. The function also uses fs.appendFile to add this information to the log.txt file at the same time (See Figure 3). 

![Figure 3 - Concert This Function](https://github.com/Mutahir-Chaudhry/liri-node-app/blob/master/Images/LIRI%20Demo%20Concert%20This.png)

The second function option is called by the spotify-this-song action. If a user calls this action and supplies the name of a song after the action, the function uses the spotify API node package to search from the songs name, artist, album, and link, and then logs this information to the console. The function also uses fs.appendFile to add this information to the log.txt file at the same time (See Figure 4). 

![Figure 4 - Spotify This Song Function](https://github.com/Mutahir-Chaudhry/liri-node-app/blob/master/Images/LIRI%20Demo%20Spotify%20This.png)

The third function option is called by the movie-this action. If a user calls this action and supplies the name of a movie after this action, the function uses Axios to make a call to the OMDB API, and returns the movie title, year, rating, country, language, plot, and actors, and logs this information to the console. The function also uses fs.appendFile to add this information to the log.txt file at the same time (See Figure 5). 

![Figure 5 - Movie This Function](https://github.com/Mutahir-Chaudhry/liri-node-app/blob/master/Images/LIRI%20Demo%20Movie%20This.png)

The fourth and final function option is called by the do-what-it-says action. If a user simply calls this action from the command line, the function uses fs.readFile to read the random.txt file. The text is split by it's commas using data.split into a data array. The first index of this array is set to the action. The second index of the array is set to the value. Depending on whatever the random.txt file has written in it, it will run a specific function. For demo purposes, the action is listed as spotify-this-song, and you can see in the demo image that it runs this function for the song provided (See Figure 6).

![Figure 6 - Do What It Says Function](https://github.com/Mutahir-Chaudhry/liri-node-app/blob/master/Images/LIRI%20Demo%20Do%20What%20It%20Says.png)

I, Mutahir Chaudhry, created and maintain LIRI, and can be contacted if you have any questions or need points of clarification. 

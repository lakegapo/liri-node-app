// Reference to personal API keys Twitter and Spotify
require("dotenv").config();

var fs = require("fs");
// JS referencing variables for API keys
var keys = require("./keys.js");

// NPM packages
var request = require("request");

var Twitter = require('twitter');
var client = new Twitter(keys.twitter);

var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);

// Search type and search terms
var searchType = process.argv[2];

var searchTerm = process.argv.slice(3).join("%20");

// Function to get the last 20 tweets from @dunanome
var myTweets = function () {

    var params = {
        screen_name: "DunaNome",
        count: 20,
        result_type: "recent",
        lang: "en"
    }

    client.get('statuses/user_timeline', params, function (error, tweets, response) {
        if (error) throw error;

        console.log("========== @dunanome's Last 20 Tweets ==========");
        for (var i = 0; i < tweets.length; i++) {
            console.log('\n');
            console.log([i + 1] + ".\t" + tweets[i].text);
            console.log("\t Created: " + tweets[i].created_at);
            fs.appendFile("log.txt", ([i + 1] + ") " + tweets[i].text + "\nDate created: " + tweets[1].created_at + "\n"), function (err) {
                if (err) throw err;
            });
        }
    });
}

function spotifyThisSong(searchTerm) {
    // Search for Ace of the Base The Sign if no search parameter is entered
    if (!searchTerm) {
        searchTerm = 'the%20sign%20ace';
    }
        spotify.search({ type: 'track', query: searchTerm, limit: 5 }, function (error, data) {
            if (error) {
                throw error;
            }
            else if (!error) {
                console.log("========== SPOTIFY SONG SEARCH RESULTS ==========");
                for (var i = 0; i < data.tracks.items.length; i++) {
                    var songData = data.tracks.items[i];
                    console.log("Artist: " + songData.artists[0].name);
                    console.log("Song: " + songData.name);
                    console.log("Preview URL: " + songData.preview_url);
                    console.log("Album: " + songData.album.name);
                    console.log("------------");

                    //Append output to log.txt
                    fs.appendFile('log.txt', "========== SPOTIFY SEARCH ==========", function (err) {
                        if (err) throw err;
                    });
                    fs.appendFile('log.txt', songData.artists[0].name, function (err) {
                        if (err) throw err;
                    });
                    fs.appendFile('log.txt', songData.name, function (err) {
                        if (err) throw err;
                    });
                    fs.appendFile('log.txt', songData.preview_url, function (err) {
                        if (err) throw err;
                    });
                    fs.appendFile('log.txt', songData.album.name, function (err) {
                        if (err) throw err;
                    });
                    fs.appendFile('log.txt', "------------", function (err) {
                        if (err) throw err;
                    });
                }
            } else {
                console.log('Something went wrong.');
            }
        });
    
}

var movieThis = function () {

    var omdbURL = 'http://www.omdbapi.com/?t=' + searchTerm + '&plot=short&tomatoes=true&apikey=trilogy';
    // Search for Mr. Nobody if no search parameter is entered.
    if (!searchTerm) {
        omdbURL = 'http://www.omdbapi.com/?t=mr+nobody&plot=short&tomatoes=true&apikey=trilogy';
    }

    request(omdbURL, function (error, response, body) {
        if (error) {
            throw error;
        }
        else {
            var json = JSON.parse(body);
            console.log("========== OMDB MOVIE SEARCH RESULTS ==========");
            console.log("Title: " + json.Title);
            console.log("Release Year: " + json.Year);
            console.log("IMdB Rating: " + json.imdbRating);
            console.log("Rotten Tomatoes Rating: " + json.tomatoRating);
            console.log("Country: " + json.Country);
            console.log("Language: " + json.Language);
            console.log("Plot: " + json.Plot);
            console.log("Actors: " + json.Actors);
            console.log("------------");

            fs.appendFile('log.txt', "========== OMDB RESULTS ==========", function (err) {
                if (err) throw err;
            });
            fs.appendFile('log.txt', "Title: " + json.Title, function (err) {
                if (err) throw err;
            });
            fs.appendFile('log.txt', "Release Year: " + json.Year, function (err) {
                if (err) throw err;
            });
            fs.appendFile('log.txt', "IMdB Rating: " + json.imdbRating, function (err) {
                if (err) throw err;
            });
            fs.appendFile('log.txt', "Rotten Tomatoes Rating: " + json.tomatoRating, function (err) {
                if (err) throw err;
            });
            fs.appendFile('log.txt', "Country: " + json.Country, function (err) {
                if (err) throw err;
            });
            fs.appendFile('log.txt', "Language: " + json.Language, function (err) {
                if (err) throw err;
            });
            fs.appendFile('log.txt', "Plot: " + json.Plot, function (err) {
                if (err) throw err;
            });
            fs.appendFile('log.txt', "Actors: " + json.Actors, function (err) {
                if (err) throw err;
            });
            fs.appendFile('log.txt', "------------", function (err) {
                if (err) throw err;
            });
        };

    });
}



var doWhatItSays = function () {
    fs.readFile('random.txt', "utf8", function (error, data) {
        if (error) {
            console.log(error);
        }
        else {
            var dataArr = data.split(",");
            if (dataArr[0] === "spotify-this-song") {
                var songData = dataArr[1].slice(1, -1);
                spotifyThisSong(songData);
            }
        }
    }

)}


if (searchType === "my-tweets") {
    myTweets();
}
else if (searchType === "spotify-this-song") {
    spotifyThisSong(searchTerm);
}
else if (searchType === "movie-this") {
    movieThis(searchTerm);
}
else if (searchType === "do-what-it-says") {
    doWhatItSays();
}
else {
    console.log("Please enter valid parameters.")
}
;
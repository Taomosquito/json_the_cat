const needle = require("needle");

/*
**PLANNING**
* clarify on scope
* * access the page with needle
* * potentially take in process.argv arguments to facilitate what to search
* * make a function to keep it simple
*/

/**
 * IMPLEMENTATION
 * expect to rvise lots as the assignment progresses on compass so start by writing template logic.
 * * template logic manages easier with progressive requirements
*/

const temporaryQueryflag = process.argv;
let breedPortion;

if (temporaryQueryflag.length === 3) {
  breedPortion = temporaryQueryflag[2];
}

// Keeping this as it is a viable means of accomplishing this task when callbacks aren't required.
const fetcher = function(breedPortion) {
  needle.get(`https://api.thecatapi.com/v1/breeds/search?q=${breedPortion}`, `utf8`, (error, response) => {
    if (Array.isArray(response.body) && response.body.length > 0) {
      if (!error) {
        console.log(response.body[0].description);
      } else {
        console.log(`An unexpected error occurred: ${error.message}`);
      }
    } else {
      console.log('Breed not found');
    }
  });
};

// Below is the function we will be using for the assignment:
const fetchBreedDescription = function(breedName, callback) {
  needle.get(`https://api.thecatapi.com/v1/breeds/search?q=${breedName}`, 'utf8', (error, response) => {
    if (error) {
      callback(error, null);

    } else if (Array.isArray(response.body) && response.body.length > 0) {
      const description = response.body[0].description;
      callback(null, description);

    } else {
      callback('Breed not found', null);
    }
  });
};

fetcher(breedPortion);

module.exports = { fetchBreedDescription, fetcher };

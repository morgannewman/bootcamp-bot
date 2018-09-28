/* --------DATA INTERFACE---------
This module exposes an interface to:

  1. Get the current and last challenge from the cache
    - getCurrentChallenge() and getLastChallenge()
      both return a promise that eventually returns a challenge object

  2. Sets a new challenge to persist in the cache and database.
    - Use setNewChallenge() to set a new challenge in the data layer.
    Be warned: this will modify the database and cache accordingly!
    - Returns a promise eventually returning the new challenge object.

*/

const knex = require('./db/knex');
const fs = require('fs').promises;
const currentChallengeFile = './challenge-bot/cache/currentChallenge.json';
const lastChallengeFile = './challenge-bot/cache/lastChallenge.json';

const setNewChallenge = () => {
  let item;
  // Fetch the first challenge in the `challenges` table
  return (
    knex
      .first([
        'challenge_id',
        'challenges.title',
        'challenges.description',
        'challenges.url'
      ])
      .from('upcoming_challenges')
      .leftJoin(
        'challenges',
        'upcoming_challenges.challenge_id',
        'challenges.id'
      )
      // Update the DB to reflect new challenge state
      .then(res => {
        item = res;
        return archiveItemById(item.challenge_id);
      })
      // Close the DB connection
      .then(() => knex.destroy())
      // Update the cache
      .then(() => updateCurrentChallenge(item))
      .then(() => item)
      .catch(err => console.error(err))
  );
};

const getCurrentChallenge = () => {
  console.log('current challenge', currentChallengeFile);
  return fs
    .readFile(currentChallengeFile)
    .then(data => JSON.parse(data))
    .catch(err => {
      console.log(`Could not load ${currentChallengeFile}`);
      return err;
    });
};

const getLastChallenge = () => {
  return fs
    .readFile(lastChallengeFile)
    .then(data => JSON.parse(data))
    .catch(err => {
      console.log(`Could not load ${lastChallengeFile}`);
      return err;
    });
};

const archiveItemById = id => {
  // TODO: ADD 2 variables for the promises
  // removeFromUpcomingList
  // addToArchive
  // Given a challenge ID:
  // 1. Delete it from the upcoming_challenges table
  // 2. Add it to the past_challenges table
  return Promise.all([
    knex
      .delete()
      .from('upcoming_challenges')
      .where('challenge_id', id),
    knex
      .insert({ challenge_id: id })
      .into('past_challenges')
      .where('challenge_id', id)
  ]);
};

// Delete the lastChallenge and renames currentChallenge to lastChallenge
const updateCache = () => {
  // Delete lastChallenge if it exists
  return (
    fs
      .unlink(lastChallengeFile)
      .catch(err => {
        if (err.code === 'ENOENT') {
          return console.log(
            `${lastChallengeFile} does not exist. Skipping...`
          );
        }
      })
      // Rename currentChallenge.js to lastChallenge.js
      .then(() => {
        return fs.rename(currentChallengeFile, lastChallengeFile);
      })
      .catch(err => {
        if (err.code === 'ENOENT') {
          return console.log(
            `${currentChallengeFile} does not exist. Skipping...`
          );
        }
      })
  );
};

// Create the new currentChallenge
const updateCurrentChallenge = data => {
  return updateCache().then(() => {
    fs.writeFile(currentChallengeFile, JSON.stringify(data)).then(() => {});
  });
};

module.exports = {
  setNewChallenge,
  getCurrentChallenge,
  getLastChallenge
};

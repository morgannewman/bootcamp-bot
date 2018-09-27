const fs = require('fs').promises;
const currentChallengeFile = './currentChallenge.json';
const lastChallengeFile = './lastChallenge.json';

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
    fs.writeFile(currentChallengeFile, JSON.stringify(data, '\n', 1));
  });
};

/*----------------------------------*/
/* Load json from local data files. */
/*----------------------------------*/

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

module.exports = {
  updateCurrentChallenge,
  getCurrentChallenge,
  getLastChallenge
};

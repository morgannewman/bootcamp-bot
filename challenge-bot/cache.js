const fs = require('fs').promises;
const currentChallengeFile = './currentChallenge.json';
const lastChallengeFile = './lastChallenge.json';

// Delete the lastChallenge and renames currentChallenge to lastChallenge
const updateCache = () => {
  // Delete lastChallenge if it exists
  return fs.unlink(lastChallengeFile)
    .catch(err => {
      if (err.code === 'ENOENT') {
        return console.log(`${lastChallengeFile} does not exist. Skipping...`);
      }
    })
  // Rename currentChallenge.js to lastChallenge.js
    .then(() => {
      return fs.rename(currentChallengeFile, lastChallengeFile);
    })
    .catch(err => {
      if (err.code === 'ENOENT') {
        return console.log(`${currentChallengeFile} does not exist. Skipping...`);
      }
    });
};
  
// Create the new currentChallenge
const cacheCurrentChallenge = (data) => {
  return updateCache()
    .then(() => fs.writeFile(currentChallengeFile, JSON.stringify(data, '\n', 1)))
    .catch(err => console.error('last error block:\n' + err));
};

module.exports = cacheCurrentChallenge;
// accepts challenge json and returns a string formatted for a discord message
// used here and in commands folder to format messages
const generateChallengeDescription = challenge => {
  const { description } = challenge;
  return description;
};

const generateChallengeTitle = challenge => {
  return challenge.title;
};

const generateChallengeLink = challenge => {
  return challenge.url;
};

module.exports = {
  generateChallengeDescription,
  generateChallengeTitle,
  generateChallengeLink
};

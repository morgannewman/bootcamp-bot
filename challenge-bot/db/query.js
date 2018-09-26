const knex = require('./knex');

const getNewChallenge = () => {
  // grabs the first challenge in the challenge-queue table
  let item;
  // Fetch from DB
  return knex
    .first(['challenge_id', 'challenges.title', 'challenges.description', 'challenges.url'])
    .from('upcoming_challenges')
    .leftJoin('challenges', 'upcoming_challenges.challenge_id', 'challenges.id')
    .then((res) => {
      item = res;
      knex.destroy();
      return updateChallengeDb(item.challenge_id);
    })
    .then(() => item)
    .catch(err => console.error(err));
};

const updateChallengeDb = (id) => {
  // On success, delete this item from the upcoming challenge queue
  // On success, add this item (and current date) to the past-challenge table
  return console.log('hi Joe');
  // return knex('upcoming_challenges')
  //   .select('id', id)
  //   .then(function(challenge) {
  //     knex('past_challenges')
  //       .insert(challenge);
  //     knex('upcoming_challenges')
  //       .del('id', id);                        
  //   })
  //   .catch(function(err) {
  //     console.error(err);
  //   });
};

module.exports = getNewChallenge;
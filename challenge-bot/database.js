const knex = require('./db/knex');

const getNewChallenge = () => {
  // Fetch the first challenge in the `challenges` table
  let item;

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
      // Move the challenge_id from upcoming_challenges to past_challenges
      .then(res => {
        item = res;
        return moveChallenge(item.challenge_id);
      })
      // Close the DB connection
      .then(() => knex.destroy())
      // Return the challenge item
      .then(() => item)
      .catch(err => console.error(err))
  );
};

const moveChallenge = id => {
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

module.exports.getNewChallenge = getNewChallenge;

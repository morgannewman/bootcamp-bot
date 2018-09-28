module.exports = {
  development: {
    client: 'pg',
    connection: 'postgres://localhost/challenge-bot',
    // 'postgres://nfztyapc:yCfM9fhjHbcCUBVlogRdwEpJdJBIDN9v@baasu.db.elephantsql.com:5432/nfztyapc',
    // debug: true, // http://knexjs.org/#Installation-debug
    pool: { min: 1, max: 4 }
  },
  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL
  }
};

module.exports = {
  development: {
    client: 'pg',
    connection: 'postgres://localhost/challenge-bot',
    debug: true, // http://knexjs.org/#Installation-debug
    pool: { min: 1, max: 2 }
  },
  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL
  }
};

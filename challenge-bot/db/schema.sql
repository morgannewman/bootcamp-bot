CREATE TABLE challenges (
  id serial PRIMARY KEY,
  title text NOT NULL,
  description text NOT NULL,
  url text UNIQUE NOT NULL
);

CREATE TABLE past_challenges (
  id int GENERATED ALWAYS AS IDENTITY (START WITH 100) PRIMARY KEY,
  challenge_id int REFERENCES challenges(id) ON DELETE SET NULL,
  date_used date DEFAULT CURRENT_DATE
);

CREATE TABLE upcoming_challenges (
id serial PRIMARY KEY,
challenge_id int REFERENCES challenges(id) ON DELETE SET NULL
);
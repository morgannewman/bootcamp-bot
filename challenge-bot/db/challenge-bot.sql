-- psql -U dev -d challenge-bot -f ./challenge-bot/db/challenge-bot.sql

-- Wipes table so this file can recreate it each time it is ran
DROP TABLE IF EXISTS upcoming_challenges;
DROP TABLE IF EXISTS past_challenges;
DROP TABLE IF EXISTS challenges;


CREATE TABLE challenges (
  id serial PRIMARY KEY,
  title text NOT NULL,
  description text NOT NULL,
  url text NOT NULL
);

-- DUMMY DATA HERE

INSERT INTO challenges (title, description, url) VALUES 
('HoneyBooBoo', 'The adventures of King Honey Boo Boo', 'www.reddit.com'),
('Capt. Morgan', 'The mole TA', 'www.reddit.com'),
('HoneyBooBoo2', 'Second follow up movie', 'www.reddit.com'),
('John Wick and the Honey Boo Boo', '15/10 on rotten tomatoes', 'www.reddit.com'),
('Giant Space Balls', 'XXX release of space balls', 'www.reddit.com'),
('Saddy Mcface', 'Wear a fake weding ring', 'www.reddit.com');

CREATE TABLE past_challenges (
  id int GENERATED ALWAYS AS IDENTITY (START WITH 100) PRIMARY KEY,
  challenge_id int REFERENCES challenges(id) ON DELETE SET NULL,
  date_used date DEFAULT CURRENT_DATE
);

INSERT INTO past_challenges (challenge_id) VALUES
  (1), (2), (3);

-- GET THE PAST CHALLENGES
-- SELECT past_challenges.date_used, challenges.title, challenges.description, challenges.url FROM past_challenges LEFT JOIN challenges ON past_challenges.challenge_id = challenges.id;
  
CREATE TABLE upcoming_challenges (
id serial PRIMARY KEY,
challenge_id int REFERENCES challenges(id) ON DELETE SET NULL
);

-- DUMMY DATA
INSERT INTO upcoming_challenges (challenge_id) VALUES (4), (5), (6);

-- GET THE UPCOMING CHALLENGES
-- SELECT challenges.title, challenges.description, challenges.url FROM upcoming_challenges LEFT JOIN challenges ON upcoming_challenges.challenge_id = challenges.id;

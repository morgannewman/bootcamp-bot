-- psql -U dev -d challenge-bot -f ./challenge-bot/db/query-tester.sql

SELECT past_challenges.date_used, challenges.title, challenges.description, challenges.url FROM past_challenges LEFT JOIN challenges ON past_challenges.challenge_id = challenges.id;

SELECT challenges.title, challenges.description, challenges.url FROM upcoming_challenges LEFT JOIN challenges ON upcoming_challenges.challenge_id = challenges.id;

-- DELETE FROM upcoming_challenges WHERE challenge_id = 4;
-- INSERT INTO past_challenges (challenge_id) VALUES (4);

-- SELECT past_challenges.date_used, challenges.title, challenges.description, challenges.url FROM past_challenges LEFT JOIN challenges ON past_challenges.challenge_id = challenges.id;

-- SELECT challenges.title, challenges.description, challenges.url FROM upcoming_challenges LEFT JOIN challenges ON upcoming_challenges.challenge_id = challenges.id;
DROP TABLE transactions_v2;

CREATE TABLE transactions_v2 (
    id serial PRIMARY KEY,
    transaction_date Date NOT NULL,
    team_one_id numeric NOT NULL,
    team_one_picks text[],
    team_one_players numeric[],
    team_two_id numeric NOT NULL,
    team_two_picks text[],
    team_two_players numeric[]
);


06-09-2020	To Oak: J. Roslovic To Sea: M. Wood, Oak 3rd

INSERT INTO transactions_v2
VALUES (
    '1',
    '2020-06-09',
    '13',
    '{}',
    '{1399}',
    '17',
    '{"Oak 3rd"}',
    '{1772}'
);
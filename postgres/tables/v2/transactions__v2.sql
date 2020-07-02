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

do $$
declare maxid int;
begin
    select max(id)+1 from transactions_v2 into maxid;
    execute 'alter SEQUENCE transactions_v2_id_seq RESTART with '|| maxid;
end;

$$ language plpgsql;
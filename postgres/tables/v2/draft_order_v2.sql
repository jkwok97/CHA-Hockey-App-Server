DROP TABLE draft_order_v2;

CREATE TABLE draft_order_v2 (
    id serial PRIMARY KEY,
    team_id SMALLINT NOT NULL,
    round_one SMALLINT NOT NULL,
    round_two SMALLINT NOT NULL,
    round_three SMALLINT NOT NULL,
    round_four SMALLINT NOT NULL,
    round_five SMALLINT NOT NULL,
    draft_year TEXT NOT NULL
);

\copy draft_order_v2 (team_id, round_one, round_two, round_three, round_four, round_five, draft_year) FROM '/Users/jeffkwok/Desktop/CHA-Hockey-app-server/postgres/seed/v2/draft_order_v2.tsv' WITH NULL ''

do $$
declare maxid int;
begin
    select max(id)+1 from draft_order_v2 into maxid;
    execute 'alter SEQUENCE draft_order_v2_id_seq RESTART with '|| maxid;
end;

$$ language plpgsql;

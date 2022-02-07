DROP TABLE current_season_v2;

CREATE TABLE current_season_v2 (
    id serial PRIMARY KEY,
    current_year text,
    next_year text,
    nhl_year text,
    current_season_type text,
    current_day numeric NOT NULL,
    current_draft_year numeric NOT NULL,
    next_draft_year numeric NOT NULL,
    current_cap numeric NOT NULL,
    next_cap numeric NOT NULL,
    min_games numeric NOT NULL,
    offseason bool NOT NULL
);

\copy current_season_v2 (current_year, next_year, nhl_year, current_season_type, current_day, current_draft_year, next_draft_year, current_cap, next_cap, min_games, offseason) FROM '/Users/jeffkwok/Desktop/CHA-Hockey-app-server/postgres/seed/v2/current_season_v2.tsv'

do $$
declare maxid int;
begin
    select max(id)+1 from current_season_v2 into maxid;
    execute 'alter SEQUENCE current_season_v2_id_seq RESTART with '|| maxid;
end;

$$ language plpgsql;


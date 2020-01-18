DROP TABLE nhl_players;

CREATE TABLE nhl_players (
    id serial PRIMARY KEY,
    player_name text NOT NULL,
    player_nhl_id text NOT NULL,
    cha_player_id numeric,
    cha_goalie_id numeric
);

\copy nhl_players (player_name, player_nhl_id, cha_player_id, cha_goalie_id) FROM '/Users/jeffkwok/Desktop/CHA-Hockey-app-server/postgres/seed/nhlApi.tsv' WITH NULL ''

do $$
declare maxid int;
begin
    select max(id)+1 from nhl_players into maxid;
    execute 'alter SEQUENCE nhl_players_id_seq RESTART with '|| maxid;
end;

$$ language plpgsql;

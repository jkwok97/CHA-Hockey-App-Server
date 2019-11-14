DROP TABLE nhlPlayers;

CREATE TABLE nhlPlayers (
    id serial PRIMARY KEY,
    player_name text NOT NULL,
    player_nhl_id text NOT NULL
);

\copy nhlPlayers (player_name, player_nhl_id) FROM '/Users/jeffkwok/Desktop/CHA-Hockey-app-server/postgres/seed/nhlApi.tsv' WITH NULL ''

do $$
declare maxid int;
begin
    select max(id)+1 from nhlPlayers into maxid;
    execute 'alter SEQUENCE nhlPlayers_id_seq RESTART with '|| maxid;
end;

$$ language plpgsql;

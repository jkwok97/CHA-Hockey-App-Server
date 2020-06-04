DROP TABLE champions;

CREATE TABLE champions (
    id serial PRIMARY KEY,
    year_won text NOT NULL,
    team_name text NOT NULL,
    owner_name text,
    player_name text,
    team_short text NOT NULL,
    award_type text NOT NULL
);

\copy champions (year_won, team_name, owner_name, player_name, team_short, award_type) FROM '/Users/jeffkwok/Desktop/CHA-Hockey-app-server/postgres/seed/Champions.tsv' WITH NULL ''

do $$
declare maxid int;
begin
    select max(id)+1 from champions into maxid;
    execute 'alter SEQUENCE champions_id_seq RESTART with '|| maxid;
end;

$$ language plpgsql;

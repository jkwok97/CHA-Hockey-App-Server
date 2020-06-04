DROP TABLE players;

CREATE TABLE players (
    id serial PRIMARY KEY,
    firstName text NOT NULL,
    lastName text NOT NULL,
    nhlId numeric,
    active boolean NOT NULL,
    isGoalie boolean NOT NULL
);

\copy players (firstName, lastName, nhlId, active, isGoalie) FROM '/Users/jeffkwok/Desktop/CHA-Hockey-app-server/postgres/seed/players.tsv' WITH NULL ''

do $$
declare maxid int;
begin
    select max(id)+1 from players into maxid;
    execute 'alter SEQUENCE users_id_seq RESTART with '|| maxid;
end;

$$ language plpgsql;

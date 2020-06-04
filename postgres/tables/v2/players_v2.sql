DROP TABLE players_v2;

CREATE TABLE players_v2 (
    id serial PRIMARY KEY,
    firstName text NOT NULL,
    lastName text NOT NULL,
    nhl_id text,
    isActive boolean NOT NULL,
    isGoalie boolean NOT NULL,
    isDefense boolean NOT NULL,
    isForward boolean NOT NULL
);

\copy players_v2 (firstName, lastName, nhl_id, isActive, isGoalie, isDefense, isForward) FROM '/Users/jeffkwok/Desktop/CHA-Hockey-app-server/postgres/seed/v2/players_v2.tsv' WITH NULL ''

do $$
declare maxid int;
begin
    select max(id)+1 from players_v2 into maxid;
    execute 'alter SEQUENCE players_v2_id_seq RESTART with '|| maxid;
end;

$$ language plpgsql;

DROP TABLE divisions;

CREATE TABLE divisions (
    id serial PRIMARY KEY,
    divisionName text NOT NULL,
    conference_id numeric NOT NULL,
    isActive boolean NOT NULL
);

\copy divisions (divisionName, conference_id, isActive) FROM '/Users/jeffkwok/Desktop/CHA-Hockey-app-server/postgres/seed/divisions.tsv' WITH NULL ''

do $$
declare maxid int;
begin
    select max(id)+1 from divisions into maxid;
    execute 'alter SEQUENCE divisions_id_seq RESTART with '|| maxid;
end;

$$ language plpgsql;

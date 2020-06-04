DROP TABLE divisions_v2;

CREATE TABLE divisions_v2 (
    id serial PRIMARY KEY,
    divisionName text NOT NULL,
    conference_id SMALLINT NOT NULL,
    isActive boolean NOT NULL
);

\copy divisions_v2 (divisionName, conference_id, isActive) FROM '/Users/jeffkwok/Desktop/CHA-Hockey-app-server/postgres/seed/v2/divisions_v2.tsv' WITH NULL ''

do $$
declare maxid int;
begin
    select max(id)+1 from divisions_v2 into maxid;
    execute 'alter SEQUENCE divisions_v2_id_seq RESTART with '|| maxid;
end;

$$ language plpgsql;

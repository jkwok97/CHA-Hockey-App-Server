DROP TABLE conferences;

CREATE TABLE conferences (
    id serial PRIMARY KEY,
    conferenceName text NOT NULL,
    isActive boolean NOT NULL
);

\copy conferences (conferenceName, isActive) FROM '/Users/jeffkwok/Desktop/CHA-Hockey-app-server/postgres/seed/conferences.tsv' WITH NULL ''

do $$
declare maxid int;
begin
    select max(id)+1 from conferences into maxid;
    execute 'alter SEQUENCE conferences_id_seq RESTART with '|| maxid;
end;

$$ language plpgsql;

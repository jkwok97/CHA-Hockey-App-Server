DROP TABLE conferences_v2;

CREATE TABLE conferences_v2 (
    id serial PRIMARY KEY,
    conferenceName text NOT NULL,
    isActive boolean NOT NULL
);

\copy conferences_v2 (conferenceName, isActive) FROM '/Users/jeffkwok/Desktop/CHA-Hockey-app-server/postgres/seed/v2/conferences_v2.tsv' WITH NULL ''

do $$
declare maxid int;
begin
    select max(id)+1 from conferences_v2 into maxid;
    execute 'alter SEQUENCE conferences_v2_id_seq RESTART with '|| maxid;
end;

$$ language plpgsql;

DROP TABLE waivers_v2;

CREATE TABLE waivers_v2 (
    id serial PRIMARY KEY,
    team_id SMALLINT NOT NULL,
    priority_number SMALLINT NOT NULL
);

\copy waivers_v2 (team_id, priority_number) FROM '/Users/jeffkwok/Desktop/CHA-Hockey-app-server/postgres/seed/v2/waivers_v2.tsv' WITH NULL ''

do $$
declare maxid int;
begin
    select max(id)+1 from waivers_v2 into maxid;
    execute 'alter SEQUENCE waivers_v2_id_seq RESTART with '|| maxid;
end;

$$ language plpgsql;

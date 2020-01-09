DROP TABLE waivers;

CREATE TABLE waivers (
    id serial PRIMARY KEY,
    team_name text NOT NULL,
    priority_number text NOT NULL
);

\copy waivers (team_name, priority_number) FROM '/Users/jeffkwok/Desktop/CHA-Hockey-app-server/postgres/seed/waiverPriority.tsv' WITH NULL ''

do $$
declare maxid int;
begin
    select max(id)+1 from users into maxid;
    execute 'alter SEQUENCE users_id_seq RESTART with '|| maxid;
end;

$$ language plpgsql;

DROP TABLE users;

CREATE TABLE users (
    id serial PRIMARY KEY,
    team_name text NOT NULL,
    short_name text NOT NULL,
    f_name text NOT NULL,
    l_name text NOT NULL,
    email text NOT NULL,
    is_admin boolean NOT NULL
);

\copy users (team_name, short_name, f_name, l_name, email, is_admin) FROM '/Users/jeffkwok/Desktop/CHA-Hockey-app-server/postgres/seed/Users.tsv' WITH NULL ''

do $$
declare maxid int;
begin
    select max(id)+1 from users into maxid;
    execute 'alter SEQUENCE users_id_seq RESTART with '|| maxid;
end;

$$ language plpgsql;

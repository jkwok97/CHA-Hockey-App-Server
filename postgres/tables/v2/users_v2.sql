DROP TABLE users_v2;

CREATE TABLE users_v2 (
    id serial PRIMARY KEY,
    firstName text NOT NULL,
    lastName text NOT NULL,
    email text,
    isAdmin boolean NOT NULL,
    isActive boolean NOT NULL
);

\copy users_v2 (firstName, lastName, email, isAdmin, isActive) FROM '/Users/jeffkwok/Desktop/CHA-Hockey-app-server/postgres/seed/v2/users_v2.tsv' WITH NULL ''

do $$
declare maxid int;
begin
    select max(id)+1 from users_v2 into maxid;
    execute 'alter SEQUENCE users_v2_id_seq RESTART with '|| maxid;
end;

$$ language plpgsql;

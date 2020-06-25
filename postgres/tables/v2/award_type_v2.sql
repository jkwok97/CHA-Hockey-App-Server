DROP TABLE award_type_v2;

CREATE TABLE award_type_v2 (
    id serial PRIMARY KEY,
    award_type text NOT NULL,
    display_name text NOT NULL
);


\copy award_type_v2 (award_type, display_name) FROM '/Users/jeffkwok/Desktop/CHA-Hockey-app-server/postgres/seed/v2/award_type_v2.tsv' WITH NULL ''

do $$
declare maxid int;
begin
    select max(id)+1 from award_type_v2 into maxid;
    execute 'alter SEQUENCE award_type_v2_id_seq RESTART with '|| maxid;
end;

$$ language plpgsql;

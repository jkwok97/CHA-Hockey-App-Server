DROP TABLE teams_v2;

CREATE TABLE teams_v2 (
    id serial PRIMARY KEY,
    shortName text NOT NULL,
    cityName text NOT NULL,
    nickName text NOT NULL,
    isActive boolean NOT NULL,
    users_v2_id numeric NOT NULL,
    logo text NOT NULL,
    teamColor text NOT NULL,
    fontColor text NOT NULL,
    divisions_id numeric
);

\copy teams_v2 (shortName, cityName, nickName, isActive, users_v2_id, logo, teamColor, fontColor, divisions_id) FROM '/Users/jeffkwok/Desktop/CHA-Hockey-app-server/postgres/seed/teams_v2.tsv' WITH NULL ''

do $$
declare maxid int;
begin
    select max(id)+1 from teams_v2 into maxid;
    execute 'alter SEQUENCE teams_v2_seq RESTART with '|| maxid;
end;

$$ language plpgsql;

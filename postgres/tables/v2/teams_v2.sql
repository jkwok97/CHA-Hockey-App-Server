DROP TABLE teams_v2;

CREATE TABLE teams_v2 (
    id serial PRIMARY KEY,
    shortName text NOT NULL,
    city text NOT NULL,
    nickName text NOT NULL,
    isActive boolean NOT NULL,
    users_id SMALLINT NOT NULL,
    teamLogo text NOT NULL,
    teamAltLogo text,
    teamColor text NOT NULL,
    teamTextColor text NOT NULL,
    divisions_id SMALLINT
);

\copy teams_v2 (shortName, city, nickName, isActive, users_id, teamLogo, teamAltLogo, teamColor, teamTextColor, divisions_id) FROM '/Users/jeffkwok/Desktop/CHA-Hockey-app-server/postgres/seed/v2/teams_v2.tsv' WITH NULL ''

do $$
declare maxid int;
begin
    select max(id)+1 from teams_v2 into maxid;
    execute 'alter SEQUENCE teams_v2_id_seq RESTART with '|| maxid;
end;

$$ language plpgsql;

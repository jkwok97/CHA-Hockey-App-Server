DROP TABLE awards_v2;

CREATE TABLE awards_v2 (
    id serial PRIMARY KEY,
    display_season text NOT NULL,
    cha_season text NOT NULL,
    team_id SMALLINT NOT NULL,
    users_id SMALLINT NOT NULL,
    player_id SMALLINT,
    award_type SMALLINT NOT NULL
);

\copy awards_v2 (display_season, cha_season, team_id, users_id, player_id, award_type) FROM '/Users/jeffkwok/Desktop/CHA-Hockey-app-server/postgres/seed/v2/awards_v2.tsv' WITH NULL ''

do $$
declare maxid int;
begin
    select max(id)+1 from awards_v2 into maxid;
    execute 'alter SEQUENCE awards_v2_id_seq RESTART with '|| maxid;
end;

$$ language plpgsql;

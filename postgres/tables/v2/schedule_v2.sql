DROP TABLE schedule_v2;

CREATE TABLE schedule_v2 (
    id serial PRIMARY KEY,
    game_day SMALLINT NOT NULL,
    vis_team_id SMALLINT NOT NULL,
    vis_team_game_number SMALLINT NOT NULL,
    vis_team_score SMALLINT,
    home_team_id SMALLINT NOT NULL,
    home_team_game_number SMALLINT NOT NULL,
    home_team_score SMALLINT,
    playing_year TEXT NOT NULL
);

\copy schedule_v2 (game_day, vis_team_id, vis_team_game_number, vis_team_score, home_team_id, home_team_game_number, home_team_score, playing_year) FROM '/Users/jeffkwok/Desktop/CHA-Hockey-app-server/postgres/seed/v2/schedule_v2.tsv' WITH NULL ''

do $$
declare maxid int;
begin
    select max(id)+1 from schedule_v2 into maxid;
    execute 'alter SEQUENCE schedule_v2_id_seq RESTART with '|| maxid;
end;

$$ language plpgsql;

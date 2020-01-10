DROP TABLE schedule;

CREATE TABLE schedule (
    id serial PRIMARY KEY,
    game_day text NOT NULL,
    vis_team_name text NOT NULL,
    vis_game_number text NOT NULL,
    vis_team_score numeric,
    home_team_name text NOT NULL,
    home_game_number text NOT NULL,
    home_team_score numeric
);

\copy schedule (game_day, vis_team_name, vis_game_number, vis_team_score, home_team_name, home_game_number, home_team_score) FROM '/Users/jeffkwok/Desktop/CHA-Hockey-app-server/postgres/seed/schedule.tsv' WITH NULL ''

do $$
declare maxid int;
begin
    select max(id)+1 from schedule into maxid;
    execute 'alter SEQUENCE schedule_id_seq RESTART with '|| maxid;
end;

$$ language plpgsql;

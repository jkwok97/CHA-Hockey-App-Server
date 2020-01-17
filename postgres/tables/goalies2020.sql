DROP TABLE goalie_stats;

CREATE TABLE goalie_stats (
    id serial PRIMARY KEY,
    player_id text NOT NULL,
    player_name text NOT NULL,
    team_name text,
    games_played numeric NOT NULL,
    minutes_played numeric NOT NULL,
    goals_against_avg text NOT NULL,
    wins numeric NOT NULL,
    loss numeric NOT NULL,
    ties numeric NOT NULL,
    en_goals numeric NOT NULL,
    shutouts numeric NOT NULL,
    goals_against numeric NOT NULL,
    saves numeric NOT NULL,
    shots_for numeric NOT NULL,
    save_pct text NOT NULL,
    goals numeric NOT NULL,
    assists numeric NOT NULL,
    points numeric NOT NULL,
    penalty_minutes numeric NOT NULL,
    pass_complete numeric NOT NULL,
    pass_incomplete numeric NOT NULL,
    pass_attempts numeric NOT NULL,
    pass_pct text NOT NULL,
    penalty_minor numeric NOT NULL,
    penalty_minor_coincidental numeric NOT NULL,
    penalty_major numeric NOT NULL,
    penalty_fighting_major numeric NOT NULL,
    penalty_match numeric NOT NULL,
    penalty_misconduct numeric NOT NULL,
    penalty_game_misconduct numeric NOT NULL,
    penalty_gross_misconduct numeric NOT NULL,
    playing_year text NOT NULL,
    season_type text NOT NULL,
    player_status text NOT NULL
);

\copy goalie_stats (player_id, player_name, team_name, games_played, minutes_played, goals_against_avg, wins, loss, ties, en_goals, shutouts, goals_against, saves, shots_for, save_pct, goals, assists, points, penalty_minutes, pass_complete, pass_incomplete, pass_attempts, pass_pct, penalty_minor, penalty_minor_coincidental, penalty_major, penalty_fighting_major, penalty_match, penalty_misconduct, penalty_game_misconduct, penalty_gross_misconduct, playing_year, season_type, player_status) FROM '/Users/jeffkwok/Desktop/CHA-Hockey-app-server/postgres/seed/goalieStats.tsv'

do $$
declare maxid int;
begin
    select max(id)+1 from goalie_stats into maxid;
    execute 'alter SEQUENCE goalie_stats_id_seq RESTART with '|| maxid;
end;

$$ language plpgsql;
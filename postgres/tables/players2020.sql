DROP TABLE players_stats;

CREATE TABLE players_stats (
    id serial PRIMARY KEY,
    player_id numeric NOT NULL,
    player_name text NOT NULL,
    team_name text,
    position text NOT NULL,
    games_played numeric NOT NULL,
    goals numeric NOT NULL,
    assists numeric NOT NULL,
    points numeric NOT NULL,
    plus_minus numeric NOT NULL,
    penalty_minutes numeric NOT NULL,
    pp_goals numeric NOT NULL,
    sh_goals numeric NOT NULL,
    gw_goals numeric NOT NULL,
    gt_goals numeric NOT NULL,
    shots numeric NOT NULL,
    shooting_pct text NOT NULL,
    minutes_played numeric NOT NULL,
    minutes_per_game text NOT NULL,
    fo_won numeric NOT NULL,
    fo_lost numeric NOT NULL,
    fo_tied numeric NOT NULL,
    fo_pct text NOT NULL,
    pass_complete numeric NOT NULL,
    pass_incomplete numeric NOT NULL,
    pass_attempts numeric NOT NULL,
    pass_pct text NOT NULL,
    corner_won numeric NOT NULL,
    corner_lost numeric NOT NULL,
    corner_total numeric NOT NULL,
    corner_pct text NOT NULL,
    fights_won numeric NOT NULL,
    fights_lost numeric NOT NULL,
    fights_tied numeric NOT NULL,
    fights_total numeric NOT NULL,
    fights_pct text NOT NULL,
    hits numeric NOT NULL,
    hit_per_game text NOT NULL,
    blocked_shots numeric NOT NULL,
    blocked_shot_per_game text NOT NULL,
    current_points_streak numeric NOT NULL,
    longest_points_streak numeric NOT NULL,
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

\copy players_stats (player_id, player_name, team_name, position, games_played, goals, assists, points, plus_minus, penalty_minutes, pp_goals, sh_goals, gw_goals, gt_goals, shots, shooting_pct, minutes_played, minutes_per_game, fo_won, fo_lost, fo_tied, fo_pct, pass_complete, pass_incomplete, pass_attempts, pass_pct, corner_won, corner_lost, corner_total, corner_pct, fights_won, fights_lost, fights_tied, fights_total, fights_pct, hits, hit_per_game, blocked_shots, blocked_shot_per_game, current_points_streak, longest_points_streak, penalty_minor, penalty_minor_coincidental, penalty_major, penalty_fighting_major, penalty_match, penalty_misconduct, penalty_game_misconduct, penalty_gross_misconduct, playing_year, season_type, player_status) FROM '/Users/jeffkwok/Desktop/CHA-Hockey-app-server/postgres/seed/playerStats.tsv'

do $$
declare maxid int;
begin
    select max(id)+1 from players_stats into maxid;
    execute 'alter SEQUENCE players_stats_id_seq RESTART with '|| maxid;
end;

$$ language plpgsql;


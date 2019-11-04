DROP TABLE players_stats;

CREATE TABLE players_stats (
    id serial PRIMARY KEY,
    player_name text NOT NULL,
    team_name text,
    position text NOT NULL,
    games_played text NOT NULL,
    goals text NOT NULL,
    assists text NOT NULL,
    points text NOT NULL,
    plus_minus text NOT NULL,
    penalty_minutes text NOT NULL,
    pp_goals text NOT NULL,
    sh_goals text NOT NULL,
    gw_goals text NOT NULL,
    gt_goals text NOT NULL,
    shots text NOT NULL,
    shooting_pct text NOT NULL,
    minutes_played text NOT NULL,
    minutes_per_game text NOT NULL,
    fo_won text NOT NULL,
    fo_lost text NOT NULL,
    fo_tied text NOT NULL,
    fo_pct text NOT NULL,
    pass_complete text NOT NULL,
    pass_incomplete text NOT NULL,
    pass_attempts text NOT NULL,
    pass_pct text NOT NULL,
    corner_won text NOT NULL,
    corner_lost text NOT NULL,
    corner_total text NOT NULL,
    corner_pct text NOT NULL,
    fights_won text NOT NULL,
    fights_lost text NOT NULL,
    fights_tied text NOT NULL,
    fights_total text NOT NULL,
    fights_pct text NOT NULL,
    hits text NOT NULL,
    hit_per_game text NOT NULL,
    blocked_shots text NOT NULL,
    blocked_shot_per_game text NOT NULL,
    current_points_streak text NOT NULL,
    longest_points_streak text NOT NULL,
    penalty_minor text NOT NULL,
    penalty_minor_coincidental text NOT NULL,
    penalty_major text NOT NULL,
    penalty_fighting_major text NOT NULL,
    penalty_match text NOT NULL,
    penalty_misconduct text NOT NULL,
    penalty_game_misconduct text NOT NULL,
    penalty_gross_misconduct text NOT NULL,
    playing_year text NOT NULL,
    season_type text NOT NULL
);

\copy players_stats (player_name, team_name, position, games_played, goals, assists, points, plus_minus, penalty_minutes, pp_goals, sh_goals, gw_goals, gt_goals, shots, shooting_pct, minutes_played, minutes_per_game, fo_won, fo_lost, fo_tied, fo_pct, pass_complete, pass_incomplete, pass_attempts, pass_pct, corner_won, corner_lost, corner_total, corner_pct, fights_won, fights_lost, fights_tied, fights_total, fights_pct, hits, hit_per_game, blocked_shots, blocked_shot_per_game, current_points_streak, longest_points_streak, penalty_minor, penalty_minor_coincidental, penalty_major, penalty_fighting_major, penalty_match, penalty_misconduct, penalty_game_misconduct, penalty_gross_misconduct, playing_year, season_type) FROM '/Users/jeffkwok/Desktop/CHA-Hockey-app-server/postgres/seed/playerStats.tsv'

do $$
declare maxid int;
begin
    select max(id)+1 from players_stats into maxid;
    execute 'alter SEQUENCE players_stats_id_seq RESTART with '|| maxid;
end;

$$ language plpgsql;






INSERT INTO TABLE players_stats (
    id serial PRIMARY KEY,
    player_name text NOT NULL,
    team_name text,
    position text NOT NULL,
    games_played text NOT NULL,
    goals text NOT NULL,
    assists text NOT NULL,
    points text NOT NULL,
    plus_minus text NOT NULL,
    penalty_minutes text NOT NULL,
    pp_goals text NOT NULL,
    sh_goals text NOT NULL,
    gw_goals text NOT NULL,
    gt_goals text NOT NULL,
    shots text NOT NULL,
    shooting_pct text NOT NULL,
    minutes_played text NOT NULL,
    minutes_per_game text NOT NULL,
    fo_won text NOT NULL,
    fo_lost text NOT NULL,
    fo_tied text NOT NULL,
    fo_pct text NOT NULL,
    pass_complete text NOT NULL,
    pass_incomplete text NOT NULL,
    pass_attempts text NOT NULL,
    pass_pct text NOT NULL,
    corner_won text NOT NULL,
    corner_lost text NOT NULL,
    corner_total text NOT NULL,
    corner_pct text NOT NULL,
    fights_won text NOT NULL,
    fights_lost text NOT NULL,
    fights_tied text NOT NULL,
    fights_total text NOT NULL,
    fights_pct text NOT NULL,
    hits text NOT NULL,
    hit_per_game text NOT NULL,
    blocked_shots text NOT NULL,
    blocked_shot_per_game text NOT NULL,
    current_points_streak text NOT NULL,
    longest_points_streak text NOT NULL,
    penalty_minor text NOT NULL,
    penalty_minor_coincidental text NOT NULL,
    penalty_major text NOT NULL,
    penalty_fighting_major text NOT NULL,
    penalty_match text NOT NULL,
    penalty_misconduct text NOT NULL,
    penalty_game_misconduct text NOT NULL,
    penalty_gross_misconduct text NOT NULL,
    playing_year text NOT NULL,
    season_type text NOT NULL
);

\copy players_stats (player_name, team_name, position, games_played, goals, assists, points, plus_minus, penalty_minutes, pp_goals, sh_goals, gw_goals, gt_goals, shots, shooting_pct, minutes_played, minutes_per_game, fo_won, fo_lost, fo_tied, fo_pct, pass_complete, pass_incomplete, pass_attempts, pass_pct, corner_won, corner_lost, corner_total, corner_pct, fights_won, fights_lost, fights_tied, fights_total, fights_pct, hits, hit_per_game, blocked_shots, blocked_shot_per_game, current_points_streak, longest_points_streak, penalty_minor, penalty_minor_coincidental, penalty_major, penalty_fighting_major, penalty_match, penalty_misconduct, penalty_game_misconduct, penalty_gross_misconduct, playing_year, season_type) FROM '/Users/jeffkwok/Desktop/CHA-Hockey-app-server/postgres/seed/playerStatsTest.tsv'

do $$
declare maxid int;
begin
    select max(id)+1 from players_stats into maxid;
    execute 'alter SEQUENCE players_stats_id_seq RESTART with '|| maxid;
end;

$$ language plpgsql;

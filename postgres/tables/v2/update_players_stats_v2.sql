DROP TABLE tmp_x;

CREATE TEMP TABLE tmp_x AS SELECT * FROM players_stats_v2 LIMIT 0;

\copy tmp_x (player_id, team_name, position, games_played, goals, assists, points, plus_minus, penalty_minutes, pp_goals, sh_goals, gw_goals, gt_goals, shots, shooting_pct, minutes_played, minutes_per_game, fo_won, fo_lost, fo_tied, fo_pct, pass_complete, pass_incomplete, pass_attempts, pass_pct, corner_won, corner_lost, corner_total, corner_pct, fights_won, fights_lost, fights_tied, fights_total, fights_pct, hits, hit_per_game, blocked_shots, blocked_shot_per_game, current_points_streak, longest_points_streak, penalty_minor, penalty_minor_coincidental, penalty_major, penalty_fighting_major, penalty_match, penalty_misconduct, penalty_game_misconduct, penalty_gross_misconduct, playing_year, season_type, player_status) FROM '/Users/jeffkwok/Desktop/CHA-Hockey-app-server/postgres/seed/v2/update_players_stats_v2.tsv'

UPDATE players_stats_v2
SET 
    team_name = tmp_x.team_name,
    games_played = tmp_x.games_played,
    goals = tmp_x.goals,
    assists = tmp_x.assists,
    points = tmp_x.points,
    plus_minus = tmp_x.plus_minus,
    penalty_minutes = tmp_x.penalty_minutes,
    pp_goals = tmp_x.pp_goals,
    sh_goals = tmp_x.sh_goals,
    gw_goals = tmp_x.gw_goals,
    gt_goals = tmp_x.gt_goals,
    shots = tmp_x.shots,
    shooting_pct = tmp_x.shooting_pct,
    minutes_played = tmp_x.minutes_played,
    minutes_per_game = tmp_x.minutes_per_game,
    fo_won = tmp_x.fo_won,
    fo_lost = tmp_x.fo_lost,
    fo_tied = tmp_x.fo_tied,
    fo_pct = tmp_x.fo_pct,
    pass_complete = tmp_x.pass_complete,
    pass_incomplete = tmp_x.pass_incomplete,
    pass_attempts = tmp_x.pass_attempts,
    pass_pct = tmp_x.pass_pct,
    corner_won = tmp_x.corner_won,
    corner_lost = tmp_x.corner_lost,
    corner_total = tmp_x.corner_total,
    corner_pct = tmp_x.corner_pct,
    fights_won = tmp_x.fights_won,
    fights_lost = tmp_x.fights_lost,
    fights_tied = tmp_x.fights_tied,
    fights_total = tmp_x.fights_total,
    fights_pct = tmp_x.fights_pct,
    hits = tmp_x.hits,
    hit_per_game = tmp_x.hit_per_game,
    blocked_shots = tmp_x.blocked_shots,
    blocked_shot_per_game = tmp_x.blocked_shot_per_game,
    current_points_streak = tmp_x.current_points_streak,
    longest_points_streak = tmp_x.longest_points_streak,
    penalty_minor = tmp_x.penalty_minor,
    penalty_minor_coincidental = tmp_x.penalty_minor_coincidental,
    penalty_major = tmp_x.penalty_major,
    penalty_fighting_major = tmp_x.penalty_fighting_major,
    penalty_match = tmp_x.penalty_match,
    penalty_misconduct = tmp_x.penalty_misconduct,
    penalty_game_misconduct = tmp_x.penalty_game_misconduct,
    penalty_gross_misconduct = tmp_x.penalty_gross_misconduct,
    playing_year = tmp_x.playing_year,
    season_type = tmp_x.season_type
FROM   tmp_x
WHERE  players_stats_v2.player_id = tmp_x.player_id AND players_stats_v2.playing_year = tmp_x.playing_year AND players_stats_v2.season_type = tmp_x.season_type;

DROP TABLE tmp_x;
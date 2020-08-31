DROP TABLE tmp_x;

CREATE TEMP TABLE tmp_x AS SELECT * FROM goalies_stats_v2 LIMIT 0;

\copy tmp_x (player_id, team_name, games_played, minutes_played, goals_against_avg, wins, loss, ties, en_goals, shutouts, goals_against, saves, shots_for, save_pct, goals, assists, points, penalty_minutes, pass_complete, pass_incomplete, pass_attempts, pass_pct, penalty_minor, penalty_minor_coincidental, penalty_major, penalty_fighting_major, penalty_match, penalty_misconduct, penalty_game_misconduct, penalty_gross_misconduct, playing_year, season_type, player_status) FROM '/Users/jeffkwok/Desktop/CHA-Hockey-app-server/postgres/seed/v2/update_goalies_stats_v2.tsv'

UPDATE goalie_stats_v2
SET 
    team_name = tmp_x.team_name,
    games_played = tmp_x.games_played,
    minutes_played = tmp_x.minutes_played,
    goals_against_avg = tmp_x.goals_against_avg,
    wins = tmp_x.wins,
    loss = tmp_x.loss,
    ties = tmp_x.ties,
    en_goals = tmp_x.en_goals,
    shutouts = tmp_x.shutouts,
    goals_against = tmp_x.goals_against,
    saves = tmp_x.saves,
    shots_for = tmp_x.shots_for,
    save_pct = tmp_x.save_pct,
    goals = tmp_x.goals,
    assists = tmp_x.assists,
    points = tmp_x.points,
    penalty_minutes = tmp_x.penalty_minutes,
    pass_complete = tmp_x.pass_complete,
    pass_incomplete = tmp_x.pass_incomplete,
    pass_attempts = tmp_x.pass_attempts,
    pass_pct = tmp_x.pass_pct,
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
WHERE  goalie_stats_v2.player_id = tmp_x.player_id AND goalie_stats_v2.playing_year = tmp_x.playing_year AND goalie_stats_v2.season_type = tmp_x.season_type;

DROP TABLE tmp_x;
DROP TABLE tmp_x;

CREATE TEMP TABLE tmp_x AS SELECT * FROM teams LIMIT 0;

\copy tmp_x (team_id, team_name, team_city, team_nickname, games_played, wins, loss, ties, points, goals_for, goals_against, pp_attempts, pp_goals, pp_min, pk_attempts, pk_goals, pk_min, penalty_minutes, sh_goals, home_wins, home_loss, home_ties, road_wins, road_loss, road_ties, div_win, div_loss, div_tie, ot_win, ot_loss, lead_after_two_wins, lead_after_two_loss, lead_after_two_ties, trail_after_two_wins, trail_after_two_loss, trail_after_two_ties, even_after_two_wins, even_after_two_loss, even_after_two_ties, long_win_streak, shots_for, shots_against, face_off_won, face_off_lost, corner_won, corner_lost, pass_complete, pass_incomplete, empty_net, shut_outs, playing_year, season_type) FROM '/Users/jeffkwok/Desktop/CHA-Hockey-app-server/postgres/seed/teamStatsUpdate.tsv'

UPDATE teams
SET 
    team_name = tmp_x.team_name,
    team_nickname = tmp_x.team_nickname,
    games_played = tmp_x.games_played,
    wins = tmp_x.wins,
    loss = tmp_x.loss,
    ties = tmp_x.ties,
    points = tmp_x.points,
    goals_for = tmp_x.goals_for,
    goals_against = tmp_x.goals_against,
    pp_attempts = tmp_x.pp_attempts,
    pp_goals = tmp_x.pp_goals,
    pp_min = tmp_x.pp_min,
    pk_attempts = tmp_x.pk_attempts,
    pk_goals = tmp_x.pk_goals,
    pk_min = tmp_x.pk_min,
    penalty_minutes = tmp_x.penalty_minutes,
    sh_goals = tmp_x.sh_goals,
    home_wins = tmp_x.home_wins,
    home_loss = tmp_x.home_loss,
    home_ties = tmp_x.home_ties,
    road_wins = tmp_x.road_wins,
    road_loss = tmp_x.road_loss,
    road_ties = tmp_x.road_ties,
    div_win = tmp_x.div_win,
    div_loss = tmp_x.div_loss,
    div_tie = tmp_x.div_tie,
    ot_win = tmp_x.ot_win,
    ot_loss = tmp_x.ot_loss,
    lead_after_two_wins = tmp_x.lead_after_two_wins,
    lead_after_two_loss = tmp_x.lead_after_two_loss,
    lead_after_two_ties = tmp_x.lead_after_two_ties,
    trail_after_two_wins = tmp_x.trail_after_two_wins,
    trail_after_two_loss = tmp_x.trail_after_two_loss,
    trail_after_two_ties = tmp_x.trail_after_two_ties,
    even_after_two_wins = tmp_x.even_after_two_wins,
    even_after_two_loss = tmp_x.even_after_two_loss,
    even_after_two_ties = tmp_x.even_after_two_ties,
    long_win_streak = tmp_x.long_win_streak,
    shots_for = tmp_x.shots_for,
    shots_against = tmp_x.shots_against,
    face_off_won = tmp_x.face_off_won,
    face_off_lost = tmp_x.face_off_lost,
    corner_won = tmp_x.corner_won,
    corner_lost = tmp_x.corner_lost,
    pass_complete = tmp_x.pass_complete,
    pass_incomplete = tmp_x.pass_incomplete,
    empty_net = tmp_x.empty_net,
    shut_outs = tmp_x.shut_outs,
    playing_year = tmp_x.playing_year,
    season_type = tmp_x.season_type
FROM   tmp_x
WHERE  teams.team_id = tmp_x.team_id AND teams.playing_year = tmp_x.playing_year AND teams.season_type = tmp_x.season_type;

DROP TABLE tmp_x;
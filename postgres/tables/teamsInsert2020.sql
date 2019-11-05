INSERT INTO teams (
    team_id,
    team_name,
    games_played,
    wins,
    loss,
    ties,
    points,
    goals_for,
    goals_against,
    pp_attempts,
    pp_goals,
    pp_min,
    pk_attempts,
    pk_goals,
    pk_min,
    penalty_minutes,
    sh_goals,
    home_wins,
    home_loss,
    home_ties,
    road_wins,
    road_loss,
    road_ties,
    div_win,
    div_loss,
    div_tie,
    ot_win,
    ot_loss,
    lead_after_two_wins,
    lead_after_two_loss,
    lead_after_two_ties,
    trail_after_two_wins,
    trail_after_two_loss,
    trail_after_two_ties,
    even_after_two_wins,
    even_after_two_loss,
    even_after_two_ties,
    long_win_streak,
    shots_for,
    shots_against,
    face_off_won,
    face_off_lost,
    corner_won,
    corner_lost,
    pass_complete,
    pass_incomplete,
    empty_net,
    shut_outs,
    playing_year,
    season_type
)
VALUES (
    team_id,
    team_name,
    games_played,
    wins,
    loss,
    ties,
    points,
    goals_for,
    goals_against,
    pp_attempts,
    pp_goals,
    pp_min,
    pk_attempts,
    pk_goals,
    pk_min,
    penalty_minutes,
    sh_goals,
    home_wins,
    home_loss,
    home_ties,
    road_wins,
    road_loss,
    road_ties,
    div_win,
    div_loss,
    div_tie,
    ot_win,
    ot_loss,
    lead_after_two_wins,
    lead_after_two_loss,
    lead_after_two_ties,
    trail_after_two_wins,
    trail_after_two_loss,
    trail_after_two_ties,
    even_after_two_wins,
    even_after_two_loss,
    even_after_two_ties,
    long_win_streak,
    shots_for,
    shots_against,
    face_off_won,
    face_off_lost,
    corner_won,
    corner_lost,
    pass_complete,
    pass_incomplete,
    empty_net,
    shut_outs,
    playing_year,
    season_type
)
ON CONFLICT (team_id) DO UPDATE SET 
team_name=EXCLUDED.team_name,
games_played=EXCLUDED.games_played,
wins=EXCLUDED.wins,
loss=EXCLUDED.loss,
ties=EXCLUDED.ties,
points=EXCLUDED.points,
goals_for=EXCLUDED.goals_for,
goals_against=EXCLUDED.goals_against,
pp_attempts=EXCLUDED.pp_attempts,
pp_goals=EXCLUDED.pp_goals,
pp_min=EXCLUDED.pp_min,
pk_attempts=EXCLUDED.pk_attempts,
pk_goals=EXCLUDED.pk_goals,
pk_min=EXCLUDED.pk_min,
penalty_minutes=EXCLUDED.penalty_minutes,
sh_goals=EXCLUDED.sh_goals,
home_wins=EXCLUDED.home_wins,
home_loss=EXCLUDED.home_loss,
home_ties=EXCLUDED.home_ties,
road_wins=EXCLUDED.road_wins,
road_loss=EXCLUDED.road_loss,
road_ties=EXCLUDED.road_ties,
div_win=EXCLUDED.div_win,
div_loss=EXCLUDED.div_loss,
div_tie=EXCLUDED.div_tie,
ot_win=EXCLUDED.ot_win,
ot_loss=EXCLUDED.ot_loss,
lead_after_two_wins=EXCLUDED.lead_after_two_wins,
lead_after_two_loss=EXCLUDED.lead_after_two_loss,
lead_after_two_ties=EXCLUDED.lead_after_two_ties,
trail_after_two_wins=EXCLUDED.trail_after_two_wins,
trail_after_two_loss=EXCLUDED.trail_after_two_loss,
trail_after_two_ties=EXCLUDED.trail_after_two_ties,
even_after_two_wins=EXCLUDED.even_after_two_wins,
even_after_two_loss=EXCLUDED.even_after_two_loss,
even_after_two_ties=EXCLUDED.even_after_two_ties,
long_win_streak=EXCLUDED.long_win_streak,
shots_for=EXCLUDED.shots_for,
shots_against=EXCLUDED.shots_against,
face_off_won=EXCLUDED.face_off_won,
face_off_lost=EXCLUDED.face_off_lost,
corner_won=EXCLUDED.corner_won,
corner_lost=EXCLUDED.corner_lost,
pass_complete=EXCLUDED.pass_complete,
pass_incomplete=EXCLUDED.pass_incomplete,
empty_net=EXCLUDED.empty_net,
shut_outs=EXCLUDED.shut_outs,
playing_year=EXCLUDED.playing_year,
season_type=EXCLUDED.season_type;

\copy teams (team_id, team_name, games_played, wins, loss, ties, points, goals_for, goals_against, pp_attempts, pp_goals, pp_min, pk_attempts, pk_goals, pk_min, penalty_minutes, sh_goals, home_wins, home_loss, home_ties, road_wins, road_loss, road_ties, div_win, div_loss, div_tie, ot_win, ot_loss, lead_after_two_wins, lead_after_two_loss, lead_after_two_ties, trail_after_two_wins, trail_after_two_loss, trail_after_two_ties, even_after_two_wins, even_after_two_loss, even_after_two_ties, long_win_streak, shots_for, shots_against, face_off_won, face_off_lost, corner_won, corner_lost, pass_complete, pass_incomplete, empty_net, shut_outs, playing_year, season_type) FROM '/Users/jeffkwok/Desktop/CHA-Hockey-app-server/postgres/seed/teamStats.tsv'

do $$
declare maxid int;
begin
    select max(id)+1 from teams into maxid;
    execute 'alter SEQUENCE teams_id_seq RESTART with '|| maxid;
end;

$$ language plpgsql;
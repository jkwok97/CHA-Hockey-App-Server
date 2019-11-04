INSERT INTO teams (
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
);

\copy teams (team_name, games_played, wins, loss, ties, points, goals_for, goals_against, pp_attempts, pp_goals, pp_min, pk_attempts, pk_goals, pk_min, penalty_minutes, sh_goals, home_wins, home_loss, home_ties, road_wins, road_loss, road_ties, div_win, div_loss, div_tie, ot_win, ot_loss, lead_after_two_wins, lead_after_two_loss, lead_after_two_ties, trail_after_two_wins, trail_after_two_loss, trail_after_two_ties, even_after_two_wins, even_after_two_loss, even_after_two_ties, long_win_streak, shots_for, shots_against, face_off_won, face_off_lost, corner_won, corner_lost, pass_complete, pass_incomplete, empty_net, shut_outs, playing_year, season_type) FROM '/Users/jeffkwok/Desktop/CHA-Hockey-app-server/postgres/seed/teamStatsTest.tsv'

do $$
declare maxid int;
begin
    select max(id)+1 from teams into maxid;
    execute 'alter SEQUENCE teams_id_seq RESTART with '|| maxid;
end;

$$ language plpgsql;
DROP TABLE teams;

CREATE TABLE teams (
    id serial PRIMARY KEY,
    team_id text NOT NULL,
    team_name text NOT NULL,
    games_played text NOT NULL,
    wins text NOT NULL,
    loss text NOT NULL,
    ties text NOT NULL,
    points text NOT NULL,
    goals_for text NOT NULL,
    goals_against text NOT NULL,
    pp_attempts text NOT NULL,
    pp_goals text NOT NULL,
    pp_min text NOT NULL,
    pk_attempts text NOT NULL,
    pk_goals text NOT NULL,
    pk_min text NOT NULL,
    penalty_minutes text NOT NULL,
    sh_goals text NOT NULL,
    home_wins text NOT NULL,
    home_loss text NOT NULL,
    home_ties text NOT NULL,
    road_wins text NOT NULL,
    road_loss text NOT NULL,
    road_ties text NOT NULL,
    div_win text NOT NULL,
    div_loss text NOT NULL,
    div_tie text NOT NULL,
    ot_win text NOT NULL,
    ot_loss text NOT NULL,
    lead_after_two_wins text NOT NULL,
    lead_after_two_loss text NOT NULL,
    lead_after_two_ties text NOT NULL,
    trail_after_two_wins text NOT NULL,
    trail_after_two_loss text NOT NULL,
    trail_after_two_ties text NOT NULL,
    even_after_two_wins text NOT NULL,
    even_after_two_loss text NOT NULL,
    even_after_two_ties text NOT NULL,
    long_win_streak text NOT NULL,
    shots_for text NOT NULL,
    shots_against text NOT NULL,
    face_off_won text NOT NULL,
    face_off_lost text NOT NULL,
    corner_won text NOT NULL,
    corner_lost text NOT NULL,
    pass_complete text NOT NULL,
    pass_incomplete text NOT NULL,
    empty_net text NOT NULL,
    shut_outs text NOT NULL,
    playing_year text NOT NULL,
    season_type text NOT NULL
);

\copy teams (team_id, team_name, games_played, wins, loss, ties, points, goals_for, goals_against, pp_attempts, pp_goals, pp_min, pk_attempts, pk_goals, pk_min, penalty_minutes, sh_goals, home_wins, home_loss, home_ties, road_wins, road_loss, road_ties, div_win, div_loss, div_tie, ot_win, ot_loss, lead_after_two_wins, lead_after_two_loss, lead_after_two_ties, trail_after_two_wins, trail_after_two_loss, trail_after_two_ties, even_after_two_wins, even_after_two_loss, even_after_two_ties, long_win_streak, shots_for, shots_against, face_off_won, face_off_lost, corner_won, corner_lost, pass_complete, pass_incomplete, empty_net, shut_outs, playing_year, season_type) FROM '/Users/jeffkwok/Desktop/CHA-Hockey-app-server/postgres/seed/teamStats.tsv'

do $$
declare maxid int;
begin
    select max(id)+1 from teams into maxid;
    execute 'alter SEQUENCE teams_id_seq RESTART with '|| maxid;
end;

$$ language plpgsql;

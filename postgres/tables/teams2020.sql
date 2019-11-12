DROP TABLE teams;

CREATE TABLE teams (
    id serial PRIMARY KEY,
    team_id text NOT NULL,
    team_name text NOT NULL,
    team_city text NOT NULL,
    team_nickname text NOT NULL,
    games_played numeric NOT NULL,
    wins numeric NOT NULL,
    loss numeric NOT NULL,
    ties numeric NOT NULL,
    points numeric NOT NULL,
    goals_for numeric NOT NULL,
    goals_against numeric NOT NULL,
    pp_attempts numeric NOT NULL,
    pp_goals numeric NOT NULL,
    pp_min numeric NOT NULL,
    pk_attempts numeric NOT NULL,
    pk_goals numeric NOT NULL,
    pk_min numeric NOT NULL,
    penalty_minutes numeric NOT NULL,
    sh_goals numeric NOT NULL,
    home_wins numeric NOT NULL,
    home_loss numeric NOT NULL,
    home_ties numeric NOT NULL,
    road_wins numeric NOT NULL,
    road_loss numeric NOT NULL,
    road_ties numeric NOT NULL,
    div_win numeric NOT NULL,
    div_loss numeric NOT NULL,
    div_tie numeric NOT NULL,
    ot_win numeric NOT NULL,
    ot_loss numeric NOT NULL,
    lead_after_two_wins numeric NOT NULL,
    lead_after_two_loss numeric NOT NULL,
    lead_after_two_ties numeric NOT NULL,
    trail_after_two_wins numeric NOT NULL,
    trail_after_two_loss numeric NOT NULL,
    trail_after_two_ties numeric NOT NULL,
    even_after_two_wins numeric NOT NULL,
    even_after_two_loss numeric NOT NULL,
    even_after_two_ties numeric NOT NULL,
    long_win_streak numeric NOT NULL,
    shots_for numeric NOT NULL,
    shots_against numeric NOT NULL,
    face_off_won numeric NOT NULL,
    face_off_lost numeric NOT NULL,
    corner_won numeric NOT NULL,
    corner_lost numeric NOT NULL,
    pass_complete numeric NOT NULL,
    pass_incomplete numeric NOT NULL,
    empty_net numeric NOT NULL,
    shut_outs numeric NOT NULL,
    playing_year text NOT NULL,
    season_type text NOT NULL
);

\copy teams (team_id, team_name, team_city, team_nickname, games_played, wins, loss, ties, points, goals_for, goals_against, pp_attempts, pp_goals, pp_min, pk_attempts, pk_goals, pk_min, penalty_minutes, sh_goals, home_wins, home_loss, home_ties, road_wins, road_loss, road_ties, div_win, div_loss, div_tie, ot_win, ot_loss, lead_after_two_wins, lead_after_two_loss, lead_after_two_ties, trail_after_two_wins, trail_after_two_loss, trail_after_two_ties, even_after_two_wins, even_after_two_loss, even_after_two_ties, long_win_streak, shots_for, shots_against, face_off_won, face_off_lost, corner_won, corner_lost, pass_complete, pass_incomplete, empty_net, shut_outs, playing_year, season_type) FROM '/Users/jeffkwok/Desktop/CHA-Hockey-app-server/postgres/seed/teamStats.tsv'

do $$
declare maxid int;
begin
    select max(id)+1 from teams into maxid;
    execute 'alter SEQUENCE teams_id_seq RESTART with '|| maxid;
end;

$$ language plpgsql;

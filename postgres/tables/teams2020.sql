DROP TABLE teams;

CREATE TABLE teams (
    id serial PRIMARY KEY,
    team_name text NOT NULL,
    games_played text NOT NULL,
    wins text NOT NULL,
    loss text NOT NULL,
    ties text NOT NULL,
    goals_for text NOT NULL,
    goals_against text NOT NULL,
    goal_differential text NOT NULL,
    points text NOT NULL,
    win_pct text NOT NULL,
    last_ten text NOT NULL,
    pp_attempts text NOT NULL,
    pp_goals text NOT NULL,
    pp_pct text NOT NULL,
    pk_attempts text NOT NULL,
    pk_goals text NOT NULL,
    pk_pct text NOT NULL,
    penalty_minutes text NOT NULL,
    penalty_min_game text NOT NULL
);

\copy teams (team_name, games_played, wins, loss, ties, goals_for, goals_against, goal_differential, points, win_pct, last_ten, pp_attempts, pp_goals, pp_pct, pk_attempts, pk_goals, pk_pct, penalty_minutes, penalty_min_game) FROM '/Users/jeffkwok/Desktop/CHA-Hockey-app-server/postgres/seed/teamStats.tsv'

do $$
declare maxid int;
begin
    select max(id)+1 from teams into maxid;
    execute 'alter SEQUENCE teams_id_seq RESTART with '|| maxid;
end;

$$ language plpgsql
DROP TABLE goalie_ratings_v2;

CREATE TABLE goalie_ratings_v2 (
    id serial PRIMARY KEY,
    player_id text NOT NULL,
    games_played numeric NOT NULL,
    minutes_played numeric NOT NULL,
    goals_against_avg text NOT NULL,
    wins numeric NOT NULL,
    loss numeric NOT NULL,
    ties numeric NOT NULL,
    en_goals numeric NOT NULL,
    shutouts numeric NOT NULL,
    goals_against numeric NOT NULL,
    saves numeric NOT NULL,
    shots_for numeric NOT NULL,
    save_pct text NOT NULL,
    goals numeric NOT NULL,
    assists numeric NOT NULL,
    points numeric NOT NULL,
    penalty_minutes numeric NOT NULL,
    skating text NOT NULL,
    speed text NOT NULL,
    passing text NOT NULL,
    playing_year text NOT NULL
);

\copy goalie_ratings_v2 (player_id, games_played, minutes_played, goals_against_avg, wins, loss, ties, en_goals, shutouts, goals_against, saves, shots_for, save_pct, goals, assists, points, penalty_minutes, skating, speed, passing, playing_year) FROM '/Users/jeffkwok/Desktop/CHA-Hockey-app-server/postgres/seed/v2/goalie_ratings_v2.tsv'

do $$
declare maxid int;
begin
    select max(id)+1 from goalie_ratings_v2 into maxid;
    execute 'alter SEQUENCE goalie_ratings_id_seq RESTART with '|| maxid;
end;

$$ language plpgsql;
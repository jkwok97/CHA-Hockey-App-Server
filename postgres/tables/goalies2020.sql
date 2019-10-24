DROP TABLE goalie_stats;

CREATE TABLE goalie_stats (
    id serial PRIMARY KEY,
    player_name text NOT NULL,
    team_name text,
    games_played text NOT NULL,
    minutes_played text NOT NULL,
    goals_against_avg text NOT NULL,
    wins text NOT NULL,
    loss text NOT NULL,
    ties text NOT NULL,
    en_goals text NOT NULL,
    shutouts text NOT NULL,
    goals_against text NOT NULL,
    saves text NOT NULL,
    shots_for text NOT NULL,
    save_pct text NOT NULL,
    goals text NOT NULL,
    assists text NOT NULL,
    points text NOT NULL,
    penalty_minutes text NOT NULL,
    pass_complete text NOT NULL,
    pass_incomplete text NOT NULL,
    pass_attempts text NOT NULL,
    pass_pct text NOT NULL,
    penalty_minor text NOT NULL,
    penalty_minor_coincidental text NOT NULL,
    penalty_major text NOT NULL,
    penalty_fighting_major text NOT NULL,
    penalty_match text NOT NULL,
    penalty_misconduct text NOT NULL,
    penalty_game_misconduct text NOT NULL,
    penalty_gross_misconduct text NOT NULL
);

\copy goalie_stats (player_name, team_name, games_played, minutes_played, goals_against_avg, wins, loss, ties, en_goals, shutouts, goals_against, saves, shots_for, save_pct, goals, assists, points, penalty_minutes, pass_complete, pass_incomplete, pass_attempts, pass_pct, penalty_minor, penalty_minor_coincidental, penalty_major, penalty_fighting_major, penalty_match, penalty_misconduct, penalty_game_misconduct, penalty_gross_misconduct) FROM '/Users/jeffkwok/Desktop/CHA-Hockey-app-server/postgres/seed/goalieStats.tsv'

do $$
declare maxid int;
begin
    select max(id)+1 from goalie_stats into maxid;
    execute 'alter SEQUENCE goalie_stats_id_seq RESTART with '|| maxid;
end;

$$ language plpgsql
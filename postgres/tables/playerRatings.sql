DROP TABLE players_ratings;

CREATE TABLE players_ratings (
    id serial PRIMARY KEY,
    player_name text NOT NULL,
    team_name text,
    position text NOT NULL,
    games_played numeric NOT NULL,
    goals numeric NOT NULL,
    assists numeric NOT NULL,
    points numeric NOT NULL,
    plus_minus numeric NOT NULL,
    penalty_minutes numeric NOT NULL,
    pp_goals numeric NOT NULL,
    sh_goals numeric NOT NULL,
    gw_goals numeric NOT NULL,
    gt_goals numeric NOT NULL,
    shots numeric NOT NULL,
    shooting_pct text NOT NULL,
    game_fatigue text NOT NULL,
    shift_fatigue text NOT NULL,
    c_rate text NOT NULL,
    l_rate text NOT NULL,
    r_rate text NOT NULL,
    ld_rate text NOT NULL,
    rd_rate text NOT NULL,
    shooting text NOT NULL,
    skating text NOT NULL,
    speed text NOT NULL,
    passing text NOT NULL,
    forecheck text NOT NULL,
    physical text NOT NULL,
    intimidation text NOT NULL,
    clear_crease text NOT NULL,
    rock text NOT NULL,
    pk text NOT NULL,
    shot_block text NOT NULL,
    face_off text NOT NULL,
    assist_rating text NOT NULL
);

\copy players_ratings (player_name, team_name, position, games_played, goals, assists, points, plus_minus, penalty_minutes, pp_goals, sh_goals, gw_goals, gt_goals, shots, shooting_pct, game_fatigue, shift_fatigue, c_rate, l_rate, r_rate, ld_rate, rd_rate, shooting, skating, speed, passing, forecheck, physical, intimidation, clear_crease, rock, pk, shot_block, face_off, assist_rating ) FROM '/Users/jeffkwok/Desktop/CHA-Hockey-app-server/postgres/seed/playerRatings.tsv'

do $$
declare maxid int;
begin
    select max(id)+1 from players_ratings into maxid;
    execute 'alter SEQUENCE players_ratings_id_seq RESTART with '|| maxid;
end;

$$ language plpgsql;


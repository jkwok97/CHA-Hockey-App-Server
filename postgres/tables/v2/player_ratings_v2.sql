DROP TABLE player_ratings_v2;

CREATE TABLE player_ratings_v2 (
    id serial PRIMARY KEY,
    player_id numeric NOT NULL,
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
    assist_rating text NOT NULL,
    playing_year text NOT NULL
);


\copy player_ratings_v2 (player_id, games_played, goals, assists, points, plus_minus, penalty_minutes, pp_goals, sh_goals, gw_goals, gt_goals, shots, shooting_pct, game_fatigue, shift_fatigue, c_rate, l_rate, r_rate, ld_rate, rd_rate, shooting, skating, speed, passing, forecheck, physical, intimidation, clear_crease, rock, pk, shot_block, face_off, assist_rating, playing_year ) FROM '/Users/jeffkwok/Desktop/CHA-Hockey-app-server/postgres/seed/v2/player_ratings_v2.tsv'

do $$
declare maxid int;
begin
    select max(id)+1 from player_ratings_v2 into maxid;
    execute 'alter SEQUENCE player_ratings_v2_id_seq RESTART with '|| maxid;
end;

$$ language plpgsql;


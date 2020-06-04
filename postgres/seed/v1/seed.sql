BEGIN TRANSACTION;

\copy champions (year_won, team_name, owner_name) FROM 'postgres/seed/Champions.tsv' WITH NULL ''

do $$
declare maxid int;
begin
    select max(id)+1 from champions into maxid;
    execute 'alter SEQUENCE champions_id_seq RESTART with '|| maxid;
end;

$$ language plpgsql

\copy drafts (draft_year, round_num, number_num, team, player_name, player_pos) FROM 'postgres/seed/Drafts.tsv' WITH NULL ''

do $$
declare maxid int;
begin
    select max(id)+1 from drafts into maxid;
    execute 'alter SEQUENCE drafts_id_seq RESTART with '|| maxid;
end;

$$ language plpgsql

\copy players_stats (player_name, team_name, position, games_played, goals, assists, points, plus_minus, penalty_minutes, pp_goals, sh_goals, gw_goals, gt_goals, shots, shooting_pct, minutes_played, minutes_per_game, fo_won, fo_lost, fo_tied, fo_pct, pass_complete, pass_incomplete, pass_attempts, pass_pct, corner_won, corner_lost, corner_total, corner_pct, fights_won, fights_lost, fights_tied, fights_total, fights_pct, hits, hit_per_game, blocked_shots, blocked_shot_per_game, current_points_streak, longest_points_streak, penalty_minor, penalty_minor_coincidental, penalty_major, penalty_fighting_major, penalty_match, penalty_misconduct, penalty_game_misconduct, penalty_gross_misconduct) FROM 'postgres/seed/playerStats.tsv' WITH NULL ''

do $$
declare maxid int;
begin
    select max(id)+1 from drafts into maxid;
    execute 'alter SEQUENCE drafts_id_seq RESTART with '|| maxid;
end;

$$ language plpgsql

-- INSERT INTO champions (year_won, team_name, owner_name) VALUES (2019,'Staten Island Killer Bees','Jeff Kwok');

COMMIT;

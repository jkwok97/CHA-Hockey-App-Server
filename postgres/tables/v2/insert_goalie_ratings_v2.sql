\copy goalie_ratings_v2 (player_id, games_played, minutes_played, goals_against_avg, wins, loss, ties, en_goals, shutouts, goals_against, saves, shots_for, save_pct, goals, assists, points, penalty_minutes, skating, speed, passing, playing_year) FROM '/Users/jeffkwok/Desktop/CHA-Hockey-app-server/postgres/seed/v2/insert_goalie_ratings_v2.tsv'
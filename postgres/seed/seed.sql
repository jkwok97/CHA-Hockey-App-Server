BEGIN TRANSACTION;

-- \copy champions (year_won, team_name, owner_name) FROM 'postgres/seed/Champions.tsv' WITH NULL ''

-- do $$
-- declare maxid int;
-- begin
--     select max(id)+1 from champions into maxid;
--     execute 'alter SEQUENCE champions_id_seq RESTART with '|| maxid;
-- end;

-- $$ language plpgsql

-- \copy drafts (draft_year, round_num, number_num, team, player_name, player_pos) FROM 'postgres/seed/Drafts.tsv' WITH NULL ''

-- do $$
-- declare maxid int;
-- begin
--     select max(id)+1 from drafts into maxid;
--     execute 'alter SEQUENCE drafts_id_seq RESTART with '|| maxid;
-- end;

-- $$ language plpgsql

INSERT INTO champions (year_won, team_name, owner_name) VALUES (2019,'Staten Island Killer Bees','Jeff Kwok');

COMMIT;

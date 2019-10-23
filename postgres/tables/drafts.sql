DROP TABLE drafts;

CREATE TABLE drafts (
    id serial PRIMARY key,
    draft_year SMALLINT NOT null,
    round_num SMALLINT NOT null,
    number_num SMALLINT NOT null,
    team text NOT NULL, 
    player_name text NOT NULL,
    player_pos text NOT NULL
);

-- \copy drafts (draft_year, round_num, number_num, team, player_name, player_pos) FROM '/Users/jeffkwok/Desktop/CHA-Hockey-app-server/postgres/seed/Drafts.tsv' WITH NULL ''

-- do $$
-- declare maxid int;
-- begin
--     select max(id)+1 from drafts into maxid;
--     execute 'alter SEQUENCE drafts_id_seq RESTART with '|| maxid;
-- end;

-- $$ language plpgsql
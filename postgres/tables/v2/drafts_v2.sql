DROP TABLE drafts_v2;

CREATE TABLE drafts_v2 (
    id serial PRIMARY KEY,
    player_id SMALLINT NOT NULL,
    draft_year text NOT NULL,
    draft_round SMALLINT NOT NULL,
    draft_overall SMALLINT NOT NULL,
    team_id SMALLINT NOT NULL
);

\copy drafts_v2 (player_id, draft_year, draft_round, draft_overall, team_id) FROM '/Users/jeffkwok/Desktop/CHA-Hockey-app-server/postgres/seed/v2/drafts_v2.tsv' WITH NULL ''

do $$
declare maxid int;
begin
    select max(id)+1 from drafts_v2 into maxid;
    execute 'alter SEQUENCE drafts_v2_id_seq RESTART with '|| maxid;
end;

$$ language plpgsql;

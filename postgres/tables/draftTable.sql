DROP TABLE draft_table;

CREATE TABLE draft_table (
    id serial PRIMARY key,
    team_name text NOT null,
    round_one text NOT null,
    round_two text NOT null,
    round_three text NOT null,
    round_four text NOT null,
    round_five text NOT null
);

\copy draft_table (team_name, round_one, round_two, round_three, round_four, round_five) FROM '/Users/jeffkwok/Desktop/CHA-Hockey-app-server/postgres/seed/draftTable.tsv' WITH NULL ''

do $$
declare maxid int;
begin
    select max(id)+1 from drafts into maxid;
    execute 'alter SEQUENCE drafts_id_seq RESTART with '|| maxid;
end;

$$ language plpgsql;
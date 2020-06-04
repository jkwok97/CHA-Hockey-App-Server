DROP TABLE salaries_v2;

CREATE TABLE salaries_v2 (
    id serial PRIMARY KEY,
    player_id SMALLINT NOT NULL,
    season_2020 text,
    season_2021 text,
    season_2022 text,
    season_2023 text,
    season_2024 text,
    season_2025 text,
    season_2026 text,
    season_2027 text,
    season_2028 text,
    season_2029 text,
    season_2030 text,
    season_2031 text,
    season_2032 text,
    season_2033 text,
    season_2034 text,
    season_2035 text,
    season_2036 text,
    season_2037 text,
    season_2038 text,
    season_2039 text,
    season_2040 text
);

\copy salaries_v2 (player_id,season_2020,season_2021,season_2022, season_2023, season_2024, season_2025, season_2026, season_2027, season_2028, season_2029, season_2030, season_2031, season_2032,season_2033,season_2034,season_2035,season_2036,season_2037,season_2038,season_2039,season_2040) FROM '/Users/jeffkwok/Desktop/CHA-Hockey-app-server/postgres/seed/v2/salaries_v2.tsv' WITH NULL ''

do $$
declare maxid int;
begin
    select max(id)+1 from salaries_v2 into maxid;
    execute 'alter SEQUENCE salaries_v2_id_seq RESTART with '|| maxid;
end;

$$ language plpgsql;

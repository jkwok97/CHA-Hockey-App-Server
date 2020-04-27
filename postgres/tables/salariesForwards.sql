DROP TABLE forward_salaries;

CREATE TABLE forward_salaries (
    id serial PRIMARY KEY,
    player_id numeric,
    player_name text NOT NULL,
    2018_19 text,
    2019_20 text,
    2020_21 text,
    2021_22 text,
    2022_23 text,
    2023_24 text,
    2024_25 text,
    2025_26 text,
    2026_27 text,
    2027_28 text,
    2028_29 text,
    2029_30 text,
    2030_31 text,
    2031_32 text,
    2032_33 text,
    2033_34 text,
    2034_35 text,
    2035_36 text,
);

\copy forward_salaries (player_id, player_name, 2018_19, 2019_20, 2020_21, 2021_22, 2022_23, 2023_24, 2024_25, 2025_26, 2026_27, 2027_28, 2028_29, 2029_30, 2030_31, 2031_32, 2032_33, 2033_34, 2034_35, 2035_36) FROM '/Users/jeffkwok/Desktop/CHA-Hockey-app-server/postgres/seed/forwardsSalary.tsv' WITH NULL ''

do $$
declare maxid int;
begin
    select max(id)+1 from forward_salaries into maxid;
    execute 'alter SEQUENCE forward_salaries_id_seq RESTART with '|| maxid;
end;

$$ language plpgsql;
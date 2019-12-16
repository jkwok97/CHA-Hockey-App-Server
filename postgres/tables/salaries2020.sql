DROP TABLE defense_salaries;

CREATE TABLE defense_salaries (
    id serial PRIMARY KEY,
    player_name text NOT NULL,
    current_season_salary text NOT NULL,
    year_two text,
    year_three text,
    year_four text,
    year_five text
);

\copy defense_salaries (player_name, current_season_salary, year_two, year_three, year_four, year_five) FROM '/Users/jeffkwok/Desktop/CHA-Hockey-app-server/postgres/seed/defenceSalary.tsv' WITH NULL ''

do $$
declare maxid int;
begin
    select max(id)+1 from users into maxid;
    execute 'alter SEQUENCE users_id_seq RESTART with '|| maxid;
end;

$$ language plpgsql;

DROP TABLE forward_salaries;

CREATE TABLE forward_salaries (
    id serial PRIMARY KEY,
    player_name text NOT NULL,
    current_season_salary text NOT NULL,
    year_two text,
    year_three text,
    year_four text,
    year_five text
);

\copy forward_salaries (player_name, current_season_salary, year_two, year_three, year_four, year_five) FROM '/Users/jeffkwok/Desktop/CHA-Hockey-app-server/postgres/seed/forwardsSalary.tsv' WITH NULL ''

do $$
declare maxid int;
begin
    select max(id)+1 from users into maxid;
    execute 'alter SEQUENCE users_id_seq RESTART with '|| maxid;
end;

$$ language plpgsql;

DROP TABLE goalie_salaries;

CREATE TABLE goalie_salaries (
    id serial PRIMARY KEY,
    player_name text NOT NULL,
    current_season_salary text NOT NULL,
    year_two text,
    year_three text,
    year_four text,
    year_five text
);

\copy goalie_salaries (player_name, current_season_salary, year_two, year_three, year_four, year_five) FROM '/Users/jeffkwok/Desktop/CHA-Hockey-app-server/postgres/seed/goalieSalary.tsv' WITH NULL ''

do $$
declare maxid int;
begin
    select max(id)+1 from users into maxid;
    execute 'alter SEQUENCE users_id_seq RESTART with '|| maxid;
end;

$$ language plpgsql;



create table team (
    id uuid not null,
    acro VARCHAR(3) not null,
    name text not null,
    primary key (id)
);

create table round (
    house_id uuid not null references team(id),
    visitor_id uuid not null references team(id),
    house_goals INTEGER not null default 0,
    visitor_goals INTEGER not null default 0,
    season INTEGER not null,
    primary key (house_id, visitor_id, season)
);

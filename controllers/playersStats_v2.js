const getPlayersStats = (req, res, knex) => {
  knex
    .select(
      "a.id",
      "a.player_id",
      "a.team_name",
      "a.playing_year",
      "a.season_type",
      "a.player_status",
      "a.position",
      "b.firstname",
      "b.lastname"
    )
    .from("players_stats_v2 as a")
    .leftJoin("players_v2 as b", "b.id", "a.player_id")
    .where("a.playing_year", req.query.playing_year)
    .where("a.season_type", req.query.season_type)
    .then((data) => {
      if (data.length) {
        const result = {
          statusCode: 200,
          message: "Request Success",
          result: data,
        };
        res.json(result);
      } else {
        res.status(400).json("error getting player stats");
      }
    })
    .catch((err) => res.status(400).json("not found"));
};

const getPlayersBySeasonByType = (req, res, knex) => {
  knex
    .select(
      "a.*",
      "b.firstname",
      "b.lastname",
      "b.nhl_id",
      "b.isgoalie",
      "c.city",
      "c.nickname",
      "c.teamlogo"
    )
    .from("players_stats_v2 as a")
    .leftJoin("players_v2 as b", "b.id", "a.player_id")
    .leftJoin("teams_v2 as c", "c.shortname", "a.team_name")
    .where("a.playing_year", req.query.playing_year)
    .where("a.season_type", req.query.season_type)
    .where("a.games_played", ">", 0)
    .orderBy("a.points", "desc")
    .then((data) => {
      if (data.length) {
        const result = {
          statusCode: 200,
          message: "Request Success",
          result: data,
        };
        res.json(result);
      } else {
        res.status(400).json("error getting player stat");
      }
    })
    .catch((err) => res.status(400).json("not found"));
};

const getPlayersBySeasonByTypeByForwards = (req, res, knex) => {
  knex
    .select(
      "a.*",
      "b.firstname",
      "b.lastname",
      "b.nhl_id",
      "b.isgoalie",
      "c.city",
      "c.nickname",
      "c.teamlogo"
    )
    .from("players_stats_v2 as a")
    .leftJoin("players_v2 as b", "b.id", "a.player_id")
    .leftJoin("teams_v2 as c", "c.shortname", "a.team_name")
    .where("a.playing_year", req.query.playing_year)
    .where("a.season_type", req.query.season_type)
    .where("b.isforward", "true")
    .where("a.games_played", ">", 0)
    .orderBy("a.points", "desc")
    .then((data) => {
      if (data.length) {
        const result = {
          statusCode: 200,
          message: "Request Success",
          result: data,
        };
        res.json(result);
      } else {
        res.status(400).json("error getting player stat");
      }
    })
    .catch((err) => res.status(400).json("not found"));
};

const getPlayersBySeasonByTypeByDefense = (req, res, knex) => {
  knex
    .select(
      "a.*",
      "b.firstname",
      "b.lastname",
      "b.nhl_id",
      "b.isgoalie",
      "c.city",
      "c.nickname",
      "c.teamlogo"
    )
    .from("players_stats_v2 as a")
    .leftJoin("players_v2 as b", "b.id", "a.player_id")
    .leftJoin("teams_v2 as c", "c.shortname", "a.team_name")
    .where("a.playing_year", req.query.playing_year)
    .where("a.season_type", req.query.season_type)
    .where("a.games_played", ">", 0)
    .where("b.isdefense", "true")
    .orderBy("a.points", "desc")
    .then((data) => {
      if (data.length) {
        const result = {
          statusCode: 200,
          message: "Request Success",
          result: data,
        };
        res.json(result);
      } else {
        res.status(400).json("error getting player stat");
      }
    })
    .catch((err) => res.status(400).json("not found"));
};

const getPlayersStatsById = (req, res, knex) => {
  knex
    .select(
      "a.id",
      "a.player_id",
      "a.team_name",
      "a.playing_year",
      "a.season_type",
      "a.player_status",
      "a.position",
      "b.firstname",
      "b.lastname"
    )
    .from("players_stats_v2 as a")
    .leftJoin("players_v2 as b", "b.id", "a.player_id")
    .where("a.id", req.params.id)
    .then((data) => {
      if (data.length) {
        const result = {
          statusCode: 200,
          message: "Request Success",
          result: data[0],
        };
        res.json(result);
      } else {
        res.status(400).json("error getting player stat");
      }
    })
    .catch((err) => res.status(400).json("not found"));
};

const getPlayerStatsByPlayerId = (req, res, knex) => {
  knex
    .select(
      "a.*",
      "b.firstname",
      "b.lastname",
      "b.nhl_id",
      "c.city",
      "c.nickname",
      "c.teamlogo",
      "c.teamcolor",
      "c.teamtextcolor"
    )
    .from("players_stats_v2 as a")
    .leftJoin("players_v2 as b", "b.id", "a.player_id")
    .leftJoin("teams_v2 as c", "c.shortname", "a.team_name")
    .where("a.player_id", req.params.id)
    .orderBy("a.playing_year", "desc")
    .then((data) => {
      if (data.length) {
        const result = {
          statusCode: 200,
          message: "Request Success",
          result: data,
        };
        res.json(result);
      } else {
        res.status(400).json("error getting player stat");
      }
    })
    .catch((err) => res.status(400).json("not found"));
};

const getActivePlayersByTeam = (req, res, knex) => {
  knex
    .select(
      "a.id",
      "a.player_id",
      "a.team_name",
      "b.firstname",
      "b.lastname",
      "b.isactive",
      "b.isgoalie",
      "c.city",
      "c.nickname"
    )
    .from("players_stats_v2 as a")
    .leftJoin("players_v2 as b", "b.id", "a.player_id")
    .leftJoin("teams_v2 as c", "c.shortname", "a.team_name")
    .where("a.team_name", req.params.id)
    .where("a.playing_year", req.query.playing_year)
    .where("a.season_type", req.query.season_type)
    .where("b.isactive", req.query.isactive)
    .orderBy("b.lastname", "asc")
    .then((data) => {
      if (data.length) {
        const result = {
          statusCode: 200,
          message: "Request Success",
          result: data,
        };
        res.json(result);
      } else {
        res.status(400).json("error getting player stat");
      }
    })
    .catch((err) => res.status(400).json("not found"));
};

const getPlayersBySeasonByTypeByTeam = (req, res, knex) => {
  knex
    .select(
      "a.*",
      "b.firstname",
      "b.lastname",
      "b.isgoalie",
      "b.nhl_id",
      "c.city",
      "c.nickname",
      "c.teamlogo"
    )
    .from("players_stats_v2 as a")
    .leftJoin("players_v2 as b", "b.id", "a.player_id")
    .leftJoin("teams_v2 as c", "c.shortname", "a.team_name")
    .where("c.id", req.params.id)
    .where("a.playing_year", req.query.playing_year)
    .where("a.season_type", req.query.season_type)
    .orderBy("b.lastname", "asc")
    .then((data) => {
      if (data.length) {
        const result = {
          statusCode: 200,
          message: "Request Success",
          result: data,
        };
        res.json(result);
      } else {
        res.status(400).json("error getting player stat");
      }
    })
    .catch((err) => res.status(400).json("not found"));
};

const getPlayersByTypeByUser = (req, res, knex) => {
  knex
    .select(
      "a.*",
      "b.firstname",
      "b.lastname",
      "b.isgoalie",
      "c.city",
      "c.nickname",
      "c.teamlogo"
    )
    .from("players_stats_v2 as a")
    .leftJoin("players_v2 as b", "b.id", "a.player_id")
    .leftJoin("teams_v2 as c", "c.shortname", "a.team_name")
    .where("c.users_id", req.params.id)
    .where("a.season_type", req.query.season_type)
    .orderBy("a.points", "desc")
    .then((data) => {
      if (data.length) {
        const result = {
          statusCode: 200,
          message: "Request Success",
          result: data,
        };
        res.json(result);
      } else {
        res.status(400).json("error getting player stat");
      }
    })
    .catch((err) => res.status(400).json("not found"));
};

const getPlayersByShowByTypeByUser = (req, res, knex) => {
  knex
    .raw(
      `
        select
        b.firstname as firstname,
        b.lastname as lastname,
        b.isgoalie as isgoalie,
        a.player_id as player_id,
        a.season_type as season_type, 
        a.team_name as team_name,
        c.city as city, 
        c.nickname as nickname,
        c.teamlogo,
        sum(a.games_played) as games_played, 
        sum(a.goals) as goals, 
        sum(a.assists) as assists, 
        sum(a.points) as points, 
        sum(a.plus_minus) as plus_minus, 
        sum(a.penalty_minutes) as penalty_minutes, 
        sum(a.sh_goals) as sh_goals, 
        sum(a.pp_goals) as pp_goals, 
        sum(a.gw_goals) as gw_goals, 
        sum(a.gt_goals) as gt_goals, 
        sum(a.shots) as shots, 
        sum(a.minutes_played) as minutes_played, 
        sum(a.hits) as hits, 
        sum(a.blocked_shots) as blocked_shots
        from
        players_stats_v2 as a
        left join players_v2 as b
        on b.id = a.player_id
        left join teams_v2 as c
        on c.shortname = a.team_name
        where (a.player_id = b.id
        and
        a.season_type = '${req.query.season_type}'
        and
        c.users_id = '${req.params.id}')
        group by b.firstname, b.lastname, b.isgoalie, a.player_id, a.season_type, a.team_name, c.city, c.nickname, c.teamlogo
    ;`
    )
    .then((data) => {
      if (data.rows.length) {
        const result = {
          statusCode: 200,
          message: "Request Success",
          result: data.rows,
        };
        res.json(result);
      } else {
        res.status(400).json("error getting player stat");
      }
    })
    .catch((err) => res.status(400).json("not found"));
};

const getStatsbyType = (req, res, knex) => {
  knex
    .select(
      "a.*",
      "b.firstname",
      "b.lastname",
      "b.isgoalie",
      "c.city",
      "c.nickname",
      "c.teamlogo"
    )
    .from("players_stats_v2 as a")
    .leftJoin("players_v2 as b", "b.id", "a.player_id")
    .leftJoin("teams_v2 as c", "c.shortname", "a.team_name")
    .where("a.season_type", req.query.season_type)
    .where("points", ">", 0)
    .orderBy("a.points", "desc")
    .limit(1500)
    .then((data) => {
      if (data.length) {
        const result = {
          statusCode: 200,
          message: "Request Success",
          result: data,
        };
        res.json(result);
      } else {
        res.status(400).json("error getting player stat");
      }
    })
    .catch((err) => res.status(400).json("not found"));
};

const getStatsByTypeSummed = (req, res, knex) => {
  knex
    .raw(
      `
        select
        b.firstname as firstname,
        b.lastname as lastname,
        b.isgoalie as isgoalie,
        a.player_id as player_id,
        a.season_type as season_type, 
        sum(a.games_played) as games_played, 
        sum(a.goals) as goals, 
        sum(a.assists) as assists, 
        sum(a.points) as points, 
        sum(a.plus_minus) as plus_minus, 
        sum(a.penalty_minutes) as penalty_minutes, 
        sum(a.sh_goals) as sh_goals, 
        sum(a.pp_goals) as pp_goals, 
        sum(a.gw_goals) as gw_goals, 
        sum(a.gt_goals) as gt_goals, 
        sum(a.shots) as shots, 
        sum(a.minutes_played) as minutes_played, 
        sum(a.hits) as hits, 
        sum(a.blocked_shots) as blocked_shots
        from
        players_stats_v2 as a
        left join players_v2 as b
        on b.id = a.player_id
        where (a.player_id = b.id
        and
        a.points > '0'
        and
        a.season_type = '${req.query.season_type}')
        group by b.firstname, b.lastname, b.isgoalie, a.player_id, a.season_type
    ;`
    )
    .then((data) => {
      if (data.rows.length) {
        const result = {
          statusCode: 200,
          message: "Request Success",
          result: data.rows,
        };
        res.json(result);
      } else {
        res.status(400).json("error getting player stat");
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json("not found");
    });
};

const getForwardStatsbyType = (req, res, knex) => {
  knex
    .select(
      "a.*",
      "b.firstname",
      "b.lastname",
      "b.isgoalie",
      "c.city",
      "c.nickname",
      "c.teamlogo"
    )
    .from("players_stats_v2 as a")
    .leftJoin("players_v2 as b", "b.id", "a.player_id")
    .leftJoin("teams_v2 as c", "c.shortname", "a.team_name")
    .where("a.season_type", req.query.season_type)
    .where("b.isforward", "true")
    .where("points", ">", 0)
    .orderBy("a.points", "desc")
    .limit(1500)
    .then((data) => {
      if (data.length) {
        const result = {
          statusCode: 200,
          message: "Request Success",
          result: data,
        };
        res.json(result);
      } else {
        res.status(400).json("error getting player stat");
      }
    })
    .catch((err) => res.status(400).json("not found"));
};

const getForwardStatsByTypeSummed = (req, res, knex) => {
  knex
    .raw(
      `
        select
        b.firstname as firstname,
        b.lastname as lastname,
        b.isgoalie as isgoalie,
        a.player_id as player_id,
        a.season_type as season_type, 
        sum(a.games_played) as games_played, 
        sum(a.goals) as goals, 
        sum(a.assists) as assists, 
        sum(a.points) as points, 
        sum(a.plus_minus) as plus_minus, 
        sum(a.penalty_minutes) as penalty_minutes, 
        sum(a.sh_goals) as sh_goals, 
        sum(a.pp_goals) as pp_goals, 
        sum(a.gw_goals) as gw_goals, 
        sum(a.gt_goals) as gt_goals, 
        sum(a.shots) as shots, 
        sum(a.minutes_played) as minutes_played, 
        sum(a.hits) as hits, 
        sum(a.blocked_shots) as blocked_shots
        from
        players_stats_v2 as a
        left join players_v2 as b
        on b.id = a.player_id
        where (a.player_id = b.id
        and
        b.isforward = 'true'
        and
        a.points > '0'
        and
        a.season_type = '${req.query.season_type}')
        group by b.firstname, b.lastname, b.isgoalie, a.player_id, a.season_type
    ;`
    )
    .then((data) => {
      if (data.rows.length) {
        const result = {
          statusCode: 200,
          message: "Request Success",
          result: data.rows,
        };
        res.json(result);
      } else {
        res.status(400).json("error getting player stat");
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json("not found");
    });
};

const getDefenseStatsbyType = (req, res, knex) => {
  knex
    .select(
      "a.*",
      "b.firstname",
      "b.lastname",
      "b.isgoalie",
      "c.city",
      "c.nickname",
      "c.teamlogo"
    )
    .from("players_stats_v2 as a")
    .leftJoin("players_v2 as b", "b.id", "a.player_id")
    .leftJoin("teams_v2 as c", "c.shortname", "a.team_name")
    .where("a.season_type", req.query.season_type)
    .where("b.isdefense", "true")
    .where("points", ">", 0)
    .orderBy("a.points", "desc")
    .limit(1500)
    .then((data) => {
      if (data.length) {
        const result = {
          statusCode: 200,
          message: "Request Success",
          result: data,
        };
        res.json(result);
      } else {
        res.status(400).json("error getting player stat");
      }
    })
    .catch((err) => res.status(400).json("not found"));
};

const getDefenseStatsByTypeSummed = (req, res, knex) => {
  knex
    .raw(
      `
        select
        b.firstname as firstname,
        b.lastname as lastname,
        b.isgoalie as isgoalie,
        a.player_id as player_id,
        a.season_type as season_type, 
        sum(a.games_played) as games_played, 
        sum(a.goals) as goals, 
        sum(a.assists) as assists, 
        sum(a.points) as points, 
        sum(a.plus_minus) as plus_minus, 
        sum(a.penalty_minutes) as penalty_minutes, 
        sum(a.sh_goals) as sh_goals, 
        sum(a.pp_goals) as pp_goals, 
        sum(a.gw_goals) as gw_goals, 
        sum(a.gt_goals) as gt_goals, 
        sum(a.shots) as shots, 
        sum(a.minutes_played) as minutes_played, 
        sum(a.hits) as hits, 
        sum(a.blocked_shots) as blocked_shots
        from
        players_stats_v2 as a
        left join players_v2 as b
        on b.id = a.player_id
        where (a.player_id = b.id
        and
        b.isdefense = 'true'
        and
        a.points > '0'
        and
        a.season_type = '${req.query.season_type}')
        group by b.firstname, b.lastname, b.isgoalie, a.player_id, a.season_type
    ;`
    )
    .then((data) => {
      if (data.rows.length) {
        const result = {
          statusCode: 200,
          message: "Request Success",
          result: data.rows,
        };
        res.json(result);
      } else {
        res.status(400).json("error getting player stat");
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json("not found");
    });
};

const updatePlayersStatsById = (req, res, knex) => {
  const playerStatData = req.body;

  knex("players_stats_v2")
    .where({ id: req.params.id })
    .update(playerStatData)
    .then((resp) => {
      if (resp) {
        const result = {
          statusCode: 200,
          message: "Update Player Stat Success",
          result: resp,
        };
        res.json(result);
      } else {
        res.status(400).json("Error!");
      }
    })
    .catch((err) => res.status(400).json("Updating Player Stat Error"));
};

// ================================= LEADERS ===========================================

const getPointLeaders = (req, res, knex) => {
  knex
    .select(
      "a.player_id",
      "a.games_played",
      "a.goals",
      "a.assists",
      "a.points",
      "b.firstname",
      "b.lastname",
      "b.isgoalie",
      "b.nhl_id",
      "c.city",
      "c.nickname",
      "c.teamlogo"
    )
    .from("players_stats_v2 as a")
    .leftJoin("players_v2 as b", "b.id", "a.player_id")
    .leftJoin("teams_v2 as c", "c.shortname", "a.team_name")
    .where("a.playing_year", req.query.playing_year)
    .where("a.season_type", req.query.season_type)
    .orderBy("a.points", "desc")
    .limit(10)
    .then((data) => {
      if (data.length) {
        const result = {
          statusCode: 200,
          message: "Request Success",
          result: data,
        };
        res.json(result);
      } else {
        res.status(400).json("error getting player stat");
      }
    })
    .catch((err) => res.status(400).json("not found"));
};

const getDefenseLeaders = (req, res, knex) => {
  knex
    .select(
      "a.player_id",
      "a.games_played",
      "a.goals",
      "a.assists",
      "a.points",
      "b.firstname",
      "b.lastname",
      "b.isgoalie",
      "b.nhl_id",
      "c.city",
      "c.nickname",
      "c.teamlogo"
    )
    .from("players_stats_v2 as a")
    .leftJoin("players_v2 as b", "b.id", "a.player_id")
    .leftJoin("teams_v2 as c", "c.shortname", "a.team_name")
    .where("a.playing_year", req.query.playing_year)
    .where("a.season_type", req.query.season_type)
    .where("b.isdefense", "true")
    .orderBy("a.points", "desc")
    .limit(10)
    .then((data) => {
      if (data.length) {
        const result = {
          statusCode: 200,
          message: "Request Success",
          result: data,
        };
        res.json(result);
      } else {
        res.status(400).json("error getting player stat");
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json("not found");
    });
};

const getRookieLeaders = (req, res, knex) => {
  knex
    .select(
      "a.player_id",
      "a.games_played",
      "a.goals",
      "a.assists",
      "a.points",
      "b.firstname",
      "b.lastname",
      "b.isgoalie",
      "b.nhl_id",
      "c.city",
      "c.nickname",
      "c.teamlogo"
    )
    .from("players_stats_v2 as a")
    .leftJoin("players_v2 as b", "b.id", "a.player_id")
    .leftJoin("teams_v2 as c", "c.shortname", "a.team_name")
    .where("a.playing_year", req.query.playing_year)
    .where("a.season_type", req.query.season_type)
    .where("a.player_status", "Rookie")
    .orderBy("a.points", "desc")
    .limit(10)
    .then((data) => {
      if (data.length) {
        const result = {
          statusCode: 200,
          message: "Request Success",
          result: data,
        };
        res.json(result);
      } else {
        res.status(400).json("error getting player stat");
      }
    })
    .catch((err) => res.status(400).json("not found"));
};

const getAssistsLeaders = (req, res, knex) => {
  knex
    .select(
      "a.player_id",
      "a.assists",
      "b.firstname",
      "b.lastname",
      "b.isgoalie",
      "b.nhl_id",
      "c.city",
      "c.nickname",
      "c.teamlogo"
    )
    .from("players_stats_v2 as a")
    .leftJoin("players_v2 as b", "b.id", "a.player_id")
    .leftJoin("teams_v2 as c", "c.shortname", "a.team_name")
    .where("a.playing_year", req.query.playing_year)
    .where("a.season_type", req.query.season_type)
    .orderBy("a.assists", "desc")
    .limit(10)
    .then((data) => {
      if (data.length) {
        const result = {
          statusCode: 200,
          message: "Request Success",
          result: data,
        };
        res.json(result);
      } else {
        res.status(400).json("error getting player stat");
      }
    })
    .catch((err) => res.status(400).json("not found"));
};

const getGoalsLeaders = (req, res, knex) => {
  knex
    .select(
      "a.player_id",
      "a.goals",
      "b.firstname",
      "b.lastname",
      "b.isgoalie",
      "b.nhl_id",
      "c.city",
      "c.nickname",
      "c.teamlogo"
    )
    .from("players_stats_v2 as a")
    .leftJoin("players_v2 as b", "b.id", "a.player_id")
    .leftJoin("teams_v2 as c", "c.shortname", "a.team_name")
    .where("a.playing_year", req.query.playing_year)
    .where("a.season_type", req.query.season_type)
    .orderBy("a.goals", "desc")
    .limit(10)
    .then((data) => {
      if (data.length) {
        const result = {
          statusCode: 200,
          message: "Request Success",
          result: data,
        };
        res.json(result);
      } else {
        res.status(400).json("error getting player stat");
      }
    })
    .catch((err) => res.status(400).json("not found"));
};

const getPpGoalsLeaders = (req, res, knex) => {
  knex
    .select(
      "a.player_id",
      "a.pp_goals",
      "b.firstname",
      "b.lastname",
      "b.isgoalie",
      "b.nhl_id",
      "c.city",
      "c.nickname",
      "c.teamlogo"
    )
    .from("players_stats_v2 as a")
    .leftJoin("players_v2 as b", "b.id", "a.player_id")
    .leftJoin("teams_v2 as c", "c.shortname", "a.team_name")
    .where("a.playing_year", req.query.playing_year)
    .where("a.season_type", req.query.season_type)
    .orderBy("a.pp_goals", "desc")
    .limit(10)
    .then((data) => {
      if (data.length) {
        const result = {
          statusCode: 200,
          message: "Request Success",
          result: data,
        };
        res.json(result);
      } else {
        res.status(400).json("error getting player stat");
      }
    })
    .catch((err) => res.status(400).json("not found"));
};

const getShGoalsLeaders = (req, res, knex) => {
  knex
    .select(
      "a.player_id",
      "a.sh_goals",
      "b.firstname",
      "b.lastname",
      "b.isgoalie",
      "b.nhl_id",
      "c.city",
      "c.nickname",
      "c.teamlogo"
    )
    .from("players_stats_v2 as a")
    .leftJoin("players_v2 as b", "b.id", "a.player_id")
    .leftJoin("teams_v2 as c", "c.shortname", "a.team_name")
    .where("a.playing_year", req.query.playing_year)
    .where("a.season_type", req.query.season_type)
    .orderBy("a.sh_goals", "desc")
    .limit(10)
    .then((data) => {
      if (data.length) {
        const result = {
          statusCode: 200,
          message: "Request Success",
          result: data,
        };
        res.json(result);
      } else {
        res.status(400).json("error getting player stat");
      }
    })
    .catch((err) => res.status(400).json("not found"));
};

const getBlockedShotsLeaders = (req, res, knex) => {
  knex
    .select(
      "a.player_id",
      "a.blocked_shots",
      "b.firstname",
      "b.lastname",
      "b.isgoalie",
      "b.nhl_id",
      "c.city",
      "c.nickname",
      "c.teamlogo"
    )
    .from("players_stats_v2 as a")
    .leftJoin("players_v2 as b", "b.id", "a.player_id")
    .leftJoin("teams_v2 as c", "c.shortname", "a.team_name")
    .where("a.playing_year", req.query.playing_year)
    .where("a.season_type", req.query.season_type)
    .orderBy("a.blocked_shots", "desc")
    .limit(10)
    .then((data) => {
      if (data.length) {
        const result = {
          statusCode: 200,
          message: "Request Success",
          result: data,
        };
        res.json(result);
      } else {
        res.status(400).json("error getting player stat");
      }
    })
    .catch((err) => res.status(400).json("not found"));
};

const getShotsLeaders = (req, res, knex) => {
  knex
    .select(
      "a.player_id",
      "a.shots",
      "b.firstname",
      "b.lastname",
      "b.isgoalie",
      "b.nhl_id",
      "c.city",
      "c.nickname",
      "c.teamlogo"
    )
    .from("players_stats_v2 as a")
    .leftJoin("players_v2 as b", "b.id", "a.player_id")
    .leftJoin("teams_v2 as c", "c.shortname", "a.team_name")
    .where("a.playing_year", req.query.playing_year)
    .where("a.season_type", req.query.season_type)
    .orderBy("a.shots", "desc")
    .limit(10)
    .then((data) => {
      if (data.length) {
        const result = {
          statusCode: 200,
          message: "Request Success",
          result: data,
        };
        res.json(result);
      } else {
        res.status(400).json("error getting player stat");
      }
    })
    .catch((err) => res.status(400).json("not found"));
};

const getPenaltyLeaders = (req, res, knex) => {
  knex
    .select(
      "a.player_id",
      "a.penalty_minutes",
      "b.firstname",
      "b.lastname",
      "b.isgoalie",
      "b.nhl_id",
      "c.city",
      "c.nickname",
      "c.teamlogo"
    )
    .from("players_stats_v2 as a")
    .leftJoin("players_v2 as b", "b.id", "a.player_id")
    .leftJoin("teams_v2 as c", "c.shortname", "a.team_name")
    .where("a.playing_year", req.query.playing_year)
    .where("a.season_type", req.query.season_type)
    .orderBy("a.penalty_minutes", "desc")
    .limit(10)
    .then((data) => {
      if (data.length) {
        const result = {
          statusCode: 200,
          message: "Request Success",
          result: data,
        };
        res.json(result);
      } else {
        res.status(400).json("error getting player stat");
      }
    })
    .catch((err) => res.status(400).json("not found"));
};

const getMinutesLeaders = (req, res, knex) => {
  knex
    .select(
      "a.player_id",
      "a.minutes_played",
      "b.firstname",
      "b.lastname",
      "b.isgoalie",
      "b.nhl_id",
      "c.city",
      "c.nickname",
      "c.teamlogo"
    )
    .from("players_stats_v2 as a")
    .leftJoin("players_v2 as b", "b.id", "a.player_id")
    .leftJoin("teams_v2 as c", "c.shortname", "a.team_name")
    .where("a.playing_year", req.query.playing_year)
    .where("a.season_type", req.query.season_type)
    .orderBy("a.minutes_played", "desc")
    .limit(10)
    .then((data) => {
      if (data.length) {
        const result = {
          statusCode: 200,
          message: "Request Success",
          result: data,
        };
        res.json(result);
      } else {
        res.status(400).json("error getting player stat");
      }
    })
    .catch((err) => res.status(400).json("not found"));
};

const getPlusMinusLeaders = (req, res, knex) => {
  knex
    .select(
      "a.player_id",
      "a.plus_minus",
      "b.firstname",
      "b.lastname",
      "b.isgoalie",
      "b.nhl_id",
      "c.city",
      "c.nickname",
      "c.teamlogo"
    )
    .from("players_stats_v2 as a")
    .leftJoin("players_v2 as b", "b.id", "a.player_id")
    .leftJoin("teams_v2 as c", "c.shortname", "a.team_name")
    .where("a.playing_year", req.query.playing_year)
    .where("a.season_type", req.query.season_type)
    .orderBy("a.plus_minus", "desc")
    .limit(10)
    .then((data) => {
      if (data.length) {
        const result = {
          statusCode: 200,
          message: "Request Success",
          result: data,
        };
        res.json(result);
      } else {
        res.status(400).json("error getting player stat");
      }
    })
    .catch((err) => res.status(400).json("not found"));
};

const getWorstPlusMinusLeaders = (req, res, knex) => {
  knex
    .select(
      "a.player_id",
      "a.plus_minus",
      "b.firstname",
      "b.lastname",
      "b.isgoalie",
      "b.nhl_id",
      "c.city",
      "c.nickname",
      "c.teamlogo"
    )
    .from("players_stats_v2 as a")
    .leftJoin("players_v2 as b", "b.id", "a.player_id")
    .leftJoin("teams_v2 as c", "c.shortname", "a.team_name")
    .where("a.playing_year", req.query.playing_year)
    .where("a.season_type", req.query.season_type)
    .orderBy("a.plus_minus", "asc")
    .limit(10)
    .then((data) => {
      if (data.length) {
        const result = {
          statusCode: 200,
          message: "Request Success",
          result: data,
        };
        res.json(result);
      } else {
        res.status(400).json("error getting player stat");
      }
    })
    .catch((err) => res.status(400).json("not found"));
};

const getLongStreakLeaders = (req, res, knex) => {
  knex
    .select(
      "a.player_id",
      "a.longest_points_streak",
      "b.firstname",
      "b.lastname",
      "b.isgoalie",
      "b.nhl_id",
      "c.city",
      "c.nickname",
      "c.teamlogo"
    )
    .from("players_stats_v2 as a")
    .leftJoin("players_v2 as b", "b.id", "a.player_id")
    .leftJoin("teams_v2 as c", "c.shortname", "a.team_name")
    .where("a.playing_year", req.query.playing_year)
    .where("a.season_type", req.query.season_type)
    .orderBy("a.longest_points_streak", "desc")
    .limit(10)
    .then((data) => {
      if (data.length) {
        const result = {
          statusCode: 200,
          message: "Request Success",
          result: data,
        };
        res.json(result);
      } else {
        res.status(400).json("error getting player stat");
      }
    })
    .catch((err) => res.status(400).json("not found"));
};

const getStreakLeaders = (req, res, knex) => {
  knex
    .select(
      "a.player_id",
      "a.current_points_streak",
      "b.firstname",
      "b.lastname",
      "b.isgoalie",
      "b.nhl_id",
      "c.city",
      "c.nickname",
      "c.teamlogo"
    )
    .from("players_stats_v2 as a")
    .leftJoin("players_v2 as b", "b.id", "a.player_id")
    .leftJoin("teams_v2 as c", "c.shortname", "a.team_name")
    .where("a.playing_year", req.query.playing_year)
    .where("a.season_type", req.query.season_type)
    .orderBy("a.current_points_streak", "desc")
    .limit(10)
    .then((data) => {
      if (data.length) {
        const result = {
          statusCode: 200,
          message: "Request Success",
          result: data,
        };
        res.json(result);
      } else {
        res.status(400).json("error getting player stat");
      }
    })
    .catch((err) => res.status(400).json("not found"));
};

const getHitsLeaders = (req, res, knex) => {
  knex
    .select(
      "a.player_id",
      "a.hits",
      "b.firstname",
      "b.lastname",
      "b.isgoalie",
      "b.nhl_id",
      "c.city",
      "c.nickname",
      "c.teamlogo"
    )
    .from("players_stats_v2 as a")
    .leftJoin("players_v2 as b", "b.id", "a.player_id")
    .leftJoin("teams_v2 as c", "c.shortname", "a.team_name")
    .where("a.playing_year", req.query.playing_year)
    .where("a.season_type", req.query.season_type)
    .orderBy("a.hits", "desc")
    .limit(10)
    .then((data) => {
      if (data.length) {
        const result = {
          statusCode: 200,
          message: "Request Success",
          result: data,
        };
        res.json(result);
      } else {
        res.status(400).json("error getting player stat");
      }
    })
    .catch((err) => res.status(400).json("not found"));
};

const getAllLeaders = (req, res, knex) => {
  console.log("called");
  const pointsLeaders = getPointLeaders(req, res, knex);
  console.log(pointsLeaders);
};

module.exports = {
  getPlayersStats,
  getPlayersStatsById,
  getPlayerStatsByPlayerId,
  getActivePlayersByTeam,
  getPlayersBySeasonByType,
  getPlayersBySeasonByTypeByForwards,
  getPlayersBySeasonByTypeByDefense,
  getPlayersBySeasonByTypeByTeam,
  getPlayersByTypeByUser,
  getPlayersByShowByTypeByUser,
  getStatsByTypeSummed,
  getStatsbyType,
  getForwardStatsbyType,
  getForwardStatsByTypeSummed,
  getDefenseStatsByTypeSummed,
  getDefenseStatsbyType,
  getPointLeaders,
  getDefenseLeaders,
  getRookieLeaders,
  getAssistsLeaders,
  getGoalsLeaders,
  getPpGoalsLeaders,
  getShGoalsLeaders,
  getBlockedShotsLeaders,
  getShotsLeaders,
  getPenaltyLeaders,
  getMinutesLeaders,
  getPlusMinusLeaders,
  getWorstPlusMinusLeaders,
  getLongStreakLeaders,
  getStreakLeaders,
  getHitsLeaders,
  updatePlayersStatsById,
  getAllLeaders,
};

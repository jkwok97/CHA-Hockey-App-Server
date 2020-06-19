const getGoaliesStats = (req, res, knex) => {

    knex.select(
        'a.id',
        'a.player_id',
        'a.team_name',
        'a.playing_year',
        'a.season_type',
        'a.player_status',
        'b.firstname',
        'b.lastname',
        )
        .from('goalies_stats_v2 as a')
        .leftJoin('players_v2 as b', 'b.id', 'a.player_id')
        .where('a.playing_year', req.query.playing_year)
        .where('a.season_type', req.query.season_type)
        .then(data => {
            if (data.length) {
                const result = {
                    statusCode: 200,
                    message: 'Request Success',
                    result: data
                }
                res.json(result);
            } else {
                res.status(400).json('error getting goalie stat')
            }
        }).catch(err => res.status(400).json('not found'))

}

const getGoaliesStatsById = (req, res, knex) => {

    knex.select(
        'a.id',
        'a.player_id',
        'a.team_name',
        'a.playing_year',
        'a.season_type',
        'a.player_status',
        'b.firstname',
        'b.lastname',
        )
        .from('goalies_stats_v2 as a')
        .leftJoin('players_v2 as b', 'b.id', 'a.player_id')
        .where('a.id', req.params.id)
        .then(data => {
            if (data.length) {
                const result = {
                    statusCode: 200,
                    message: 'Request Success',
                    result: data[0]
                }
                res.json(result);
            } else {
                res.status(400).json('error getting goalie stat')
            }
        }).catch(err => res.status(400).json('not found'))
}

const getActiveGoaliesByTeam = (req, res, knex) => {

    knex.select(
        'a.id',
        'a.player_id',
        'a.team_name',
        'b.firstname',
        'b.lastname',
        'b.isactive',
        'b.isgoalie',
        'c.city',
        'c.nickname'
        )
        .from('goalies_stats_v2 as a')
        .leftJoin('players_v2 as b', 'b.id', 'a.player_id')
        .leftJoin('teams_v2 as c', 'c.shortname', 'a.team_name')
        .where('a.team_name', req.params.id)
        .where('a.playing_year', req.query.playing_year)
        .where('a.season_type', req.query.season_type)
        .where('b.isactive', req.query.isactive)
        .orderBy('b.lastname', 'asc')
        .then(data => {
            if (data.length) {
                const result = {
                    statusCode: 200,
                    message: 'Request Success',
                    result: data
                }
                res.json(result);
            } else {
                res.status(400).json('error getting player stat')
            }
        }).catch(err => res.status(400).json('not found'))
}

const getGoaliesBySeasonByType = (req, res, knex) => {
    console.log("hello from function");
    knex.select(
        'a.*',
        'b.firstname',
        'b.lastname',
        'b.nhl_id',
        'b.isgoalie',
        'c.city',
        'c.nickname',
        'c.teamlogo'
        )
        .from('goalies_stats_v2 as a')
        .leftJoin('players_v2 as b', 'b.id', 'a.player_id')
        .leftJoin('teams_v2 as c', 'c.shortname', 'a.team_name')
        .where('a.playing_year', req.query.playing_year)
        .where('a.season_type', req.query.season_type)
        .orderBy('b.lastname', 'asc')
        .then(data => {
            console.log(data);
            if (data.length) {
                const result = {
                    statusCode: 200,
                    message: 'Request Success',
                    result: data
                }
                res.json(result);
            } else {
                res.status(400).json('error getting player stat')
            }
        }).catch(err => {
            console.log(err);
            res.status(400).json('not found')})
}

const getGoaliesBySeasonByTypeByTeam = (req, res, knex) => {
    knex.select(
        'a.*',
        'b.firstname',
        'b.lastname',
        'b.isgoalie',
        'c.city',
        'c.nickname',
        'c.teamlogo'
        )
        .from('goalies_stats_v2 as a')
        .leftJoin('players_v2 as b', 'b.id', 'a.player_id')
        .leftJoin('teams_v2 as c', 'c.shortname', 'a.team_name')
        .where('c.id', req.params.id)
        .where('a.playing_year', req.query.playing_year)
        .where('a.season_type', req.query.season_type)
        .orderBy('b.lastname', 'asc')
        .then(data => {
            if (data.length) {
                const result = {
                    statusCode: 200,
                    message: 'Request Success',
                    result: data
                }
                res.json(result);
            } else {
                res.status(400).json('error getting player stat')
            }
        }).catch(err => res.status(400).json('not found'))
}

const getGoaliesByTypeByUser = (req, res, knex) => {
    knex.select(
        'a.*',
        'b.firstname',
        'b.lastname',
        'b.isgoalie',
        'c.city',
        'c.nickname',
        'c.teamlogo'
        )
        .from('goalies_stats_v2 as a')
        .leftJoin('players_v2 as b', 'b.id', 'a.player_id')
        .leftJoin('teams_v2 as c', 'c.shortname', 'a.team_name')
        .where('c.users_id', req.params.id)
        .where('a.season_type', req.query.season_type)
        .orderBy('a.points', 'desc')
        .then(data => {
            if (data.length) {
                const result = {
                    statusCode: 200,
                    message: 'Request Success',
                    result: data
                }
                res.json(result);
            } else {
                res.status(400).json('error getting player stat')
            }
        }).catch(err => res.status(400).json('not found'))
}

const getGoaliesByShowByTypeByUser = (req, res, knex) => {

    knex.raw(`
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
        sum(games_played) as games_played, 
        sum(wins) as wins, 
        sum(loss) as loss, 
        sum(ties) as ties, 
        sum(minutes_played) as minutes_played, 
        sum(en_goals) as en_goals, 
        sum(shutouts) as shutouts, 
        sum(goals_against) as goals_against, 
        sum(saves) as saves, 
        sum(shots_for) as shots_for, 
        sum(goals) as goals, 
        sum(assists) as assists, 
        sum(points) as points, 
        sum(penalty_minutes) as penalty_minutes
        from
        goalies_stats_v2 as a
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
    ;`)
    .then(data => {
        if (data.rows.length) {
            const result = {
                statusCode: 200,
                message: 'Request Success',
                result: data.rows
            }
            res.json(result);
        } else {
            res.status(400).json('error getting player stat')
        }
    }).catch(err => {
        console.log(err)
        res.status(400).json('not found')
    })
}

const updateGoaliesStatsById = (req, res, knex) => {

    const playerStatData = req.body;

    knex('goalies_stats_v2').where({id: req.params.id})
        .update(playerStatData)
        .then(resp => {
            if (resp) {
                const result = {
                    statusCode: 200,
                    message: 'Update Goalie Stat Success',
                    result: resp
                }
                res.json(result);
            } else {
                res.status(400).json('Error!'); 
            }
        }).catch(err => res.status(400).json('Updating Goalie Stat Error'))

}

const getWinsLeaders = (req, res, knex) => {
    knex.select(
        'a.wins',
        'a.games_played',
        'b.firstname',
        'b.lastname',
        'b.isgoalie',
        'b.nhl_id',
        'c.city',
        'c.nickname',
        'c.teamlogo'
        )
        .from('goalies_stats_v2 as a')
        .leftJoin('players_v2 as b', 'b.id', 'a.player_id')
        .leftJoin('teams_v2 as c', 'c.shortname', 'a.team_name')
        .where('a.playing_year', req.query.playing_year)
        .where('a.season_type', req.query.season_type)
        .orderBy('a.wins', 'desc')
        .limit(10)
        .then(data => {
            if (data.length) {
                const result = {
                    statusCode: 200,
                    message: 'Request Success',
                    result: data
                }
                res.json(result);
            } else {
                res.status(400).json('error getting player stat')
            }
        }).catch(err => res.status(400).json('not found'))
}

const getShutoutLeaders = (req, res, knex) => {
    knex.select(
        'a.shutouts',
        'a.games_played',
        'b.firstname',
        'b.lastname',
        'b.isgoalie',
        'b.nhl_id',
        'c.city',
        'c.nickname',
        'c.teamlogo'
        )
        .from('goalies_stats_v2 as a')
        .leftJoin('players_v2 as b', 'b.id', 'a.player_id')
        .leftJoin('teams_v2 as c', 'c.shortname', 'a.team_name')
        .where('a.playing_year', req.query.playing_year)
        .where('a.season_type', req.query.season_type)
        .orderBy('a.shutouts', 'desc')
        .limit(10)
        .then(data => {
            if (data.length) {
                const result = {
                    statusCode: 200,
                    message: 'Request Success',
                    result: data
                }
                res.json(result);
            } else {
                res.status(400).json('error getting player stat')
            }
        }).catch(err => res.status(400).json('not found'))
}

const getSavePctLeaders = (req, res, knex) => {

    knex.select(
        'a.save_pct',
        'a.games_played',
        'b.firstname',
        'b.lastname',
        'b.isgoalie',
        'b.nhl_id',
        'c.city',
        'c.nickname',
        'c.teamlogo'
        )
        .from('goalies_stats_v2 as a')
        .leftJoin('players_v2 as b', 'b.id', 'a.player_id')
        .leftJoin('teams_v2 as c', 'c.shortname', 'a.team_name')
        .where('a.playing_year', req.query.playing_year)
        .where('a.season_type', req.query.season_type)
        .where('a.games_played', '>', req.query.min_games)
        .orderBy('a.save_pct', 'desc')
        .limit(10)
        .then(data => {
            if (data.length) {
                const result = {
                    statusCode: 200,
                    message: 'Request Success',
                    result: data
                }
                res.json(result);
            } else {
                res.status(400).json('error getting player stat')
            }
        }).catch(err => res.status(400).json('not found'))
}

const getGaaLeaders = (req, res, knex) => {
    knex.select(
        'a.goals_against_avg',
        'a.games_played',
        'b.firstname',
        'b.lastname',
        'b.isgoalie',
        'b.nhl_id',
        'c.city',
        'c.nickname',
        'c.teamlogo'
        )
        .from('goalies_stats_v2 as a')
        .leftJoin('players_v2 as b', 'b.id', 'a.player_id')
        .leftJoin('teams_v2 as c', 'c.shortname', 'a.team_name')
        .where('a.playing_year', req.query.playing_year)
        .where('a.season_type', req.query.season_type)
        .where('a.games_played', '>', req.query.min_games)
        .orderBy('a.goals_against_avg', 'asc')
        .limit(10)
        .then(data => {
            if (data.length) {
                const result = {
                    statusCode: 200,
                    message: 'Request Success',
                    result: data
                }
                res.json(result);
            } else {
                res.status(400).json('error getting player stat')
            }
        }).catch(err => res.status(400).json('not found'))
}

const getShotsFacedLeaders = (req, res, knex) => {
    knex.select(
        'a.shots_for',
        'a.games_played',
        'b.firstname',
        'b.lastname',
        'b.isgoalie',
        'b.nhl_id',
        'c.city',
        'c.nickname',
        'c.teamlogo'
        )
        .from('goalies_stats_v2 as a')
        .leftJoin('players_v2 as b', 'b.id', 'a.player_id')
        .leftJoin('teams_v2 as c', 'c.shortname', 'a.team_name')
        .where('a.playing_year', req.query.playing_year)
        .where('a.season_type', req.query.season_type)
        .orderBy('a.shots_for', 'desc')
        .limit(10)
        .then(data => {
            if (data.length) {
                const result = {
                    statusCode: 200,
                    message: 'Request Success',
                    result: data
                }
                res.json(result);
            } else {
                res.status(400).json('error getting player stat')
            }
        }).catch(err => res.status(400).json('not found'))
}

module.exports = {
    getGoaliesStats, getGoaliesStatsById, getActiveGoaliesByTeam, 
    getGoaliesBySeasonByType,
    getGoaliesBySeasonByTypeByTeam, getGoaliesByTypeByUser, getGoaliesByShowByTypeByUser, 
    getWinsLeaders, getShutoutLeaders, getSavePctLeaders, getGaaLeaders, getShotsFacedLeaders,
    updateGoaliesStatsById
};
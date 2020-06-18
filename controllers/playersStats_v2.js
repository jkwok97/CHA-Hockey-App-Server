const getPlayersStats = (req, res, knex) => {
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
        .from('players_stats_v2 as a')
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
                res.status(400).json('error getting player stats')
            }
        }).catch(err => res.status(400).json('not found'))
}

const getPlayersStatsById = (req, res, knex) => {

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
        .from('players_stats_v2 as a')
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
                res.status(400).json('error getting player stat')
            }
        }).catch(err => res.status(400).json('not found'))
}

const getActivePlayersByTeam = (req, res, knex) => {

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
        .from('players_stats_v2 as a')
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

const getPlayersBySeasonByTypeByTeam = (req, res, knex) => {
    knex.select(
        'a.*',
        'b.firstname',
        'b.lastname',
        'b.isgoalie',
        'b.nhl_id',
        'c.city',
        'c.nickname',
        'c.teamlogo'
        )
        .from('players_stats_v2 as a')
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

const getPlayersByTypeByUser = (req, res, knex) => {
    knex.select(
        'a.*',
        'b.firstname',
        'b.lastname',
        'b.isgoalie',
        'c.city',
        'c.nickname',
        'c.teamlogo'
        )
        .from('players_stats_v2 as a')
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

const getPlayersByShowByTypeByUser = (req, res, knex) => {

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
    }).catch(err => res.status(400).json('not found'))
}

const updatePlayersStatsById = (req, res, knex) => {

    const playerStatData = req.body;

    knex('players_stats_v2').where({id: req.params.id})
        .update(playerStatData)
        .then(resp => {
            if (resp) {
                const result = {
                    statusCode: 200,
                    message: 'Update Player Stat Success',
                    result: resp
                }
                res.json(result);
            } else {
                res.status(400).json('Error!'); 
            }
        }).catch(err => res.status(400).json('Updating Player Stat Error'))
}


// ================================= LEADERS ===========================================

const getPointLeaders = (req, res, knex) => {
    knex.select(
        'a.games_played',
        'a.goals',
        'a.assists',
        'a.points',
        'b.firstname',
        'b.lastname',
        'b.isgoalie',
        'b.nhl_id',
        'c.city',
        'c.nickname',
        'c.teamlogo'
        )
        .from('players_stats_v2 as a')
        .leftJoin('players_v2 as b', 'b.id', 'a.player_id')
        .leftJoin('teams_v2 as c', 'c.shortname', 'a.team_name')
        .where('a.playing_year', req.query.playing_year)
        .where('a.season_type', req.query.season_type)
        .orderBy('a.points', 'desc')
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

const getDefenseLeaders = (req, res, knex) => {
    knex.select(
        'a.games_played',
        'a.goals',
        'a.assists',
        'a.points',
        'b.firstname',
        'b.lastname',
        'b.isgoalie',
        'b.nhl_id',
        'c.city',
        'c.nickname',
        'c.teamlogo'
        )
        .from('players_stats_v2 as a')
        .leftJoin('players_v2 as b', 'b.id', 'a.player_id')
        .leftJoin('teams_v2 as c', 'c.shortname', 'a.team_name')
        .where('a.playing_year', req.query.playing_year)
        .where('a.season_type', req.query.season_type)
        .where('b.isDefense', 'true')
        .orderBy('a.points', 'desc')
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

const getRookieLeaders = (req, res, knex) => {
    knex.select(
        'a.games_played',
        'a.goals',
        'a.assists',
        'a.points',
        'b.firstname',
        'b.lastname',
        'b.isgoalie',
        'b.nhl_id',
        'c.city',
        'c.nickname',
        'c.teamlogo'
        )
        .from('players_stats_v2 as a')
        .leftJoin('players_v2 as b', 'b.id', 'a.player_id')
        .leftJoin('teams_v2 as c', 'c.shortname', 'a.team_name')
        .where('a.playing_year', req.query.playing_year)
        .where('a.season_type', req.query.season_type)
        .where('a.player_status', 'Rookie')
        .orderBy('a.points', 'desc')
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
    getPlayersStats, getPlayersStatsById, getActivePlayersByTeam, 
    getPlayersBySeasonByTypeByTeam, getPlayersByTypeByUser, getPlayersByShowByTypeByUser,
    getPointLeaders, getDefenseLeaders, getRookieLeaders,
    updatePlayersStatsById
};
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

getPlayersByShowByTypeByUser = (req, res, knex) => {

    knex('players_stats_v2 as a')
        .sum({ sum: [
            'a.games_played as games_played',
            'a.goals as goals',
            'a.assists as assists',
            'a.points as points',
            'a.plus_minus as plus_minus',
            'a.penalty_minutes as penalty_minutes',
            'a.sh_goals as sh_goals',
            'a.pp_goals as pp_goals',
            'a.gw_goals as gw_goals',
            'a.gt_goals as gt_goals',
            'a.shots as shots',
            'a.minutes_played as minutes_played',
            'a.hits as hits',
            'a.blocked_shots as blocked_shots'
        ]}
        )
        .groupByRaw('a.player_id, a.team_name, a.season_type')
        .leftJoin('players_v2 as b', 'b.id', 'a.player_id')
        .leftJoin('teams_v2 as c', 'c.shortname', 'a.team_name')
        .where('c.users_id', req.params.id)
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
                res.status(400).json('error getting player stat')
            }
        }).catch(err => {
            console.log(err);
            res.status(400).json('not found')}
            )

    // knex.select(
    //     'a.player_id',
    //     'a.season_type',
    //     'a.team_name',
    //     )
    //     .from('players_stats_v2 as a')
    //     .sum(
    //         'a.games_played as games_played',
    //         'a.goals as goals',
    //         'a.assists as assists',
    //         'a.points as points',
    //         'a.plus_minus as plus_minus',
    //         'a.penalty_minutes as penalty_minutes',
    //         'a.sh_goals as sh_goals',
    //         'a.pp_goals as pp_goals',
    //         'a.gw_goals as gw_goals',
    //         'a.gt_goals as gt_goals',
    //         'a.shots as shots',
    //         'a.minutes_played as minutes_played',
    //         'a.hits as hits',
    //         'a.blocked_shots as blocked_shots'
    //     )
    //     .groupByRaw('a.player_id, a.team_name, a.season_type, a.points')
    //     .orderBy('a.points', 'desc')
    //     .leftJoin('players_v2 as b', 'b.id', 'a.player_id')
    //     .leftJoin('teams_v2 as c', 'c.shortname', 'a.team_name')
    //     .where('c.users_id', req.params.id)
    //     .where('a.season_type', req.query.season_type)
    //     .then(data => {
    //         if (data.length) {
    //             const result = {
    //                 statusCode: 200,
    //                 message: 'Request Success',
    //                 result: data
    //             }
    //             res.json(result);
    //         } else {
    //             res.status(400).json('error getting player stat')
    //         }
    //     }).catch(err => {
    //         console.log(err);
    //         res.status(400).json('not found')}
    //         )
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

module.exports = {
    getPlayersStats, getPlayersStatsById, getActivePlayersByTeam, 
    getPlayersBySeasonByTypeByTeam, getPlayersByTypeByUser, getPlayersByShowByTypeByUser,
    updatePlayersStatsById
};
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
                    result: data
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

module.exports = {
    getPlayersStats, getPlayersStatsById, updatePlayersStatsById
};
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
                    result: data
                }
                res.json(result);
            } else {
                res.status(400).json('error getting goalie stat')
            }
        }).catch(err => res.status(400).json('not found'))
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

module.exports = {
    getGoaliesStats, getGoaliesStatsById, updateGoaliesStatsById
};
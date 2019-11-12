const getPlayerStats = (req, res, knex) => {
    console.log(req.params.name);
    knex.select('*').from('players_stats').where('player_name', req.params.name)
        .then(data => {
            if (data.length) {
                res.json(data);
            } else {
                res.status(400).json('error getting stats')
            }
    })
    .catch(err => res.status(400).json('not found'))
}

const getPlayerStatsByType = (req, res, knex) => {
    console.log(req.params.name);
    knex.select('*').from('players_stats').where('player_name', req.params.name).where('season_type', req.query.type)
        .then(data => {
            if (data.length) {
                res.json(data);
            } else {
                res.status(400).json('error getting stats')
            }
    })
    .catch(err => res.status(400).json('not found'))
}

module.exports = {
    getPlayerStats, getPlayerStatsByType
};
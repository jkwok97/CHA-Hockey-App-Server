const getPlayerStats = (req, res, knex) => {
    knex.select('*').from('players_stats').where('player_name', req.query.name)
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
    getPlayerStats
};
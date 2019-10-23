const handlePlayersStatsGet = (req, res, knex) => {
    knex.select('*').from('players_stats')
        .then(data => {
            if (data.length) {
                res.json(data);
            } else {
                res.status(400).json('error getting stats')
            }
    })
    .catch(err => res.status(400).json('not found'))
}

const teamPlayersStats = (req, res, knex) => {
    knex.select('*').from('players_stats').where('team_name', req.params.teamName)
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
    handlePlayersStatsGet, teamPlayersStats
};
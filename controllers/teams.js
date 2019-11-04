const allTeamsStatsByYear = (req, res, knex) => {
    knex.select('*').from('teams').where('playing_year', req.query.year)
        .then(data => {
            if (data.length) {
                res.json(data);
            } else {
                res.status(400).json('error getting stats')
            }
    })
    .catch(err => res.status(400).json('not found'));
}

const allTeamsStatsAllTime = (req, res, knex) => {
    knex.select('*').from('teams')
        .then(data => {
            if (data.length) {
                res.json(data);
            } else {
                res.status(400).json('error getting stats')
            }
    })
    .catch(err => res.status(400).json('not found'))
}

const teamStatsByYear = (req, res, knex) => {
    knex.select('*').from('teams').where('team_name', req.params.teamName).where('playing_year', req.query.year)
        .then(data => {
            if (data.length) {
                res.json(data);
            } else {
                res.status(400).json('error getting stats')
            }
    })
    .catch(err => res.status(400).json('not found'))
}

const teamStatsAllTime = (req, res, knex) => {
    knex.select('*').from('teams').where('team_name', req.params.teamName)
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
    allTeamsStatsByYear, allTeamsStatsAllTime, teamStatsByYear, teamStatsAllTime
};
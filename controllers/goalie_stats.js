const alltimeGoalieStats = (req, res, knex) => {
    knex.select('*').from('goalie_stats')
        .then(data => {
            if (data.length) {
                res.json(data);
            } else {
                res.status(400).json('error getting stats')
            }
    })
    .catch(err => res.status(400).json('not found'))
}

const goalieStatsByYear = (req, res, knex) => {
    knex.select('*').from('goalie_stats').where('playing_year', req.query.year)
        .then(data => {
            if (data.length) {
                res.json(data);
            } else {
                res.status(400).json('error getting stats')
            }
    })
    .catch(err => res.status(400).json('not found'))
}

const alltimeGoalieStatsByTeam = (req, res, knex) => {
    knex.select('*').from('goalie_stats').where('team_name', req.params.teamName)
        .then(data => {
            if (data.length) {
                res.json(data);
            } else {
                res.status(400).json('error getting stats')
            }
    })
    .catch(err => res.status(400).json('not found'))
}

const goalieStatsByTeamByYear = (req, res, knex) => {
    knex.select('*').from('goalie_stats').where('team_name', req.params.teamName)
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
    alltimeGoalieStats, goalieStatsByYear, alltimeGoalieStatsByTeam, goalieStatsByTeamByYear
};
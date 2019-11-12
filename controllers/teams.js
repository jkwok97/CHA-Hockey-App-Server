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

const teamStatsByYearByType = (req, res, knex) => {
    knex.select('*').from('teams').where('team_name', req.params.teamName).where('playing_year', req.query.year).where('season_type', req.query.type)
        .then(data => {
            if (data.length) {
                res.json(data);
            } else {
                res.status(400).json('error getting stats')
            }
    })
    .catch(err => res.status(400).json('not found'))
}

const teamStatsByType = (req, res, knex) => {
    knex.select('*').from('teams').where('team_name', req.params.teamName).where('season_type', req.query.type)
        .then(data => {
            if (data.length) {
                res.json(data);
            } else {
                res.status(400).json('error getting stats')
            }
    })
    .catch(err => res.status(400).json('not found'))
}

const allTeamsStatsByYearByType = (req, res, knex) => {
    knex.select('*').from('teams').where('season_type', req.query.type).where('playing_year', req.query.year)
        .then(data => {
            if (data.length) {
                res.json(data);
            } else {
                res.status(400).json('error getting stats')
            }
    })
    .catch(err => res.status(400).json('not found'))
}

const allTeamsStatsByType = (req, res, knex) => {
    knex.select('*').from('teams').where('season_type', req.query.type)
        .then(data => {
            if (data.length) {
                res.json(data);
            } else {
                res.status(400).json('error getting stats')
            }
    })
    .catch(err => res.status(400).json('not found'))
}

const allTeamsStatsGrouped = (req, res, knex) => {
    knex.raw(`select season_type as season_type, sum(games_played) as games_played, sum(wins) as wins, sum(loss) as loss, sum(ties) as ties, sum(points) as points, sum(goals_for) as goals_for, sum(goals_against) as goals_against, sum(pp_attempts) as pp_attempts, sum(pp_goals) as pp_goals, sum(pk_attempts) as pk_attempts, sum(pk_goals) as pk_goals, sum(sh_goals) as sh_goals, sum(penalty_minutes) as penalty_minutes, sum(shots_for) as shots_for, sum(shots_against) as shots_against, sum(shut_outs) as shut_outs, team_name from teams where season_type = '${req.query.type}' group by team_name, season_type;`)
        .then(data => {
            res.json(data);
        })
        .catch(err => res.status(400).json('not found'))
}

module.exports = {
    allTeamsStatsByYear, allTeamsStatsAllTime, teamStatsByYear, teamStatsAllTime, teamStatsByYearByType,
    teamStatsByType, allTeamsStatsByYearByType, allTeamsStatsByType, allTeamsStatsGrouped
};



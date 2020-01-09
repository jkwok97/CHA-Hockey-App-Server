const request = require('request');

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

const alltimeGoalieStatsByYear = (req, res, knex) => {
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

const alltimeGoalieStatsByType = (req, res, knex) => {
    knex.select('*').from('goalie_stats').where('season_type', req.query.type)
        .then(data => {
            if (data.length) {
                res.json(data);
            } else {
                res.status(400).json('error getting stats')
            }
    })
    .catch(err => res.status(400).json('not found'))
}

const alltimeGoalieStatsByYearByType = (req, res, knex) => {
    knex.select('*').from('goalie_stats').where('season_type', req.query.type).where('playing_year', req.query.year)
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

const goalieStatsByTeamByYearByType = (req, res, knex) => {
    knex.select('*').from('goalie_stats').where('team_name', req.params.teamName).where('playing_year', req.query.year).where('season_type', req.query.type)
        .then(data => {
            if (data.length) {
                res.json(data);
            } else {
                res.status(400).json('error getting stats')
            }
    })
    .catch(err => res.status(400).json('not found'))
}

const goalieStatsByTeamByType = (req, res, knex) => {
    knex.select('*').from('goalie_stats').where('team_name', req.params.teamName).where('season_type', req.query.type)
        .then(data => {
            if (data.length) {
                res.json(data);
            } else {
                res.status(400).json('error getting stats')
            }
    })
    .catch(err => res.status(400).json('not found'))
}

const alltimeGoalieStatsGrouped = (req, res, knex) => {
    knex.raw(`select season_type as season_type, sum(games_played) as games_played, sum(wins) as wins, sum(loss) as loss, sum(ties) as ties, sum(minutes_played) as minutes_played, sum(en_goals) as en_goals, sum(shutouts) as shutouts, sum(goals_against) as goals_against, sum(saves) as saves, sum(shots_for) as shots_for, sum(goals) as goals, sum(assists) as assists, sum(points) as points, sum(penalty_minutes) as penalty_minutes, player_name from goalie_stats where season_type = '${req.query.type}' group by player_name, season_type;`)
        .then(data => {
            res.json(data);
        })
        .catch(err => res.status(400).json('not found'))
}

const allTimeTeamGoaliesStatsGrouped = (req, res, knex) => {
    console.log(req.params.teamName);
    console.log(req.query.type);
    knex.raw(`select season_type as season_type, team_name as team_name, sum(games_played) as games_played, sum(wins) as wins, sum(loss) as loss, sum(ties) as ties, sum(minutes_played) as minutes_played, sum(en_goals) as en_goals, sum(shutouts) as shutouts, sum(goals_against) as goals_against, sum(saves) as saves, sum(shots_for) as shots_for, sum(goals) as goals, sum(assists) as assists, sum(points) as points, sum(penalty_minutes) as penalty_minutes, player_name from goalie_stats where team_name = '${req.params.teamName}' and season_type = '${req.query.type}' group by player_name, team_name, season_type;`)
        .then(data => {
            res.json(data);
        })
        .catch(err => res.status(400).json('not found'))
}

const tradeGoalie = (req, res, knex, hookUrl) => {
    knex('goalie_stats').where({id: req.params.id}).update({team_name: req.body.team_name})
        .then(resp => {
            if (resp) {
                request.post(hookUrl, {
                    json: {
                        'text': `:rotating_light: ${req.body.type} ALERT :rotating_light: \n \n ${req.body.player.player_name} has been moved from ${req.body.prevTeam} to ${req.body.player.team_name}`,
                        'channel': '#trades',
                        'username': 'League Office',
                        'icon_emoji': ':office:'
                    }
                }, (error, res, body) => {
                    if (error) {
                        console.log(error);
                        return
                    } else {
                        console.log(body);
                    }
                })
                res.json("Success!")
            } else {
                res.status(400).json("Error Updating Player");
            }
        })
}

const updateName = (req, res, knex) => {
    knex('goalie_stats').where({id: req.params.id}).update({player_name: req.body.player_name})
        .then(resp => {
            if (resp) {
                res.json("Success!")
            } else {
                res.status(400).json("Error Updating Name")
            }
        })
        .catch(err => {
            console.log(err);
            res.status(400).json("Server Error!");
        });
}

module.exports = {
    alltimeGoalieStats, alltimeGoalieStatsByYear, alltimeGoalieStatsByTeam, goalieStatsByTeamByYear,
    goalieStatsByTeamByYearByType, goalieStatsByTeamByType, alltimeGoalieStatsByYearByType, alltimeGoalieStatsByType,
    alltimeGoalieStatsGrouped, allTimeTeamGoaliesStatsGrouped, tradeGoalie, updateName
};
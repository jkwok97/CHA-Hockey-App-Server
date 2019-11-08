const request = require('request');
const sportsDataURL = 'https://api.sportsdata.io/v3/nhl/scores/json/Players';
const key = 'b3d19d2576cc46b68af33b26616de34b';

const getAllPlayerInfo = (req, res) => {
    request(`${sportsDataURL}?key=${key}`, (error, response, body) => {
        if (!error && response.statusCode == 200) {
            console.log(body);
             var info = JSON.parse(body)
            // do more stuff
            let result = [];
            info.forEach(player => {
                result.push({
                    playerName: `${player.FirstName} ${player.LastName}`,
                    playerId: player.PlayerID,
                    birthdate: player.BirthDate,
                    image: player.PhotoUrl,
                    position: player.Position
                })
            });
            res.send(result);
        } else {
            console.log(error);
            error => res.send(error)
        }
      })
}

const allTimePlayerStats = (req, res, knex) => {
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

const alltimePlayerStatsByYear = (req, res, knex) => {
    knex.select('*').from('players_stats').where('playing_year', req.query.year).where('points', '>', 0)
        .then(data => {
            if (data.length) {
                res.json(data);
            } else {
                res.status(400).json('error getting stats')
            }
    })
    .catch(err => res.status(400).json('not found'))
}

const alltimePlayerStatsByType = (req, res, knex) => {
    knex.select('*').from('players_stats').where('season_type', req.query.type).where('points', '>', 0)
        .then(data => {
            if (data.length) {
                res.json(data);
            } else {
                res.status(400).json('error getting stats')
            }
        })
        .catch(err => res.status(400).json('not found'))
}

const alltimePlayerStatsGrouped = (req, res, knex) => {
    knex.select('player_name', knex.raw('SUM(points)')).from('player_stats').groupByRaw('player_name WITH ROLLUP')
        .then(data => {
            if (data.length) {
                res.json(data);
            } else {
                res.status(400).json('error getting stats')
            }
        })
        .catch(err => res.status(400).json('not found'))

    // knex('players_stats')
    //     .sum('games_played', 'goals', 'assists', 'points', 'plus_minus', 'penalty_minutes', 'pp_goals', 'sh_goals', 'gw_goals', 'gt_goals', 'shots',
    //         'minutes_played', 'fo_won', 'fo_lost', 'fo_tied', 'pass_complete', 'pass_incomplete', 'pass_attempts', 'corner_won', 'corner_lost',
    //         'corner_total', 'fights_won', 'fights_lost', 'fights_tied', 'fights_total', 'hits', 'blocked_shots')
    //     .where('season_type', req.query.type)
    //     .groupBy('player_name')
    //     .orderBy('points', 'desc')
    //         .then(data => {
    //             if (data.length) {
    //                 res.json(data);
    //             } else {
    //                 res.status(400).json('error getting stats')
    //             }
    //         })
    //         .catch(err => res.status(400).json('not found'))
}

const alltimePlayerStatsByYearBySeason = (req, res, knex) => {
    knex.select('*').from('players_stats').where('playing_year', req.query.year).where('season_type', req.query.type).where('points', '>', 0)
        .then(data => {
            if (data.length) {
                res.json(data);
            } else {
                res.status(400).json('error getting stats')
            }
    })
    .catch(err => res.status(400).json('not found'))
}

const allTimePlayerStatsByTeam = (req, res, knex) => {
    knex.select('*').from('players_stats').where('team_name', req.params.teamName).where('points', '>', 0)
        .then(data => {
            if (data.length) {
                res.json(data);
            } else {
                res.status(400).json('error getting stats')
            }
    })
    .catch(err => res.status(400).json('not found'))
}

const playerStatsByTeamByYear = (req, res, knex) => {
    knex.select('*').from('players_stats').where('team_name', req.params.teamName).where('playing_year', req.query.year)
        .then(data => {
            if (data.length) {
                res.json(data);
            } else {
                res.status(400).json('error getting stats')
            }
    })
    .catch(err => res.status(400).json('not found'))
}

const playerStatsByTeamByType = (req, res, knex) => {
    knex.select('*').from('players_stats').where('team_name', req.params.teamName).where('season_type', req.query.type)
        .then(data => {
            if (data.length) {
                res.json(data);
            } else {
                res.status(400).json('error getting stats')
            }
    })
    .catch(err => res.status(400).json('not found'))
}

const playerStatsByTeamByYearByType = (req, res, knex) => {
    knex.select('*').from('players_stats').where('team_name', req.params.teamName).where('season_type', req.query.type).where('playing_year', req.query.year)
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
    allTimePlayerStats, allTimePlayerStatsByTeam, getAllPlayerInfo, alltimePlayerStatsByYear, playerStatsByTeamByYear,
    playerStatsByTeamByType, playerStatsByTeamByYearByType, alltimePlayerStatsByYearBySeason, alltimePlayerStatsByType,
    alltimePlayerStatsGrouped
};
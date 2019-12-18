const request = require('request');
const sportsDataURL = 'https://api.sportsdata.io/v3/nhl/scores/json/Players';
const key = 'b3d19d2576cc46b68af33b26616de34b';
const key1 = '4064a3b66cc64f28a8d52cc3be024ffb';

const getAllPlayerInfo = (req, res) => {
    console.log("======================> in first key");
    request(`${sportsDataURL}?key=${key}`, (error, response, body) => {
        if (!error && response.statusCode == 200) {
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
            console.log("================> in playerstats.js line 24" + error);
            error => {
                this.getAllPlayerInfo2();
                // res.send(error);
            }
        }
    });
}

const getAllPlayerInfo2 = (req, res) => {
    console.log("======================> in second key");
    request(`${sportsDataURL}?key=${key1}`, (error, response, body) => {
        if (!error && response.statusCode == 200) {
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
            console.log("================> in playerstats.js line 167" + error);
            error => res.send(error)
        }
    });    
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
    knex.select('*').from('players_stats')
        .where('playing_year', req.query.year).where('points', '>', 0)
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
    knex.select('*').from('players_stats').where('season_type', req.query.type).where('points', '>', 0).orderBy('points', 'desc').limit(1500)
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
    knex.raw(`select season_type as season_type, sum(games_played) as games_played, sum(goals) as goals, sum(assists) as assists, sum(points) as points, sum(plus_minus) as plus_minus, sum(penalty_minutes) as penalty_minutes, sum(sh_goals) as sh_goals, sum(pp_goals) as pp_goals, sum(gw_goals) as gw_goals, sum(gt_goals) as gt_goals, sum(shots) as shots, sum(minutes_played) as minutes_played, sum(hits) as hits, sum(blocked_shots) as blocked_shots, player_name from players_stats where season_type = '${req.query.type}' group by player_name, season_type;`)
        .then(data => {
            res.json(data);
        })
        .catch(err => res.status(400).json('not found'))
}

const allTimeTeamPlayersStatsGrouped = (req, res, knex) => {
    knex.raw(`select season_type as season_type, team_name as team_name, sum(games_played) as games_played, sum(goals) as goals, sum(assists) as assists, sum(points) as points, sum(plus_minus) as plus_minus, sum(penalty_minutes) as penalty_minutes, sum(sh_goals) as sh_goals, sum(pp_goals) as pp_goals, sum(gw_goals) as gw_goals, sum(gt_goals) as gt_goals, sum(shots) as shots, sum(minutes_played) as minutes_played, sum(hits) as hits, sum(blocked_shots) as blocked_shots, player_name from players_stats where team_name = '${req.params.teamName}' and season_type = '${req.query.type}' group by player_name, team_name, season_type;`)
        .then(data => {
            res.json(data);
        })
        .catch(err => res.status(400).json('not found'))
}

const alltimePlayerStatsByYearBySeason = (req, res, knex) => {
    knex.select('*').from('players_stats').where('playing_year', req.query.year).where('season_type', req.query.type)
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

const tradePlayer = (req, res, knex) => {
    console.log(req.body.team_name);
    console.log(req.params.id);
    knex('player_stats').where({id: req.params.id}).update({team_name: req.body.team_name})
        .then(resp => {
            if (resp) {
                res.json("Success!")
            } else {
                res.status(400).json("Error Updating Player");
            }
        })
        .catch(err => res.status(400).json("Server Error"));
}

module.exports = {
    allTimePlayerStats, allTimePlayerStatsByTeam, getAllPlayerInfo, alltimePlayerStatsByYear, playerStatsByTeamByYear,
    playerStatsByTeamByType, playerStatsByTeamByYearByType, alltimePlayerStatsByYearBySeason, alltimePlayerStatsByType,
    alltimePlayerStatsGrouped, allTimeTeamPlayersStatsGrouped, getAllPlayerInfo2, tradePlayer
};
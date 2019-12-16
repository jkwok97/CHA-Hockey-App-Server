const request = require('request');

nhlAPI = 'https://statsapi.web.nhl.com/api/v1/people';
nhlCOM = 'http://www.nhl.com/stats/rest'
statsType = 'statsSingleSeason';
currentNHLSeason = '20192020';

// https://statsapi.web.nhl.com/api/v1/people/8470595/stats?stats=statsSingleSeason&season=20192020

const getPlayerStats = (req, res, knex) => {
    console.log(req.params.name);
    knex.select('*').from('players_stats as a')
        .where('a.player_name', req.params.name).orderBy('a.playing_year', 'desc')
        .then(data => {
            if (data.length) {
                res.json(data);
            } else {
                res.status(400).json('error getting stats')
            }
    })
    .catch(err => {
        console.log(err);
        res.status(400).json('not found');
    })
}

const getPlayerStatsByType = (req, res, knex) => {
    console.log(req.params.name);
    knex.select('*').from('players_stats as a')
        .where('a.player_name', req.params.name).where('a.season_type', req.query.type).orderBy('a.playing_year', 'desc')
        .then(data => {
            if (data.length) {
                res.json(data);
            } else {
                res.status(400).json('error getting stats')
            }
    })
    .catch(err => {
        console.log(err); 
        res.status(400).json('not found');
    })
}

const getPlayerStatsWithJoin = (req, res, knex) => {
    console.log(req.params.name);
    console.log(req.query.league);
    knex.select('*').from('players_stats as a')
        .fullOuterJoin('nhl_players as b', 'a.player_name', '=', 'b.player_name')
        .where('a.player_name', req.params.name).orderBy('a.playing_year', 'desc')
        .then(data => {
            if (data.length) {
                res.json(data);
            } else {
                res.status(400).json('error getting stats')
            }
    })
    .catch(err => {
        console.log(err);
        res.status(400).json('not found');
    })
}

const getPlayerStatsByTypeWithJoin = (req, res, knex) => {
    console.log(req.params.name);
    console.log(req.query.league);
    knex.select('*').from('players_stats as a')
        .fullOuterJoin('nhl_players as b', 'a.player_name', '=', 'b.player_name')
        .where('a.player_name', req.params.name).where('a.season_type', req.query.type).orderBy('a.playing_year', 'desc')
        .then(data => {
            if (data.length) {
                res.json(data);
            } else {
                res.status(400).json('error getting stats')
            }
    })
    .catch(err => {
        console.log(err); 
        res.status(400).json('not found');
    })
}

const getNhlPlayerStats = (req, res) => {
    request(`https://statsapi.web.nhl.com/api/v1/people/${req.query.id}/stats?stats=statsSingleSeason&season=20192020`, (error, response, body) => {
        if (!error && response.statusCode == 200) {
            var info = JSON.parse(body)
            res.send(info);
        } else {
            error => {
                console.log(error);
                res.send(error)
            }
        }
    });    
}

const getOnPaceNhlPlayerStats = (req, res) => {
    request(`https://statsapi.web.nhl.com/api/v1/people/${req.query.id}/stats?stats=onPaceRegularSeason&season=20192020`, (error, response, body) => {
        if (!error && response.statusCode == 200) {
            var info = JSON.parse(body)
            res.send(info);
        } else {
            error => {
                console.log(error);
                res.send(error)
            }
        }
    });    
}

// http://www.nhl.com/stats/rest/skaters?reportType=20192020&reportName=skatersummary&cayenneExp=seasonId=20192020%20and%20gameTypeId=2&sort=goals

const getAllNHLPlayerStats = (req, res) => {
    request(`${nhlCOM}/${req.query.playerType}s?reportType=${req.query.season}&reportName=${req.query.playerType}summary&cayenneExp=seasonId=${req.query.season}%20and%20gameTypeId=2&sort=${req.query.statType}`,
        (error, response, body) => {
            if (!error && response.statusCode == 200) {
                let leaders = JSON.parse(body);
                let leadersArray = leaders.data;
                if (req.query.sort == "reverse" && req.query.qty == "trim") {
                    let info = leadersArray.reverse().splice(0,10);
                    res.send(info);
                } else if (req.query.sort == "reverse" && req.query.qty == "all") {
                    let info = leadersArray.reverse();
                    res.send(info);
                } else if (req.query.qty == "trim" && req.query.sort == "no") {
                    let info = leadersArray.splice(0,10);
                    res.send(info);
                } else if (req.query.qty == "all" && req.query.sort == "no") {
                    let info = leadersArray;
                    res.send(info);
                }
            } else {
                error => {
                    console.log(error);
                    res.send(error);
                }
            }
    });
}

const getChaTeam = (req, res, knex) => {
    knex.select('team_name').from('players_stats').where('player_name', req.query.player)
        .then(data => {
            if (data.length) {
                res.json(data[0]['team_name']);
            } else {
                res.status(400).json('error getting player');
            }
        })
}

const getPlayerRatings = (req, res, knex) => {
    knex.select('*').from('players_ratings').where('player_name', req.params.name)
        .then(data => {
            if (data.length) {
                res.json(data);
            } else {
                res.status(400).json('error getting stats')
            }
    })
    .catch(err => {
        console.log(err);
        res.status(400).json('not found');
    })
}

const getForwardSalaries = (req, res, knex) => {
    knex.select('*').from('forward_salaries as a')
        .fullOuterJoin('players_stats as b', 'a.player_name', 'b.player_name')
        .where('b.season_type', req.query.type)
        .where('b.playing_year', req.query.year)
        .having('b.position', 'RW').having('b.position', 'C').having('b.position', 'LW')
        .then(data => {
            if (data.length) {
                res.json(data);
            } else {
                res.status(400).json('error getting stats')
            }
    })
    .catch(err => {
        console.log(err); 
        res.status(400).json('not found');
    })
}

const getDefenseSalaries = (req, res, knex) => {
    knex.select('*').from('defense_salaries as a')
        .fullOuterJoin('players_stats as b', 'a.player_name', 'b.player_name')
        .where('b.season_type', req.query.type).where('b.playing_year', req.query.year)
        .having('b.position', 'LD').having('b.position', 'RD')
        .then(data => {
            if (data.length) {
                res.json(data);
            } else {
                res.status(400).json('error getting stats')
            }
    })
    .catch(err => {
        console.log(err); 
        res.status(400).json('not found');
    })
}

const getGoalieSalaries = (req, res, knex) => {
    knex.select('*').from('goalie_salaries as a')
        .fullOuterJoin('players_stats as b', 'a.player_name', 'b.player_name')
        .where('b.season_type', req.query.type).where('b.playing_year', req.query.year)
        .having('b.position', 'G')
        .then(data => {
            if (data.length) {
                res.json(data);
            } else {
                res.status(400).json('error getting stats')
            }
    })
    .catch(err => {
        console.log(err); 
        res.status(400).json('not found');
    })
}

module.exports = {
    getPlayerStats, getPlayerStatsByType, getPlayerStatsWithJoin, getPlayerStatsByTypeWithJoin, getNhlPlayerStats,
    getOnPaceNhlPlayerStats, getPlayerRatings, getAllNHLPlayerStats, getChaTeam, getForwardSalaries, 
    getDefenseSalaries, getGoalieSalaries
};
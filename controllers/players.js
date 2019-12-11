const request = require('request');

nhlAPI = 'https://statsapi.web.nhl.com/api/v1/people';
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

const getAllNHLPlayerStats = (req, res, knex) => {
    knex.select('*').from('nhl_players')
        .then( data => {
            if (data.length) {
                data.forEach(player => {
                    stats = request(`https://statsapi.web.nhl.com/api/v1/people/${player.player_nhl_id}/stats?stats=onPaceRegularSeason&season=20192020`, (error, response, body) => {
                        if (!error && response.statusCode == 200) {
                            var info = JSON.parse(body);
                            return info
                        } else {
                            error => {
                                console.log(error);
                                res.send(error);
                            }
                        }
                    });
                    console.log(stats);
                    // player.stats = stats.stats[0]['splits'][0];
                })
                // console.log(data);
                res.json(data);
            } else {
                res.status(400).json('error getting stats');
            }
    })
}

const getPlayerRatings = (req, res, knex) => {
    console.log(req.params.name);
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

module.exports = {
    getPlayerStats, getPlayerStatsByType, getPlayerStatsWithJoin, getPlayerStatsByTypeWithJoin, getNhlPlayerStats,
    getOnPaceNhlPlayerStats, getPlayerRatings, getAllNHLPlayerStats
};
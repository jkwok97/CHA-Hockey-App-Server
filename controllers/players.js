const request = require('request');

nhlAPI = 'https://statsapi.web.nhl.com/api/v1/people';
nhlCOM = 'https://api.nhle.com/stats/rest/en/leaders';
nhlComSummary = 'https://api.nhle.com/stats/rest/en';
statsType = 'statsSingleSeason';
currentNHLSeason = '20192020';

// https://statsapi.web.nhl.com/api/v1/people/8470595/stats?stats=statsSingleSeason&season=20192020

const getPlayerStats = (req, res, knex) => {
    knex.select('*').from('players_stats as a')
        .where('a.player_id', req.params.id).orderBy('a.playing_year', 'desc')
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
    console.log(req.params.id);
    knex.select('*').from('players_stats as a')
        .where('a.player_id', req.params.id).where('a.season_type', req.query.type).orderBy('a.playing_year', 'desc')
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
    knex.select('*').from('players_stats as a')
        .fullOuterJoin('nhl_players as b', 'a.player_id', '=', 'b.cha_player_id')
        .where('a.player_id', req.params.id).orderBy('a.playing_year', 'desc')
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
    knex.select('*').from('players_stats as a')
        .fullOuterJoin('nhl_players as b', 'a.player_id', '=', 'b.cha_player_id')
        .where('a.player_id', req.params.id).where('a.season_type', req.query.type).orderBy('a.playing_year', 'desc')
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

// https://api.nhle.com/stats/rest/en/leaders/skaters/points?cayenneExp=season=20192020%20and%20gameType=2

// https://api.nhle.com/stats/rest/en/leaders/goalies/gaa?cayenneExp=season=20192020%20and%20gameType=2%20and%20gamesPlayed%20%3E=%2011

const getAllNHLPlayerStats = (req, res) => {
    request(`${nhlCOM}/${req.query.playerType}s/${req.query.statType}?cayenneExp=season=${req.query.season}%20and%20gameType=2`,
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

const getAllNHLRookieStats = (req, res) => {
    request(`${nhlCOM}/${req.query.playerType}s/${req.query.statType}?cayenneExp=season=${req.query.season}%20and%20gameType=2%20and%20isRookie%20=%20%27Y%27`,
        (error, response, body) => {
            if (!error && response.statusCode == 200) {
                let leaders = JSON.parse(body);
                let leadersArray = leaders.data;
                res.send(leadersArray);
            } else {
                error => {
                    console.log(error);
                    res.send(error);
                }
            }
    });
}

const getAllNHLGoalieStats = (req, res) => {
    request(`${nhlCOM}/${req.query.playerType}s/${req.query.statType}?cayenneExp=season=${req.query.season}%20and%20gameType=2%20and%20gamesPlayed%20%3E=%2020`,
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

// https://api.nhle.com/stats/rest/en/goalie/summary?cayenneExp=seasonId=20192020%20and%20gameTypeId=2

// ${nhlComSummary}/$req.query.playerType/summary?sort=%5B%7B%22property%22:%22${req.query.statsType}%22,%22direction%22:%22${req.quert.sort}%22%7D%5D&start=${req.query.start}&limit=${req.query.pageSize}&cayenneExp=gameTypeId=2%20and%20seasonId%3C=${req.query.season}

const getNHLPlayerSummary = (req, res) => {
    request(`${nhlComSummary}/${req.query.playerType}/summary?isAggregate=false&isGame=false&sort=%5B%7B%22property%22:%22${req.query.statsType}%22,%22direction%22:%22${req.query.sort}%22%7D%5D&start=${req.query.start}&limit=${req.query.pageSize}&cayenneExp=gameTypeId=2%20and%20seasonId%3C=${req.query.season}%20and%20seasonId%3E=${req.query.season}`,
        (error, response, body) => {
            if (!error && response.statusCode == 200) {
                let summary = JSON.parse(body);
                let summaryArray = summary;
                res.send(summaryArray);
            } else {
                error => {
                    console.log(error);
                    res.send(error);
                }
            }
    });
}

const getAllNHLRookieSummary = (req, res) => {
    request(`${nhlComSummary}/${req.query.playerType}/summary?isAggregate=false&isGame=false&sort=%5B%7B%22property%22:%22${req.query.statsType}%22,%22direction%22:%22${req.query.sort}%22%7D%5D&start=${req.query.start}&limit=${req.query.pageSize}&cayenneExp=gameTypeId=2%20and%20isRookie=%221%22%20and%20seasonId%3C=${req.query.season}%20and%20seasonId%3E=${req.query.season}`,
        (error, response, body) => {
            if (!error && response.statusCode == 200) {
                let summary = JSON.parse(body);
                let summaryArray = summary;
                res.send(summaryArray);
            } else {
                error => {
                    console.log(error);
                    res.send(error);
                }
            }
    });
}

const getChaTeam = (req, res, knex) => {
    knex.select('team_name', 'player_id').from('players_stats as a')
        .fullOuterJoin('nhl_players as b', 'a.player_id', '=', 'b.cha_player_id')
        .where('b.player_nhl_id', req.query.id)
        .orderBy('a.playing_year', 'desc')
        .then(data => {
            if (data.length) {
                // console.log(data);
                res.json(data[0]);
            } else {
                res.status(400).json('error getting player');
            }
        })
}

const getPlayerRatings = (req, res, knex) => {
    knex.select('*').from('players_ratings').where('player_id', req.params.id)
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
    getOnPaceNhlPlayerStats, getPlayerRatings, getAllNHLPlayerStats, getChaTeam, 
    getAllNHLGoalieStats, getNHLPlayerSummary, getAllNHLRookieStats, getAllNHLRookieSummary
};
const request = require('request');

nhlAPI = 'https://statsapi.web.nhl.com/api/v1/people';
nhlCOM = 'https://api.nhle.com/stats/rest/en/leaders';
nhlComSummary = 'https://api.nhle.com/stats/rest/en';
statsType = 'statsSingleSeason';
currentNHLSeason = '20192020';

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

const getNhlPlayerInfo = (req, res) => {
    request(`https://statsapi.web.nhl.com/api/v1/people/${req.params.id}?expand=person.stats&stats=yearByYear,yearByYearPlayoffs,careerRegularSeason&expand=stats.team&site=en_nhlCA`,
        (error, response, body) => {
            if (!error && response.statusCode == 200) {
                const info = JSON.parse(body);

                const stats = getInfo(info);

                const result = {
                    statusCode: 200,
                    message: 'Request Success',
                    result: stats
                }

                res.send(result);
            } else {
                error => {
                    console.log(error);
                    res.send(error)
                }
            } 
        })
}

const getCareerNHLPlayerStats = (req, res) => {
    request(`https://statsapi.web.nhl.com/api/v1/people/${req.params.id}?expand=person.stats&stats=yearByYear,yearByYearPlayoffs,careerRegularSeason&expand=stats.team&site=en_nhlCA`,
        (error, response, body) => {
            if (!error && response.statusCode == 200) {
                const info = JSON.parse(body);

                const stats = getStats(info);

                const result = {
                    statusCode: 200,
                    message: 'Request Success',
                    result: stats
                }

                res.send(result);
            } else {
                error => {
                    console.log(error);
                    res.send(error)
                }
            } 
        })
}

const getInfo = (info) => {
    const playerInfo = info['people'];

    return extractPlayerInfo(playerInfo);
}

const getStats = (info) => {
    const playerInfo = info['people'];

    const playerType = playerInfo.filter((item => item.primaryPosition.code))[0];

    console.log(playerType);

    const s = info['people'][0]['stats'][0]['splits'];
    const playerStats = s;
    const p = playerStats.filter((stat) => stat['league']['name'] === "National Hockey League");

    return playerType === 'G' ? extractGoalieStats(p) : extractPlayerStats(p);
     
}

const extractPlayerInfo = (p) => {
    return p.map((item => ({
        height: item.height,
        birthCountry: item.birthCountry,
        age: item.currentAge,
        position: item.primaryPosition.code,
        shoots: item.shootsCatches
      })))[0];
}

const extractPlayerStats = (p) => {
    return p.map(stat => ({
        season: stat['season'],
        assists: stat['stat']['assists'],
        blocked: stat['stat']['blocked'],
        evenTimeOnIce: stat['stat']['evenTimeOnIce'],
        faceOffPct: stat['stat']['faceOffPct'],
        gameWinningGoals: stat['stat']['gameWinningGoals'],
        games: stat['stat']['games'],
        goals: stat['stat']['goals'],
        hits: stat['stat']['hits'],
        overTimeGoals: stat['stat']['overTimeGoals'],
        penaltyMinutes: stat['stat']['penaltyMinutes'],
        pim: stat['stat']['pim'],
        plusMinus: stat['stat']['plusMinus'],
        points: stat['stat']['points'],
        powerPlayGoals: stat['stat']['powerPlayGoals'],
        powerPlayPoints: stat['stat']['powerPlayPoints'],
        powerPlayTimeOnIce: stat['stat']['powerPlayTimeOnIce'],
        shifts: stat['stat']['shifts'],
        shortHandedGoals: stat['stat']['shortHandedGoals'],
        shortHandedPoints: stat['stat']['shortHandedPoints'],
        shortHandedTimeOnIce: stat['stat']['shortHandedTimeOnIce'],
        shotPct: stat['stat']['shotPct'],
        shots: stat['stat']['shots'],
        timeOnIce: stat['stat']['timeOnIce']
    }));
}

const extractGoalieStats = (p) => {
    return p.map(stat => ({
        season: stat['season'],
        evenSaves: stat['stat']['evenSaves'],
        evenShots: stat['stat']['evenShots'],
        evenStrengthSavePercentage: stat['stat']['evenStrengthSavePercentage'],
        games: stat['stat']['games'],
        gamesStarted: stat['stat']['gamesStarted'],
        goalAgainstAverage: stat['stat']['goalAgainstAverage'],
        goalsAgainst: stat['stat']['goalsAgainst'],
        losses: stat['stat']['losses'],
        powerPlaySavePercentage: stat['stat']['powerPlaySavePercentage'],
        powerPlaySaves: stat['stat']['powerPlaySaves'],
        powerPlayShots: stat['stat']['powerPlayShots'],
        savePercentage: stat['stat']['savePercentage'],
        saves: stat['stat']['saves'],
        shortHandedSavePercentage: stat['stat']['shortHandedSavePercentage'],
        shortHandedSaves: stat['stat']['shortHandedSaves'],
        shortHandedShots: stat['stat']['shortHandedShots'],
        shotsAgainst: stat['stat']['shotsAgainst'],
        shutouts: stat['stat']['shutouts'],
        ties: stat['stat']['ties'],
        timeOnIce: stat['stat']['timeOnIce'],
        wins: stat['stat']['wins'],
    }));
}

module.exports = {
    getAllNHLPlayerStats, getAllNHLGoalieStats, getNHLPlayerSummary, getAllNHLRookieStats, getAllNHLRookieSummary,
    getNhlPlayerStats, getOnPaceNhlPlayerStats, getCareerNHLPlayerStats, getNhlPlayerInfo
};
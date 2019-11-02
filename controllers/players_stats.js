const request = require('request');
const sportsDataURL = 'https://api.sportsdata.io/v3/nhl/scores/json/Players';
const key = '4064a3b66cc64f28a8d52cc3be024ffb';

const getAllPlayerInfo = (req, res) => {
    // request(`${sportsDataURL}key=${key}`, function (error, response, body) {
    //     if (!error && response.statusCode == 200) {
    //         console.log(body);
    //          var info = JSON.parse(body)
    //         // do more stuff
    //         res.send(info);
    //     } else {
    //         error => res.send(error)
    //     }
    //   })
    request({url: `${sportsDataURL}key=${key}`, json: true}, (err, res, json) => {
        if (err) {
            res.status(400).json('error getting stats')
            throw err;
        }
        console.log(json);
        // res.json(data);
    });
}

const handlePlayersStatsGet = (req, res, knex) => {
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

const teamPlayersStats = (req, res, knex) => {
    knex.select('*').from('players_stats').where('team_name', req.params.teamName)
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
    handlePlayersStatsGet, teamPlayersStats, getAllPlayerInfo
};
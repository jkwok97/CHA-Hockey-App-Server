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

module.exports = {
    getPlayerStats, getPlayerStatsByType, getPlayerStatsWithJoin, getPlayerStatsByTypeWithJoin
};
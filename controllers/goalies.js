const getPlayerStats = (req, res, knex) => {
    console.log(req.params.name);
    knex.select('*').from('goalie_stats').where('player_id', req.params.id).orderBy('playing_year', 'desc')
        .then(data => {
            if (data.length) {
                res.json(data);
            } else {
                res.status(400).json('error getting stats')
            }
    })
    .catch(err => res.status(400).json('not found'))
}

const getPlayerStatsByType = (req, res, knex) => {
    console.log(req.params.id);
    knex.select('*').from('goalie_stats').where('player_id', req.params.id).where('season_type', req.query.type).orderBy('playing_year', 'desc')
        .then(data => {
            if (data.length) {
                res.json(data);
            } else {
                res.status(400).json('error getting stats')
            }
    })
    .catch(err => res.status(400).json('not found'))
}

const getPlayerStatsWithJoin = (req, res, knex) => {
    console.log(req.params.id);
    knex.select('*').from('goalie_stats as a')
    .fullOuterJoin('nhl_players as b', 'a.player_id', '=', 'b.cha_goalie_id')
    .where('a.player_id', req.params.id).orderBy('a.playing_year', 'desc')
        .then(data => {
            if (data.length) {
                res.json(data);
            } else {
                res.status(400).json('error getting stats')
            }
    })
    .catch(err => res.status(400).json('not found'))
}

const getPlayerStatsByTypeWithJoin = (req, res, knex) => {
    console.log(req.params.id);
    knex.select('*').from('goalie_stats as a')
    .fullOuterJoin('nhl_players as b', 'a.player_id', '=', 'b.cha_goalie_id')
    .where('a.player_id', req.params.id).where('a.season_type', req.query.type).orderBy('a.playing_year', 'desc')
        .then(data => {
            if (data.length) {
                res.json(data);
            } else {
                res.status(400).json('error getting stats')
            }
    })
    .catch(err => res.status(400).json('not found'))
}

const getPlayerRatings = (req, res, knex) => {
    console.log(req.params.name);
    knex.select('*').from('goalie_ratings').where('player_id', req.params.id)
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

const getGoalieChaTeam = (req, res, knex) => {
    knex.select('team_name', 'player_id').from('goalie_stats as a')
        .fullOuterJoin('nhl_players as b', 'a.player_id', '=', 'b.cha_goalie_id')
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

module.exports = {
    getPlayerStats, getPlayerStatsByType, getPlayerStatsWithJoin, getPlayerStatsByTypeWithJoin, getPlayerRatings,
    getGoalieChaTeam
};
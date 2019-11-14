const getPlayerStats = (req, res, knex) => {
    console.log(req.params.name);
    // knex.select('*').from('players_stats').fullOuterJoin('nhlPlayers', 'players_stats.player_name', '=', 'nhlPlayers.player_name')
    //     .where('player_name', req.params.name).orderBy('playing_year', 'desc')
    //     .then(data => {
    //         if (data.length) {
    //             res.json(data);
    //         } else {
    //             res.status(400).json('error getting stats')
    //         }
    // })
    // .catch(err => {
    //     console.log(err);
    //     res.status(400).json('not found');
    // })
    knex.select('*').from('nhl_players').then(data => {
        res.json(data);
    })
}

const getPlayerStatsByType = (req, res, knex) => {
    console.log(req.params.name);
    knex.select('*').from('players_stats').fullOuterJoin('nhlPlayers', 'players_stats.player_name', '=', 'nhlPlayers.player_name')
        .where('player_name', req.params.name).where('season_type', req.query.type).orderBy('playing_year', 'desc')
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
    getPlayerStats, getPlayerStatsByType
};
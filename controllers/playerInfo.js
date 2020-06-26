// ****************************************************************************************
//                                       VERSION 2
// ****************************************************************************************

const getAllPlayers = (req, res, knex) => {
    knex.select('*').from('players_v2')
        .then(data => {
            if (data.length) {
                const result = {
                    statusCode: 200,
                    message: 'Request Success',
                    result: data
                }
                res.json(result);
            } else {
                res.status(400).json('error getting stats')
            }
        }).catch(err => res.status(400).json('not found'))
}

const getAllPlayersByActive = (req, res, knex) => {
    knex.select('*').from('players_v2').where('isactive', req.query.isactive)
        .then(data => {
            if (data.length) {
                const result = {
                    statusCode: 200,
                    message: 'Request Success',
                    result: data
                }
                res.json(result);
            } else {
                res.status(400).json('error getting stats')
            }
        }).catch(err => res.status(400).json('not found'))
}

const getPlayer = (req, res, knex) => {
    knex.select('*').from('players_v2').where('id', req.params.id)
        .then(data => {
            if (data.length) {
                const result = {
                    statusCode: 200,
                    message: 'Request Success',
                    result: data
                }
                res.json(result);
            } else {
                res.status(400).json('No Player Associated With That Id')
            }
        }).catch(err => res.status(400).json('player not found'))
}

const getPlayerInfo = (req, res, knex) => {
    knex.select(
        'a.*',
        'c.city',
        'c.nickname',
        'c.teamlogo',
        'c.teamcolor',
        'c.teamtextcolor'
        )
        .from('players_v2 as a')
        .leftJoin('players_stats_v2 as b', 'b.player_id', 'a.id')
        .leftJoin('teams_v2 as c', 'c.shortname', 'b.team_name')
        .where('a.id', req.params.id)
        .orderBy('b.playing_year', 'desc')
        .then(data => {
            if (data.length) {
                const result = {
                    statusCode: 200,
                    message: 'Request Success',
                    result: data[0]
                }
                res.json(result);
            } else {
                res.status(400).json('No Player Associated With That Id')
            }
        }).catch(err => res.status(400).json('player not found'))
}

const addPlayer = (req, res, knex) => {

    const playerData = req.body;

    knex('players_v2')
        .insert(playerData)
        .returning('id')
        .then(([id]) => {
            if (id) {
                const result = {
                    statusCode: 200,
                    message: 'Add Player Success',
                    result: id
                }
                res.json(result);
            } else {
                res.status(400).json('Error!'); 
            }
        }).catch(err => res.status(400).json('Add Player Error'))
}

const updatePlayer = (req, res, knex) => {

    const playerData = req.body;

    knex('players_v2').where({id: req.params.id})
        .update(playerData)
        .then(resp => {
            if (resp) {
                const result = {
                    statusCode: 200,
                    message: 'Update Player Success',
                    result: resp
                }
                res.json(result);
            } else {
                res.status(400).json('Error!'); 
            }
        }).catch(err => res.status(400).json('Updating Player Error'))
}

const deletePlayer = (req, res, knex) => {
    knex('players_v2').where({id: req.params.id}).del()
        .then(resp => {
            if (resp) {
                const result = {
                    statusCode: 200,
                    message: 'Delete Player Success',
                    result: resp
                }
                res.json(result)
            } else {
                res.status(400).json('Error!'); 
            }
        }).catch(err => res.status(400).json('Deleting Play Error'))
}


module.exports = {
    getAllPlayers, getPlayer, getAllPlayersByActive, 
    getPlayerInfo,
    addPlayer, updatePlayer, deletePlayer
};
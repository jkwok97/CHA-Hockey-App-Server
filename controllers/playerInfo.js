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

const addPlayer = (req, res, knex) => {
    knex('players_v2').insert({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        nhl_id: req.body.nhl_id,
        isactive: req.body.isactive,
        isgoalie: req.body.isgoalie,
        isdefense: req.body.isdefense,
        isforward: req.body.isforward,
    }).then(resp => {
        if (resp) {
            const result = {
                statusCode: 200,
                message: 'Add Player Success',
                result: resp
            }
            res.json(result);
        } else {
            res.status(400).json('Error!'); 
        }
    }).catch(err => res.status(400).json('Add Player Error'))
}

const updatePlayer = (req, res, knex) => {
    knex('players_v2').where({id: req.params.id})
        .update({
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            nhl_id: req.body.nhl_id,
            isactive: req.body.isactive,
            isgoalie: req.body.isgoalie,
            isdefense: req.body.isdefense,
            isforward: req.body.isforward,
        }).then(resp => {
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
        }).catch(err => {
            console.log(err);
            res.status(400).json('Updating Player Error')
        })
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
    getAllPlayers, getPlayer, getAllPlayersByActive, addPlayer, updatePlayer, deletePlayer
};
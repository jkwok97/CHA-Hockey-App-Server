const getDraftedPlayers = (req, res, knex) => {
    knex.select(
        'a.*',
        'b.firstname',
        'b.lastname',
        'c.city',
        'c.nickname',
        'c.teamlogo',
        )
        .from('drafts_v2 as a')
        .leftJoin('players_v2 as b', 'b.id', 'a.player_id')
        .leftJoin('teams_v2 as c', 'c.id', 'a.team_id')
        .then(data => {
            if (data.length) {
                const result = {
                    statusCode: 200,
                    message: 'Request Success',
                    result: data
                }
                res.json(result);
            } else {
                res.status(400).json('error getting drafted players')
            }
        }).catch(err => res.status(400).json('not found'))
}

const getDraftedPlayersBySeason = (req, res, knex) => {
    knex.select(
        'a.*',
        'b.firstname',
        'b.lastname',
        'c.city',
        'c.nickname',
        'c.teamlogo',
        )
        .from('drafts_v2 as a')
        .leftJoin('players_v2 as b', 'b.id', 'a.player_id')
        .leftJoin('teams_v2 as c', 'c.id', 'a.team_id')
        .where('a.draft_year', req.query.draft_year)
        .then(data => {
            if (data.length) {
                const result = {
                    statusCode: 200,
                    message: 'Request Success',
                    result: data
                }
                res.json(result);
            } else {
                res.status(400).json('error getting drafted players')
            }
        }).catch(err => res.status(400).json('not found'))
}

const getDraftedPlayerById = (req, res, knex) => {
    knex.select(
        'a.*',
        'b.firstname',
        'b.lastname',
        'c.city',
        'c.nickname',
        'c.teamlogo',
        )
        .from('drafts_v2 as a')
        .leftJoin('players_v2 as b', 'b.id', 'a.player_id')
        .leftJoin('teams_v2 as c', 'c.id', 'a.team_id')
        .where('a.id', req.params.id)
        .then(data => {
            if (data.length) {
                const result = {
                    statusCode: 200,
                    message: 'Request Success',
                    result: data[0]
                }
                res.json(result);
            } else {
                res.status(400).json('error getting drafted player')
            }
        }).catch(err => res.status(400).json('not found'))
}

const addDraftedPlayer = (req, res, knex) => {
    const playerData = req.body;

    knex('drafts_v2')
        .insert(playerData)
        .returning('id')
        .then(([id]) => {
            if (id) {
                const result = {
                    statusCode: 200,
                    message: 'Add Drafted Player Success',
                    result: id
                }
                res.json(result);
            } else {
                res.status(400).json('Error!'); 
            }
        }).catch(err => res.status(400).json('Add Drafted Player Error'))
}

const updateDraftedPlayer = (req, res, knex) => {
    const playerData = req.body;

    knex('drafts_v2').where({id: req.params.id})
        .update(playerData)
        .then(resp => {
            if (resp) {
                const result = {
                    statusCode: 200,
                    message: 'Update Drafted Player Success',
                    result: resp
                }
                res.json(result);
            } else {
                res.status(400).json('Error!'); 
            }
        }).catch(err => res.status(400).json('Updating Drafted Player Error'))
}

const deleteDraftedPlayer = (req, res, knex) => {
    knex('drafts_v2').where({id: req.params.id}).del()
    .then(resp => {
        if (resp) {
            const result = {
                statusCode: 200,
                message: 'Delete Drafted Player Success',
                result: resp
            }
            res.json(result)
        } else {
            res.status(400).json('Error!'); 
        }
    }).catch(err => res.status(400).json('Deleting Drafted Player Error'))
}

module.exports = {
    getDraftedPlayers, getDraftedPlayerById, getDraftedPlayersBySeason, addDraftedPlayer, updateDraftedPlayer, deleteDraftedPlayer
};
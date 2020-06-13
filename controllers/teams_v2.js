const getTeams = (req, res, knex) => {
    knex.select(
        'a.*',
        'b.firstname',
        'b.lastname',
        'c.divisionname'
    )
    .from('teams_v2 as a')
    .leftJoin('users_v2 as b', 'b.id', 'a.users_id')
    .leftJoin('divisions_v2 as c', 'c.id', 'a.divisions_id')
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
})
.catch(err => res.status(400).json('not found'))
}

const getTeamsByActive = (req, res, knex) => {
    knex.select('*').from('teams_v2').where('isactive', req.query.isactive)
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
    })
    .catch(err => res.status(400).json('not found'))
}

const getTeamsByUser = (req, res, knex) => {
    knex.select('*').from('teams_v2').where('users_id', req.params.id)
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
    })
    .catch(err => res.status(400).json('not found'))
}

const getTeamById = (req, res, knex) => {
    knex.select('*').from('teams_v2').where('id', req.params.id)
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
    })
    .catch(err => res.status(400).json('not found'))
}

const getTeamLogo = (req, res, knex) => {
    knex.select('teamlogo').from('teams_v2').where('id', req.params.id)
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
    })
    .catch(err => res.status(400).json('not found'))
}

const getUserIdByTeamName = (req, res, knex) => {
    knex.select('users_id').from('teams_v2').where('shortName', req.params.teamName)
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
    })
    .catch(err => res.status(400).json('not found'))
}

const updateTeam = (req, res, knex) => {

    const teamData = req.body;

    knex('teams_v2').where({id: req.params.id})
        .update(teamData)
        .then(resp => {
            if (resp) {
                const result = {
                    statusCode: 200,
                    message: 'Update Team Success',
                    result: resp
                }
                res.json(result);
            } else {
                res.status(400).json('Error!'); 
            }
        }).catch(err => {
            res.status(400).json('Updating Team Error')
        })
}

const addTeam = (req, res, knex) => {

    const teamData = req.body;

    knex('teams_v2').insert(teamData).then( resp => {
        if (resp) {
            const result = {
                statusCode: 200,
                message: 'Add Team Success',
                result: resp
            }
            res.json(result);
        } else {
            res.status(400).json('Error!'); 
        }
    }).catch(err => res.status(400).json('Add Team Error'))
}

const deleteTeam = (req, res, knex) => {
    knex('teams_v2').where({id: req.params.id}).del()
        .then(resp => {
            if (resp) {
                const result = {
                    statusCode: 200,
                    message: 'Delete Team Success',
                    result: resp
                }
                res.json(result)
            } else {
                res.status(400).json('Error!'); 
            }
        }).catch(err => res.status(400).json('Deleting Team Error'))
}

module.exports = { 
    getTeams, getTeamsByActive, getTeamsByUser, getTeamById, getTeamLogo, getUserIdByTeamName,
    updateTeam, addTeam, deleteTeam
}
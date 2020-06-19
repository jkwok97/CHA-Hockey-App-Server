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

const getCurrentTeams = (req, res, knex) => {
    knex.select(
        'c.id',
        'c.city',
        'c.nickname',
        'c.teamlogo',
        'c.teamaltlogo',
        'd.divisionname',
        'e.conferencename'
    )
    .from('teams_v2 as c')
    .leftJoin('divisions_v2 as d', 'd.id', 'c.divisions_id')
    .leftJoin('conferences_v2 as e', 'e.id', 'd.conference_id')
    .where('c.isactive', req.query.isactive)
    .then(data => {
        if (data.length) {

            const northWest = data.filter((team) => team['divisionname'] === 'North West');
            const northEast = data.filter((team) => team['divisionname'] === 'North East');
            const southWest = data.filter((team) => team['divisionname'] === 'South West');
            const southEast = data.filter((team) => team['divisionname'] === 'South East');

            const result = {
                statusCode: 200,
                message: 'Request Success',
                result: [ 
                    {name: 'Eastern', divisions: [
                         { name: 'North East', teams: northEast},
                         { name: 'South East', teams: southEast}]
                    }, 
                    {name: 'Western', divisions: [
                        { name: 'North West', teams: northWest},
                        { name: 'South West', teams: southWest}]
                    },
                ]
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
    knex.select('users_id').from('teams_v2').where('shortname', req.params.teamName)
        .then(data => {
            if (data.length) {
                const result = {
                    statusCode: 200,
                    message: 'Request Success',
                    result: data[0]
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
    getTeams, getCurrentTeams, getTeamsByActive, getTeamsByUser, getTeamById, getTeamLogo, getUserIdByTeamName,
    updateTeam, addTeam, deleteTeam
}
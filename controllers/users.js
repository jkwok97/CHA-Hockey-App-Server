const getUser = (req, res, knex) => {
    knex.select('*').from('users_v2').where('email', req.params.email)
        .then(data => {
            if (data.length) {
                res.json(data);
            } else {
                res.status(400).json('No Profile Associated With That Email')
            }
        }).catch(err => {
            console.log(err);
            res.status(400).json('user not found')
        })
}

const getUserById = (req, res, knex) => {
    knex.select('*').from('users_v2').where('id', req.params.id)
        .then(data => {
            if (data.length) {
                const result = {
                    statusCode: 200,
                    message: 'Request Success',
                    result: data
                }
                res.json(result);
            } else {
                res.status(400).json('No Profile Associated With That Id')
            }
        }).catch(err => res.status(400).json('user not found'))
}

const getUsers = (req, res, knex) => {
    knex.select('*').from('users_v2')
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
    .catch(err => {
        console.log(error);
        res.status(400).json('not found')
    })
}

const addUser = (req, res, knex) => {

    const userData = req.body;

    console.log(userData);

    knex('users_v2')
        .insert(userData)
        .then(resp => {
            if (resp) {
                const result = {
                    statusCode: 200,
                    message: 'Add User Success',
                    result: resp
                }
                res.json(result);
            } else {
                res.status(400).json('Error!'); 
            }
        }).catch(err => res.status(400).json('Add User Error'))
}

const updateUser = (req, res, knex) => {

    const userData = req.body;

    knex('users_v2').where({id: req.params.id})
        .update(userData)
        .then(resp => {
            if (resp) {
                const result = {
                    statusCode: 200,
                    message: 'Update User Success',
                    result: resp
                }
                res.json(result);
            } else {
                res.status(400).json('Error!'); 
            }
        }).catch(err => res.status(400).json('Updating User Error'))
}

const deleteUser = (req, res, knex) => {
    knex('users_v2').where({id: req.params.id}).del()
        .then(resp => {
            if (resp) {
                const result = {
                    statusCode: 200,
                    message: 'Delete User Success',
                    result: resp
                }
                res.json(result)
            } else {
                res.status(400).json('Error!'); 
            }
        }).catch(err => res.status(400).json('Deleting User Error'))
}

module.exports = {
    getUser, getUserById, getUsers, addUser, updateUser, deleteUser
};
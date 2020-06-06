// ****************************************************************************************
//                                       VERSION 2
// ****************************************************************************************

const getUser = (req, res, knex) => {
    knex.select('*').from('users_v2').where('email', req.params.email)
        .then(data => {
            if (data.length) {
                res.json(data);
            } else {
                res.status(400).json('No Profile Associated With That Email')
            }
    })
    .catch(err => res.status(400).json('user not found'))
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
    .catch(err => res.status(400).json('not found'))
}

const addUser = (req, res, knex) => {

}

const updateUser = (req, res, knex) => {
    
}

const deleteUser = (req, res, knex) => {
    
}

module.exports = {
    getUser, getUsers, addUser, updateUser, deleteUser
};
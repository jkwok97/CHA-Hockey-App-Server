const getUser = (req, res, knex) => {
    knex.select('*').from('users').where('email', req.params.email)
        .then(data => {
            if (data.length) {
                res.json(data);
            } else {
                res.status(400).json('error getting user')
            }
    })
    .catch(err => res.status(400).json('user not found'))
}

const getUsers = (req, res, knex) => {
    knex.select('*').from('users')
        .then(data => {
            if (data.length) {
                res.json(data);
            } else {
                res.status(400).json('error getting stats')
            }
    })
    .catch(err => res.status(400).json('not found'))
}

module.exports = {
    getUser, getUsers
};



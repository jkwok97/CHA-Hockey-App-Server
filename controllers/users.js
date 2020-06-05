// const getUser = (req, res, knex) => {
//     knex.select('*').from('users').where('email', req.params.email)
//         .then(data => {
//             if (data.length) {
//                 res.json(data);
//             } else {
//                 res.status(400).json('No Profile Associated With That Email')
//             }
//     })
//     .catch(err => res.status(400).json('user not found'))
// }

// const getUsers = (req, res, knex) => {
//     knex.select('*').from('users')
//         .then(data => {
//             if (data.length) {
//                 res.json(data);
//             } else {
//                 res.status(400).json('error getting stats')
//             }
//     })
//     .catch(err => res.status(400).json('not found'))
// }

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
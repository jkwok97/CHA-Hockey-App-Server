// ****************************************************************************************
//                                       VERSION 2
// ****************************************************************************************

const getAllSalaries = (req, res, knex) => {
    knex.select('*').from('salaries_v2')
        .then(data => {
            if (data.length) {
                const result = {
                    statusCode: 200,
                    message: 'Request Success',
                    result: data
                }
                res.json(result);
            } else {
                res.status(400).json('error getting salary')
            }
        }).catch(err => res.status(400).json('not found'))
}

// 'a.id',
//         'a.player_id',
//         'a.season_2020',
//         'a.season_2021',
//         'a.season_2022',
//         'a.season_2023',
//         'a.season_2024',
//         'a.season_2025',
//         'a.season_2026',
//         'a.season_2027',
//         'a.season_2028',
//         'a.season_2029',
//         'a.season_2030',
//         'a.season_2031',
//         'a.season_2032',
//         'a.season_2033',
//         'a.season_2034',
//         'a.season_2035',
//         'a.season_2036',
//         'a.season_2037',
//         'a.season_2038',
//         'a.season_2039',
//         'a.season_2040',
//         'b.firstname',

const getAllActiveSalaries = (req, res, knex) => {

    knex.select(
        'a.*',
        'b.firstname',
        'b.lastname',
        'b.isactive'
        )
        .from('salaries_v2 as a')
        .leftJoin('players_v2 as b', 'b.id', 'a.player_id')
        .where('b.isactive', req.query.isactive)
        .then(data => {
            if (data.length) {
                const result = {
                    statusCode: 200,
                    message: 'Request Success',
                    result: data
                }
                res.json(result);
            } else {
                res.status(400).json('error getting salary')
            }
        }).catch(err => res.status(400).json('not found'))

}

const getSalary = (req, res, knex) => {
    knex.select('*').from('players_v2')
        .fullOuterJoin('salaries_v2', 'players_v2.id', 'salaries_v2.player_id')
        .where('salaries_v2.id', req.params.id)
        .then(data => {
            if (data.length) {
                const result = {
                    statusCode: 200,
                    message: 'Request Success',
                    result: data
                }
                res.json(result);
            } else {
                res.status(400).json('No Salary Associated With That Id')
            }
        }).catch(err => res.status(400).json('salary not found'))
}

const addSalary = (req, res, knex) => {
    knex('salaries_v2').insert({
        player_id: req.body.player_id,
        season_2020: req.body.season_2020,
        season_2021: req.body.season_2021,
        season_2022: req.body.season_2022,
        season_2023: req.body.season_2023,
        season_2024: req.body.season_2024,
        season_2025: req.body.season_2025,
        season_2026: req.body.season_2026,
        season_2027: req.body.season_2027,
        season_2028: req.body.season_2028,
        season_2029: req.body.season_2029,
        season_2030: req.body.season_2030,
        season_2031: req.body.season_2031,
        season_2032: req.body.season_2032,
        season_2033: req.body.season_2033,
        season_2034: req.body.season_2034,
        season_2035: req.body.season_2035,
        season_2036: req.body.season_2036,
        season_2037: req.body.season_2037,
        season_2038: req.body.season_2038,
        season_2039: req.body.season_2039,
        season_2040: req.body.season_2040
    }).returning('id').then(([id]) => {
        if (id) {
            const result = {
                statusCode: 200,
                message: 'Add Salary Success',
                result: id
            }
            res.json(result);
        } else {
            res.status(400).json('Error!'); 
        }
    }).catch(err => res.status(400).json('Add Player Error'))
}

const updateSalary = (req, res, knex) => {
    knex('salaries_v2').where({id: req.params.id})
        .update({
            player_id: req.body.player_id,
            season_2020: req.body.season_2020,
            season_2021: req.body.season_2021,
            season_2022: req.body.season_2022,
            season_2023: req.body.season_2023,
            season_2024: req.body.season_2024,
            season_2025: req.body.season_2025,
            season_2026: req.body.season_2026,
            season_2027: req.body.season_2027,
            season_2028: req.body.season_2028,
            season_2029: req.body.season_2029,
            season_2030: req.body.season_2030,
            season_2031: req.body.season_2031,
            season_2032: req.body.season_2032,
            season_2033: req.body.season_2033,
            season_2034: req.body.season_2034,
            season_2035: req.body.season_2035,
            season_2036: req.body.season_2036,
            season_2037: req.body.season_2037,
            season_2038: req.body.season_2038,
            season_2039: req.body.season_2039,
            season_2040: req.body.season_2040
        }).then(resp => {
            if (resp) {
                const result = {
                    statusCode: 200,
                    message: 'Update Salary Success',
                    result: resp
                }
                res.json(result);
            } else {
                res.status(400).json('Error!'); 
            }
        }).catch(err => {
            console.log(err);
            res.status(400).json('Updating Salary Error')
        })
}


module.exports = {
    getAllSalaries, getAllActiveSalaries, getSalary, addSalary, updateSalary
};
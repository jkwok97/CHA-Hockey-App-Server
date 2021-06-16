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

const getAllActiveSalaries = (req, res, knex) => {
    return knex.select(
        'a.*',
        'b.firstname',
        'b.lastname',
        'b.isactive',
        'b.isgoalie',
        'b.isforward',
        'b.isdefense',
        )
        .from('salaries_v2 as a')
        .leftJoin('players_v2 as b', 'b.id', 'a.player_id')
        .where('b.isactive', req.query.isactive)
        .then(players => {
            if (players.length) {

                const result = {
                    statusCode: 200,
                    message: 'Request Success',
                    result: players
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

const getPlayerSalaryByTeamId = (req, res, knex) => {
    console.log(req.query.is_protected);
    knex.select(
        'a.*',
        'b.firstname',
        'b.lastname',
        'b.isforward',
        'b.isdefense',
        'b.isgoalie',
        'b.isactive',
        'b.is_protected',
        'c.position'
        )
        .from('salaries_v2 as a')
        .leftJoin('players_v2 as b', 'b.id', 'a.player_id')
        .leftJoin('players_stats_v2 as c', 'c.player_id', 'b.id')
        .leftJoin('teams_v2 as d', 'd.shortname', 'c.team_name')
        .where('d.id', req.params.id)
        .where('c.playing_year', req.query.playing_year)
        .where('c.season_type', 'Regular')
        .where('b.is_protected', req.query.is_protected)
        .then(data => {
            if (data.length) {

                const forwards = data.filter((player) => player['isforward'] === true);
                const defense = data.filter((player) => player['isdefense'] === true);

                const result = {
                    statusCode: 200,
                    message: 'Request Success',
                    result: {
                        forwards: {players: forwards},
                        defense: {players: defense}
                    }
                }
                res.json(result);
            } else {
                res.status(200).json('error getting salary')
            }
        }).catch(err => res.status(200).json('not found'))
}

const getGoalieSalaryByTeamId = (req, res, knex) => {
    console.log(req.query.is_protected);
    knex.select(
        'a.*',
        'b.firstname',
        'b.lastname',
        'b.isforward',
        'b.isdefense',
        'b.isgoalie',
        'b.isactive',
        'b.is_protected',
        )
        .from('salaries_v2 as a')
        .leftJoin('players_v2 as b', 'b.id', 'a.player_id')
        .leftJoin('goalies_stats_v2 as c', 'c.player_id', 'b.id')
        .leftJoin('teams_v2 as d', 'd.shortname', 'c.team_name')
        .where('d.id', req.params.id)
        .where('c.playing_year', req.query.playing_year)
        .where('c.season_type', 'Regular')
        .where('b.is_protected', req.query.is_protected)
        .then(data => {
            if (data.length) {

                const goalies = data;

                const result = {
                    statusCode: 200,
                    message: 'Request Success',
                    result: goalies
                }

                res.json(result);
            } else {
                res.status(200).json('error getting salary')
            }
        }).catch(err => res.status(200).json('not found'))
}

const addSalary = (req, res, knex) => {

    const salaryData = req.body;

    knex('salaries_v2')
        .insert(salaryData)
        .returning('id')
        .then(([id]) => {
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

    const salaryData = req.body;

    knex('salaries_v2').where({id: req.params.id})
        .update(salaryData)
        .then(resp => {
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

const getPlayerSalariesByPlayerId = (req, res, knex) => {
    knex.select(
        'a.*'
        )
        .from('salaries_v2 as a')
        .leftJoin('players_v2 as b', 'b.id', 'a.player_id')
        .leftJoin('players_stats_v2 as c', 'c.player_id', 'b.id')
        .where('b.id', req.params.id)
        .orderBy('c.playing_year', 'desc')
        .then(data => {
            if (data.length) {

                const result = {
                    statusCode: 200,
                    message: 'Request Success',
                    result: data[0]
                }

                res.json(result);
            } else {
                res.status(400).json('error getting salary')
            }
        }).catch(err => res.status(400).json('not found'))
}

const getGoalieSalariesByPlayerId = (req, res, knex) => {
    knex.select(
        'a.*'
        )
        .from('salaries_v2 as a')
        .leftJoin('players_v2 as b', 'b.id', 'a.player_id')
        .leftJoin('goalies_stats_v2 as c', 'c.player_id', 'b.id')
        .where('b.id', req.params.id)
        .orderBy('c.playing_year', 'desc')
        .then(data => {
            if (data.length) {

                const result = {
                    statusCode: 200,
                    message: 'Request Success',
                    result: data[0]
                }

                res.json(result);
            } else {
                res.status(400).json('error getting salary')
            }
        }).catch(err => res.status(400).json('not found'))
}


module.exports = {
    getAllSalaries, getAllActiveSalaries, getSalary,
    getPlayerSalaryByTeamId, getGoalieSalaryByTeamId,
    getPlayerSalariesByPlayerId, getGoalieSalariesByPlayerId,
    addSalary, updateSalary
};
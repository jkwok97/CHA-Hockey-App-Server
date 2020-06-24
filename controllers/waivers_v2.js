const getAllTeams = (req, res, knex) => {
    knex.select('*').from('waivers_v2')
        .then(data => {
            if (data.length) {
                res.json(data);
            } else {
                res.status(400).json('error getting stats')
            }
    })
    .catch(err => res.status(400).json('not found'))
}

const updateAllTeams = (req, res, knex) => {
    knex('waivers_v2').where({id: req.params.id}).update({priority_number: req.body.number})
    .then(resp => {
        if (resp) {
            res.json("Success!")
        } else {
            res.status(400).json("Error Updating Name")
        }
    })
    .catch(err => {
        console.log(err);
        res.status(400).json("Server Error!");
    });
}

module.exports = {
    getAllTeams, updateAllTeams
};
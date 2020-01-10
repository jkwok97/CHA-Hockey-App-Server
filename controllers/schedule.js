const getNextDays = (req, res, knex) => {
    knex.select('*').from('schedule').where({game_day: req.query.day})
        .then(data => {
            if (data.length) {
                res.json(data);
            } else {
                res.status(400).json('error getting stats')
            }
    })
    .catch(err => res.status(400).json('not found'))
}

const getWholeSchedule = (req, res, knex) => {
    knex.select('*').from('schedule')
        .then(data => {
            if (data.length) {
                res.json(data);
            } else {
                res.status(400).json('error getting stats')
            }
    })
    .catch(err => res.status(400).json('not found'))
}

const updateVisTeamScore = (req, res, knex) => {
    knex('schedule').where({id: req.params.id}).update({vis_team_score: req.body.vis_team_score})
    .then(resp => {
        if (resp) {
            res.json("Success!")
        } else {
            res.status(400).json("Error Updating Score")
        }
    })
    .catch(err => {
        console.log(err);
        res.status(400).json("Server Error!");
    });
}

const updateHomeTeamScore = (req, res, knex) => {
    knex('schedule').where({id: req.params.id}).update({home_team_score: req.body.home_team_score})
    .then(resp => {
        if (resp) {
            res.json("Success!")
        } else {
            res.status(400).json("Error Updating Score")
        }
    })
    .catch(err => {
        console.log(err);
        res.status(400).json("Server Error!");
    });
}

module.exports = {
    getNextDays, getWholeSchedule, updateVisTeamScore, updateHomeTeamScore
};
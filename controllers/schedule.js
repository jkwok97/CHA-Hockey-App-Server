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

module.exports = {
    getNextDays, getWholeSchedule
};
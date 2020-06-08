const getDivisions = (req, res, knex) => {
    knex.select('*').from('divisions_v2')
        .where('isactive', true)
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

module.exports = { 
    getDivisions
}
const handleChampionsGet = (req, res, knex) => {
    console.log(req.query.type);
    knex.select('*').from('champions').where('award_type', req.query.type)
        .then(champions => {
            if (champions.length) {
                res.json(champions);
            } else {
                res.status(400).json('error getting champion')
            }
    })
    .catch(err => res.status(400).json('not found'))
}

module.exports = {
    handleChampionsGet
};



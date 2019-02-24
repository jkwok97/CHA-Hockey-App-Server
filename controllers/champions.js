const handleChampionsGet = (req, res, knex) => {
    knex.select('*').from('champions')
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



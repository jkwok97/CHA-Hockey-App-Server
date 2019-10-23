const handlePlayersStats2020Get = (req, res, knex) => {
    knex.select('*').from('players2020')
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
    handlePlayersStats2020Get
};
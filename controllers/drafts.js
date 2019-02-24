const handleDraftsGet = (req, res, knex) => {
    knex.select('*').from('drafts')
        .then(data => {
            if (data.length) {
                res.json(data);
            } else {
                res.status(400).json('error getting draft')
            }
    })
    .catch(err => res.status(400).json('not found'))
}

module.exports = {
    handleDraftsGet
};
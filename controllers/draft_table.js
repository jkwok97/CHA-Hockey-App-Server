const getDraftTableByYear = (req, res, knex) => {
    knex.select(
        'a.*',
        'b.shortname',
        'b.city',
        'b.nickname',
        'b.teamlogo'
        )
        .from('draft_order_v2 as a')
        .leftJoin('teams_v2 as b', 'b.id', 'a.team_id')
        .where('a.draft_year', req.query.draft_year)
        .then(data => {
            if (data.length) {
                const result = {
                    statusCode: 200,
                    message: 'Request Success',
                    result: data
                }
                res.json(result);
            } else {
                res.status(400).json('error getting goalie stat')
            }
        }).catch(err => res.status(400).json('not found'))
}

const getDraftTableById = (req, res, knex) => {
    knex.select(
        'a.*',
        'b.shortname',
        'b.city',
        'b.nickname',
        'b.teamlogo'
        )
        .from('draft_order_v2 as a')
        .leftJoin('teams_v2 as b', 'b.id', 'a.team_id')
        .where('a.id', req.params.id)
        .then(data => {
            if (data.length) {
                const result = {
                    statusCode: 200,
                    message: 'Request Success',
                    result: data
                }
                res.json(result);
            } else {
                res.status(400).json('error getting goalie stat')
            }
        }).catch(err => res.status(400).json('not found'))
}

const updateDraftTableById = (req, res, knex) => {

}

module.exports = {
    getDraftTableByYear, getDraftTableById, updateDraftTableById
};
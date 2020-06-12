const getStatsBySeasonTypeByUser = (req, res, knex) => {
    knex.select(
        'a.*',
        'c.city',
        'c.nickname',
        'c.teamlogo'
        )
        .from('team_stats_v2 as a')
        .leftJoin('teams_v2 as c', 'c.id', 'a.team_id')
        .where('c.users_id', req.params.userId)
        .where('a.season_type', req.query.season_type)
        .orderBy('a.points', 'asc')
        .then(data => {
            if (data.length) {
                const result = {
                    statusCode: 200,
                    message: 'Request Success',
                    result: data
                }
                res.json(result);
            } else {
                res.status(400).json('error getting team stat')
            }
        }).catch(err => {
            console.log(err);
            res.status(400).json('not found')})
}

module.exports = {
    getStatsBySeasonTypeByUser
};
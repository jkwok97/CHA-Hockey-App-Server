const getChampions = (req, res, knex) => {
    knex.select(
        'a.id',
        'a.cha_season',
        'b.display_name',
        'c.city',
        'c.nickname',
        'c.teamlogo',
        'd.firstname',
        'd.lastname'
    )
    .from('awards_v2 as a')
    .leftJoin('award_type_v2 as b', 'b.id', 'a.award_type')
    .leftJoin('teams_v2 as c', 'c.id', 'a.team_id')
    .leftJoin('users_v2 as d', 'd.id', 'a.users_id')
    .where('b.award_type', 'champ')
    .orderBy('cha_season', 'desc')
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

const getScorers = (req, res, knex) => {

}

const getDefense = (req, res, knex) => {

}

const getRookies = (req, res, knex) => {

}

const getGoalies = (req, res, knex) => {

}

const getGm = (req, res, knex) => {

}

const getSeason = (req, res, knex) => {

}



module.exports = {
    getChampions, getScorers, getDefense, getRookies, getGoalies, getGm, getSeason
};
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

const getStatsBySeasonByType = (req, res, knex) => {
    knex.select(
        'a.*',
        'c.city',
        'c.nickname',
        'c.teamlogo',
        'd.divisionname',
        'e.conferencename'
        )
        .from('team_stats_v2 as a')
        .leftJoin('teams_v2 as c', 'c.id', 'a.team_id')
        .leftJoin('divisions_v2 as d', 'd.id', 'c.divisions_id')
        .leftJoin('conferences_v2 as e', 'e.id', 'd.conference_id')
        .where('a.playing_year', req.query.playing_year)
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

const getStatsBySeasonByTypeByConference = (req, res, knex) => {
    knex.select(
        'a.*',
        'c.city',
        'c.nickname',
        'c.teamlogo',
        'd.divisionname',
        'e.conferencename'
        )
        .from('team_stats_v2 as a')
        .leftJoin('teams_v2 as c', 'c.id', 'a.team_id')
        .leftJoin('divisions_v2 as d', 'd.id', 'c.divisions_id')
        .leftJoin('conferences_v2 as e', 'e.id', 'd.conference_id')
        .where('a.playing_year', req.query.playing_year)
        .where('a.season_type', req.query.season_type)
        .orderBy('a.points', 'asc')
        .then(data => {
            if (data.length) {

                const eastern = data.filter((team) => team['conferencename'] === 'Eastern');
                const western = data.filter((team) => team['conferencename'] === 'Western');

                const result = {
                    statusCode: 200,
                    message: 'Request Success',
                    result: [ 
                        {name: 'Eastern', teams: eastern}, 
                        {name: 'Western', teams: western},
                    ]
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
    getStatsBySeasonTypeByUser, getStatsBySeasonByType,
    getStatsBySeasonByTypeByConference
};
const getPlayerRatings = (req, res, knex) => {
    knex.select(
        'a.*',
        'b.firstname',
        'b.lastname',
        'b.isgoalie',
        'b.nhl_id'
        )
        .from('player_ratings_v2 as a')
        .leftJoin('players_v2 as b', 'b.id', 'a.player_id')
        .where('a.player_id', req.params.id)
        .where('a.playing_year', req.query.playing_year)
        .then(data => {
            if (data.length) {
                const result = {
                    statusCode: 200,
                    message: 'Request Success',
                    result: data[0]
                }
                res.json(result);
            } else {
                res.status(400).json('error getting player stat')
            }
        }).catch(err => {
            console.log(err)
            res.status(400).json('not found')})
}

const getTeamPlayerRatings = (req, res, knex) => {
    knex.select(
        'a.*',
        'c.firstname',
        'c.lastname',
        'c.isgoalie',
        'c.nhl_id'
        )
        .from('player_ratings_v2 as a')
        .leftJoin('teams_v2 as b', 'b.id', req.params.teamId)
        .leftJoin('players_v2 as c', 'c.id', 'c.player_id')
        .where('a.playing_year', req.query.playing_year)
        .where('b.id', req.params.teamId)
        .then(data => {
            if (data.length) {
                console.log(data);
                const result = {
                    statusCode: 200,
                    message: 'Request Success',
                    result: data
                }
                res.json(result);
            } else {
                res.status(400).json('error getting player stat')
            }
        }).catch(err => {
            console.log(err)
            res.status(400).json('not found')})
}

const getGoalieRatings = (req, res, knex) => {
    knex.select(
        'a.*',
        'b.firstname',
        'b.lastname',
        'b.isgoalie',
        'b.nhl_id'
        )
        .from('goalie_ratings_v2 as a')
        .leftJoin('players_v2 as b', 'b.id', 'a.player_id')
        .where('a.player_id', req.params.id)
        .where('a.playing_year', req.query.playing_year)
        .then(data => {
            if (data.length) {
                const result = {
                    statusCode: 200,
                    message: 'Request Success',
                    result: data[0]
                }
                res.json(result);
            } else {
                res.status(400).json('error getting player stat')
            }
        }).catch(err => res.status(400).json('not found'))
}

const getTeamGoalieRatings = (req, res, knex) => {

}

const getAllPlayerRatings = (req, res, knex) => {
    knex.select(
        'a.*',
        'b.firstname',
        'b.lastname',
        'b.isgoalie',
        'b.nhl_id'
        )
        .from('player_ratings_v2 as a')
        .leftJoin('players_v2 as b', 'b.id', 'a.player_id')
        .where('a.playing_year', req.query.playing_year)
        .then(data => {
            if (data.length) {
                const result = {
                    statusCode: 200,
                    message: 'Request Success',
                    result: data
                }
                res.json(result);
            } else {
                res.status(400).json('error getting player stat')
            }
        }).catch(err => {
            console.log(err)
            res.status(400).json('not found')})
}

const getAllGoalieRatings = (req, res, knex) => {
    knex.select(
        'a.*',
        'b.firstname',
        'b.lastname',
        'b.isgoalie',
        'b.nhl_id'
        )
        .from('goalie_ratings_v2 as a')
        .leftJoin('players_v2 as b', 'b.id', 'a.player_id')
        .where('a.playing_year', req.query.playing_year)
        .then(data => {
            if (data.length) {
                const result = {
                    statusCode: 200,
                    message: 'Request Success',
                    result: data
                }
                res.json(result);
            } else {
                res.status(400).json('error getting player stat')
            }
        }).catch(err => res.status(400).json('not found'))
}

module.exports = {
    getPlayerRatings, getGoalieRatings, getAllPlayerRatings, getAllGoalieRatings,
    getTeamPlayerRatings, getTeamGoalieRatings
};
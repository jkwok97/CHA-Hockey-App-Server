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

const getTeamGoalieRatings = (req, res, knex) => {
    knex.select(
        'a.*',
        'b.firstname',
        'b.lastname',
        'b.isgoalie',
        'b.nhl_id',
        'd.shortname'
        )
        .from('goalie_ratings_v2 as a')
        .leftJoin('players_v2 as b', 'b.id', 'a.player_id')
        .leftJoin('goalies_stats_v2 as c', 'c.player_id', 'a.player_id')
        .leftJoin('teams_v2 as d', 'd.shortname', 'c.team_name')
        .where('c.playing_year', req.query.playing_year)
        .where('a.playing_year', req.query.playing_year)
        .where('d.shortname', req.params.team)
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

const getTeamPlayerRatings = (req, res, knex) => {
    knex.select(
        'a.*',
        'b.firstname',
        'b.lastname',
        'b.isgoalie',
        'b.nhl_id',
        'd.shortname'
        )
        .from('player_ratings_v2 as a')
        .leftJoin('players_v2 as b', 'b.id', 'a.player_id')
        .leftJoin('players_stats_v2 as c', 'c.player_id', 'a.player_id')
        .leftJoin('teams_v2 as d', 'd.shortname', 'c.team_name')
        .where('c.playing_year', req.query.playing_year)
        .where('a.playing_year', req.query.playing_year)
        .where('d.shortname', req.params.team)
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

const getAllPlayerRatings = (req, res, knex) => {
    knex.select(
        'a.*',
        'b.firstname',
        'b.lastname',
        'b.isgoalie',
        'b.nhl_id',
        'c.team_name',
        'd.teamlogo',
        'd.city',
        'd.nickname'
        )
        .from('player_ratings_v2 as a')
        .leftJoin('players_v2 as b', 'b.id', 'a.player_id')
        .leftJoin('players_stats_v2 as c', 'c.player_id', 'a.player_id')
        .leftJoin('teams_v2 as d', 'd.shortname', 'c.team_name')
        .where('c.playing_year', req.query.playing_year)
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
                res.status(400).json('error getting players ratings')
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
        'b.nhl_id',
        'c.team_name',
        'd.teamlogo',
        'd.city',
        'd.nickname'
        )
        .from('goalie_ratings_v2 as a')
        .leftJoin('players_v2 as b', 'b.id', 'a.player_id')
        .leftJoin('goalies_stats_v2 as c', 'c.player_id', 'a.player_id')
        .leftJoin('teams_v2 as d', 'd.shortname', 'c.team_name')
        .where('c.playing_year', req.query.playing_year)
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
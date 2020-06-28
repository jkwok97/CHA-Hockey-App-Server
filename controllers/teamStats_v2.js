const getStatsBySeasonTypeByUser = (req, res, knex) => {
    knex.select(
        'a.*',
        'c.city',
        'c.nickname',
        'c.teamlogo',
        'c.shortname',
        'c.isactive'
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

const getTeamStatsByTeamIdBySeasonbyType = (req, res, knex) => {
    knex.select(
        'a.*',
        'c.city',
        'c.nickname',
        'c.teamlogo',
        'c.shortname',
        'c.isactive'
        )
        .from('team_stats_v2 as a')
        .leftJoin('teams_v2 as c', 'c.id', 'a.team_id')
        .where('a.team_id', req.params.id)
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
        }).catch(err => {res.status(400).json('not found')})
}

const getStatsBySeasonByType = (req, res, knex) => {
    knex.select(
        'a.*',
        'c.city',
        'c.nickname',
        'c.teamlogo',
        'c.shortname',
        'd.divisionname',
        'e.conferencename',
        'c.isactive'
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
        }).catch(err => {res.status(400).json('not found')})
}

const getStatsbyType = (req, res, knex) => {
    knex.select(
        'a.*',
        'c.city',
        'c.nickname',
        'c.teamlogo',
        'c.shortname',
        'd.divisionname',
        'e.conferencename',
        'c.isactive'
        )
        .from('team_stats_v2 as a')
        .leftJoin('teams_v2 as c', 'c.id', 'a.team_id')
        .leftJoin('divisions_v2 as d', 'd.id', 'c.divisions_id')
        .leftJoin('conferences_v2 as e', 'e.id', 'd.conference_id')
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
        }).catch(err => {res.status(400).json('not found')})
}

const getStatsByTypeSummed = (req, res, knex) => {
    knex.raw(`
        select
        a.team_id as team_id,
        a.season_type as season_type, 
        c.city as city, 
        c.nickname as nickname,
        c.shortname,
        c.teamlogo,
        c.isactive,
        sum(games_played) as games_played, 
        sum(wins) as wins, 
        sum(loss) as loss, 
        sum(ties) as ties, 
        sum(points) as points, 
        sum(goals_for) as goals_for, 
        sum(goals_against) as goals_against, 
        sum(pp_attempts) as pp_attempts, 
        sum(pp_goals) as pp_goals, 
        sum(pk_attempts) as pk_attempts, 
        sum(pk_goals) as pk_goals, 
        sum(sh_goals) as sh_goals, 
        sum(penalty_minutes) as penalty_minutes, 
        sum(shots_for) as shots_for, 
        sum(shots_against) as shots_against, 
        sum(shut_outs) as shut_outs
        from
        team_stats_v2 as a
        left join teams_v2 as c
        on c.id = a.team_id
        where a.season_type = '${req.query.season_type}'
        group by a.team_id, a.season_type, c.city, c.nickname, c.shortname, c.teamlogo, c.isactive
    ;`)
    .then(data => {
        if (data.rows.length) {
            const result = {
                statusCode: 200,
                message: 'Request Success',
                result: data.rows
            }
            res.json(result);
        } else {
            res.status(400).json('error getting player stat')
        }
    }).catch(err => {
        console.log(err)
        res.status(400).json('not found')
    })
}

const getStatsBySeasonByTypeByConference = (req, res, knex) => {
    knex.select(
        'a.*',
        'c.city',
        'c.nickname',
        'c.teamlogo',
        'c.shortname',
        'd.divisionname',
        'e.conferencename',
        'c.isactive'
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
        }).catch(err => res.status(400).json('not found'))
}

const getStatsBySeasonByTypeByDivision = (req, res, knex) => {
    knex.select(
        'a.*',
        'c.city',
        'c.nickname',
        'c.teamlogo',
        'c.shortname',
        'd.divisionname',
        'c.isactive'
        )
        .from('team_stats_v2 as a')
        .leftJoin('teams_v2 as c', 'c.id', 'a.team_id')
        .leftJoin('divisions_v2 as d', 'd.id', 'c.divisions_id')
        .where('a.playing_year', req.query.playing_year)
        .where('a.season_type', req.query.season_type)
        .orderBy('a.points', 'asc')
        .then(data => {
            if (data.length) {

                const northWest = data.filter((team) => team['divisionname'] === 'North West');
                const northEast = data.filter((team) => team['divisionname'] === 'North East');
                const southWest = data.filter((team) => team['divisionname'] === 'South West');
                const southEast = data.filter((team) => team['divisionname'] === 'South East');

                const result = {
                    statusCode: 200,
                    message: 'Request Success',
                    result: [ 
                        {name: 'North West', teams: northWest}, 
                        {name: 'North East', teams: northEast},
                        {name: 'South West', teams: southWest}, 
                        {name: 'South East', teams: southEast},
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

const getStatsForSchedule = (req, res, knex) => {
    knex.select(
        'a.id',
        'a.wins',
        'a.loss',
        'a.ties'
        )
        .from('team_stats_v2 as a')
        .where('a.playing_year', req.query.playing_year)
        .where('a.season_type', 'Regular')
        .where('a.team_id', req.params.id)
        .then(data => {
            if (data.length) {

                const result = {
                    statusCode: 200,
                    message: 'Request Success',
                    result: data[0]
                }

                res.json(result);
            } else {
                res.status(400).json('error getting team stat')
            }
        }).catch(err => res.status(400).json('not found'))
}

module.exports = {
    getStatsBySeasonTypeByUser, getStatsBySeasonByType, getTeamStatsByTeamIdBySeasonbyType,
    getStatsByTypeSummed, getStatsbyType,
    getStatsBySeasonByTypeByConference, getStatsBySeasonByTypeByDivision,
    getStatsForSchedule
};
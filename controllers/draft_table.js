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
                res.status(400).json('error getting pick stat')
            }
        }).catch(err => res.status(400).json('not found'))
}

const getDraftTableByYearByStandings = (req, res, knex) => {
    knex.select(
        'a.*',
        'b.shortname',
        'b.city',
        'b.nickname',
        'b.teamlogo',
        'c.points',
        'c.goals_for',
        'c.goals_against',
        'c.wins'
        )
        .from('draft_order_v2 as a')
        .leftJoin('teams_v2 as b', 'b.id', 'a.team_id')
        .leftJoin('team_stats_v2 as c', 'c.team_id', 'b.id')
        .where('a.draft_year', req.query.draft_year)
        .where('c.playing_year', req.query.playing_year)
        .where('c.season_type', req.query.season_type)
        .orderBy('c.points', 'asc')
        .then(data => {
            if (data.length) {

                const draftByStandings = getDraftByStandings(data);

                const result = {
                    statusCode: 200,
                    message: 'Request Success',
                    result: draftByStandings
                }
                res.json(result);
            } else {
                res.status(400).json('error getting draft picks by standings')
            }
        }).catch(err => {
            console.log(err);
            res.status(400).json('not found')})
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
                    result: data[0]
                }
                res.json(result);
            } else {
                res.status(400).json('error getting pick stat')
            }
        }).catch(err => res.status(400).json('not found'))
}

const getDraftPicksByTeam = (req, res, knex) => {

    knex.select(
        'a.*',
        'b.shortname',
        'b.city',
        'b.nickname',
        'b.teamlogo'
        )
        .from('draft_order_v2 as a')
        .leftJoin('teams_v2 as b', 'b.id', 'a.team_id')
        .whereRaw(`? in (a.team_id, a.round_one, a.round_two, a.round_three, a.round_four, a.round_five)`, [req.params.id])
        .andWhere(builder => {
            builder.where('a.draft_year', req.query.currentSeason).orWhere('a.draft_year', req.query.nextSeason)
        })
        .then(data => {
            if (data.length) {
                const result = {
                    statusCode: 200,
                    message: 'Request Success',
                    result: data
                }
                res.json(result);
            } else {
                res.status(400).json('error getting pick stat')
            }
        }).catch(err => {
            console.log(err)
            res.status(400).json('not found')}
        )
}

const updateDraftTableById = (req, res, knex) => {
    const tableData = req.body;

    knex('draft_order_v2').where({id: req.params.id})
        .update(tableData)
        .then(resp => {
            if (resp) {
                const result = {
                    statusCode: 200,
                    message: 'Update Draft Table Success',
                    result: resp
                }
                res.json(result);
            } else {
                res.status(400).json('Error!'); 
            }
        }).catch(err => res.status(400).json('Updating Draft Table Error'))
}

const getDraftByStandings = (data) => {
    return data.sort((a,b) => {
        if (b.points === a.points) {
            if (b.wins === a.wins) {
                if ((b.goals_for-b.goals_against) === (a.goals_for-a.goals_against)) {
                    return b.goals_for - a.goals_for;
                } else {
                    return (b.goals_for - b.goals_against) - (a.goals_for - a.goals_against)
                }
            } else {
                return b.wins - a.wins
            }
        } else {
            return b.points - a.points;
        }
    }).reverse();
}

module.exports = {
    getDraftTableByYear, getDraftTableById, getDraftPicksByTeam, getDraftTableByYearByStandings,
    updateDraftTableById
};
const getAllSeasonGames = (req, res, knex) => {
    knex.select(
        'a.*',
        'b.city as visteamcity',
        'b.nickname as visteamnickname',
        'b.teamlogo as visteamteamlogo',
        'b.teamcolor as visteamteamcolor',
        'b.teamtextcolor as visteamteamtextcolor',
        'c.city as hometeamcity',
        'c.nickname as hometeamnickname',
        'c.teamlogo as hometeamteamlogo',
        'c.teamcolor as hometeamteamcolor',
        'c.teamtextcolor as hometeamteamtextcolor',
        )
        .from('schedule_v2 as a')
        .leftJoin('teams_v2 as b', 'b.id', 'a.vis_team_id')
        .leftJoin('teams_v2 as c', 'c.id', 'a.home_team_id')
        .where('a.playing_year', req.query.playing_year)
        .orderBy('a.game_day', 'asc')
        .then(data => {
            if (data.length) {
                const result = {
                    statusCode: 200,
                    message: 'Request Success',
                    result: data
                }
                res.json(result);
            } else {
                res.status(400).json('error getting season games')
            }
        }).catch(err => {
            console.log(error);
            res.status(400).json('season games not found')
        })
}

const getGamesForDays = (req, res, knex) => {

    knex.select(
        'a.*',
        'b.city as visteamcity',
        'b.nickname as visteamnickname',
        'b.teamlogo as visteamteamlogo',
        'b.teamcolor as visteamteamcolor',
        'b.teamtextcolor as visteamteamtextcolor',
        'c.city as hometeamcity',
        'c.nickname as hometeamnickname',
        'c.teamlogo as hometeamteamlogo',
        'c.teamcolor as hometeamteamcolor',
        'c.teamtextcolor as hometeamteamtextcolor'
        )
        .from('schedule_v2 as a')
        .leftJoin('teams_v2 as b', 'b.id', 'a.vis_team_id')
        .leftJoin('teams_v2 as c', 'c.id', 'a.home_team_id')
        .where('a.playing_year', req.query.playing_year)
        .whereBetween('a.game_day', [req.query.start_range, req.query.end_range])
        .then(data => {
            if (data.length) {

                const matches = data.map((game) => ({
                    game_day: game.game_day,
                    id: game.id,
                    playing_year: game.playing_year,
                    home_team: {
                        game: game.home_team_game_number,
                        team_id: game.home_team_id,
                        score: game.home_team_score,
                        city: game.hometeamcity,
                        nickname: game.hometeamnickname,
                        teamcolor: game.hometeamteamcolor,
                        teamlogo: game.hometeamteamlogo,
                        textcolor: game.hometeamteamtextcolor,
                        vs_team: game.vis_team_id,
                        vs_team_name: game.visteamnickname
                    },
                    vis_team: {
                        game: game.vis_team_game_number,
                        team_id: game.vis_team_id,
                        score: game.vis_team_score,
                        city: game.visteamcity,
                        nickname: game.visteamnickname,
                        teamcolor: game.visteamteamcolor,
                        teamlogo: game.visteamteamlogo,
                        textcolor: game.visteamteamtextcolor,
                        vs_team: game.home_team_id,
                        vs_team_name: game.hometeamnickname
                    }
                }));

                const result = {
                    statusCode: 200,
                    message: 'Request Success',
                    result: matches
                }
                res.json(result);
            } else {
                res.status(400).json('error getting day games')
            }
        }).catch(err => {
            console.log(error);
            res.status(400).json('day games not found')
        })
}

const getLastFiveRecordForTeam = (req, res, knex) => {
    knex.select(
        'a.*',
        )
        .from('schedule_v2 as a')
        .where(function() {
            this.where('a.vis_team_id', req.params.id)
            .orWhere('a.home_team_id', req.params.id)
        })
        .where('a.playing_year', req.query.playing_year)
        .whereNotNull('a.vis_team_score')
        .orderBy('a.game_day', 'desc')
        .limit(5)
        .then(data => {
            if (data.length) {

                const result = {
                    statusCode: 200,
                    message: 'Request Success',
                    result: data
                };

                res.json(result);
            } else {
                res.status(400).json('error getting season games')
            }
        }).catch(err => {
            console.log(error);
            res.status(400).json('season games not found')
        })
}

const getMatchupRecord = (req, res, knex) => {
    knex.select(
        'a.*',
        )
        .from('schedule_v2 as a')
        .where(function() {
            this.where('a.vis_team_id', req.query.team_one_id)
            .andWhere('a.home_team_id', req.query.team_two_id)
            .andWhere('a.playing_year', req.query.playing_year)
        })
        .orWhere(function() {
            this.where('a.vis_team_id', req.query.team_two_id)
            .andWhere('a.home_team_id', req.query.team_one_id)
            .andWhere('a.playing_year', req.query.playing_year)
        })
        .whereNotNull('a.vis_team_score')
        .then(data => {
            if (data.length) {

                const result = {
                    statusCode: 200,
                    message: 'Request Success',
                    result: data
                };

                res.json(result);
            } else {
                res.status(400).json('error getting season games')
            }
        }).catch(err => {
            console.log(error);
            res.status(400).json('season games not found')
        })
}

const updateHomeTeamScore = (req, res, knex) => {
    knex('schedule_v2')
    .where({id: req.params.id})
    .update({home_team_score: req.body.home_team_score})
    .then(resp => {
        if (resp) {

            const result = {
                statusCode: 200,
                message: 'Request Success',
                result: 'Success!'
            };

            res.json(result)
        } else {
            res.status(400).json("Error Updating Score")
        }
    })
    .catch(err => {
        console.log(err);
        res.status(400).json("Server Error!");
    });
}

const updateVisTeamScore = (req, res, knex) => {
    knex('schedule_v2')
    .where({id: req.params.id})
    .update({vis_team_score: req.body.vis_team_score})
    .then(resp => {
        if (resp) {
            const result = {
                statusCode: 200,
                message: 'Request Success',
                result: 'Success!'
            };

            res.json(result)
        } else {
            res.status(400).json("Error Updating Score")
        }
    })
    .catch(err => {
        console.log(err);
        res.status(400).json("Server Error!");
    });
}

module.exports = {
    getAllSeasonGames, getGamesForDays, getLastFiveRecordForTeam, getMatchupRecord,
    updateHomeTeamScore, updateVisTeamScore
};
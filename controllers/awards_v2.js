const getChampions = (req, res, knex) => {
    knex.select(
        'a.id',
        'a.display_season',
        'a.cha_season',
        'b.display_name',
        'c.city',
        'c.nickname',
        'c.teamlogo',
        'c.teamcolor',
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
    knex.select(
        'a.id',
        'a.player_id',
        'a.display_season',
        'a.cha_season',
        'b.display_name',
        'c.city',
        'c.nickname',
        'c.teamlogo',
        'c.teamcolor',
        'd.firstname as ownerfirst',
        'd.lastname as ownerlast',
        'e.firstname as playerfirst',
        'e.lastname as playerlast',
        'e.nhl_id',
        'f.games_played',
        'f.goals',
        'f.assists',
        'f.points'
    )
    .from('awards_v2 as a')
    .leftJoin('award_type_v2 as b', 'b.id', 'a.award_type')
    .leftJoin('teams_v2 as c', 'c.id', 'a.team_id')
    .leftJoin('users_v2 as d', 'd.id', 'a.users_id')
    .leftJoin('players_v2 as e', 'e.id', 'a.player_id')
    .leftJoin('players_stats_v2 as f', function() {
        this
        .on('f.player_id', '=', 'a.player_id')
        .on('f.playing_year', '=', 'a.cha_season')
    })
    .where('b.award_type', 'scorer')
    .where('f.season_type', 'Regular')
    .orderBy('display_season', 'desc')
    .then(data => {
        if (data.length) {
            const result = {
                statusCode: 200,
                message: 'Request Success',
                result: data
            }
            res.json(result);
        } else {
            console.log(data);
            res.status(400).json('error getting stats')
        }
    })
    .catch(err => res.status(400).json('not found'))
}

const getDefense = (req, res, knex) => {
    knex.select(
        'a.id',
        'a.player_id',
        'a.display_season',
        'a.cha_season',
        'b.display_name',
        'c.city',
        'c.nickname',
        'c.teamlogo',
        'c.teamcolor',
        'd.firstname as ownerfirst',
        'd.lastname as ownerlast',
        'e.firstname as playerfirst',
        'e.lastname as playerlast',
        'e.nhl_id',
        'f.games_played',
        'f.goals',
        'f.assists',
        'f.points'
    )
    .from('awards_v2 as a')
    .leftJoin('award_type_v2 as b', 'b.id', 'a.award_type')
    .leftJoin('teams_v2 as c', 'c.id', 'a.team_id')
    .leftJoin('users_v2 as d', 'd.id', 'a.users_id')
    .leftJoin('players_v2 as e', 'e.id', 'a.player_id')
    .leftJoin('players_stats_v2 as f', function() {
        this
        .on('f.player_id', '=', 'a.player_id')
        .on('f.playing_year', '=', 'a.cha_season')
    })
    .where('b.award_type', 'defense')
    .where('f.season_type', 'Regular')
    .orderBy('display_season', 'desc')
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

const getRookies = (req, res, knex) => {
    knex.select(
        'a.id',
        'a.player_id',
        'a.display_season',
        'a.cha_season',
        'b.display_name',
        'c.city',
        'c.nickname',
        'c.teamlogo',
        'c.teamcolor',
        'd.firstname as ownerfirst',
        'd.lastname as ownerlast',
        'e.firstname as playerfirst',
        'e.lastname as playerlast',
        'e.nhl_id',
        'f.games_played',
        'f.goals',
        'f.assists',
        'f.points'
    )
    .from('awards_v2 as a')
    .leftJoin('award_type_v2 as b', 'b.id', 'a.award_type')
    .leftJoin('teams_v2 as c', 'c.id', 'a.team_id')
    .leftJoin('users_v2 as d', 'd.id', 'a.users_id')
    .leftJoin('players_v2 as e', 'e.id', 'a.player_id')
    .leftJoin('players_stats_v2 as f', function() {
        this
        .on('f.player_id', '=', 'a.player_id')
        .on('f.playing_year', '=', 'a.cha_season')
    })
    .where('b.award_type', 'rookie')
    .where('f.season_type', 'Regular')
    .orderBy('display_season', 'desc')
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

const getGoalies = (req, res, knex) => {
    knex.select(
        'a.id',
        'a.player_id',
        'a.display_season',
        'a.cha_season',
        'b.display_name',
        'c.city',
        'c.nickname',
        'c.teamlogo',
        'c.teamcolor',
        'd.firstname as ownerfirst',
        'd.lastname as ownerlast',
        'e.firstname as playerfirst',
        'e.lastname as playerlast',
        'e.nhl_id',
        'f.games_played',
        'f.wins',
        'f.goals_against_avg',
        'f.save_pct'
    )
    .from('awards_v2 as a')
    .leftJoin('award_type_v2 as b', 'b.id', 'a.award_type')
    .leftJoin('teams_v2 as c', 'c.id', 'a.team_id')
    .leftJoin('users_v2 as d', 'd.id', 'a.users_id')
    .leftJoin('players_v2 as e', 'e.id', 'a.player_id')
    .leftJoin('goalies_stats_v2 as f', function() {
        this
        .on('f.player_id', '=', 'a.player_id')
        .on('f.playing_year', '=', 'a.cha_season')
    })
    .where('b.award_type', 'goalie')
    .where('f.season_type', 'Regular')
    .orderBy('display_season', 'desc')
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

const getGm = (req, res, knex) => {
    knex.select(
        'a.id',
        'a.display_season',
        'a.cha_season',
        'b.display_name',
        'c.city',
        'c.nickname',
        'c.teamlogo',
        'c.teamcolor',
        'd.firstname',
        'd.lastname'
    )
    .from('awards_v2 as a')
    .leftJoin('award_type_v2 as b', 'b.id', 'a.award_type')
    .leftJoin('teams_v2 as c', 'c.id', 'a.team_id')
    .leftJoin('users_v2 as d', 'd.id', 'a.users_id')
    .where('b.award_type', 'gm')
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

const getSeason = (req, res, knex) => {
    knex.select(
        'a.id',
        'a.display_season',
        'a.cha_season',
        'b.display_name',
        'c.city',
        'c.nickname',
        'c.teamlogo',
        'c.teamcolor',
        'd.firstname',
        'd.lastname',
        'e.wins',
        'e.goals_for',
        'e.goals_against',
        'e.points'
    )
    .from('awards_v2 as a')
    .leftJoin('award_type_v2 as b', 'b.id', 'a.award_type')
    .leftJoin('teams_v2 as c', 'c.id', 'a.team_id')
    .leftJoin('users_v2 as d', 'd.id', 'a.users_id')
    .leftJoin('team_stats_v2 as e', function() {
        this
        .on('e.team_id', '=', 'a.team_id')
        .on('e.playing_year', '=', 'a.cha_season')
    })
    .where('b.award_type', 'season')
    .where('e.season_type', 'Regular')
    .orderBy('display_season', 'desc')
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

const getPlayerAwardsByPlayerId = (req, res, knex) => {
    knex.select(
        'a.id',
        'a.display_season',
        'a.cha_season',
        'b.display_name',
        'c.nickname',
        'c.teamlogo',
        'd.firstname',
        'd.lastname',
    )
    .from('awards_v2 as a')
    .leftJoin('award_type_v2 as b', 'b.id', 'a.award_type')
    .leftJoin('teams_v2 as c', 'c.id', 'a.team_id')
    .leftJoin('players_v2 as d', 'd.id', 'a.player_id')
    .where('a.player_id', req.params.id)
    .orderBy('display_season', 'desc')
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

const getGoalieAwardsByPlayerId = (req, res, knex) => {
    knex.select(
        'a.id',
        'a.display_season',
        'a.cha_season',
        'b.display_name',
        'c.nickname',
        'c.teamlogo',
        'd.firstname',
        'd.lastname',
    )
    .from('awards_v2 as a')
    .leftJoin('award_type_v2 as b', 'b.id', 'a.award_type')
    .leftJoin('teams_v2 as c', 'c.id', 'a.team_id')
    .leftJoin('players_v2 as d', 'd.id', 'a.player_id')
    .where('a.player_id', req.params.id)
    .orderBy('display_season', 'desc')
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

const getTeamAwardsByUserId = (req, res, knex) => {
    knex.select(
        'a.id',
        'a.display_season',
        'a.cha_season',
        'b.display_name',
        'c.nickname',
        'c.teamlogo',
        'c.teamcolor',
        'd.firstname as playerfirst',
        'd.lastname as playerlast',
        'd.nhl_id',
        'e.firstname as ownerfirst',
        'e.lastname as ownerlast',
    )
    .from('awards_v2 as a')
    .leftJoin('award_type_v2 as b', 'b.id', 'a.award_type')
    .leftJoin('teams_v2 as c', 'c.id', 'a.team_id')
    .leftJoin('players_v2 as d', 'd.id', 'a.player_id')
    .leftJoin('users_v2 as e', 'e.id', 'a.users_id')
    .where('a.users_id', req.params.id)
    .orderBy('display_season', 'desc')
    .then(data => {
        if (data.length) {
            const result = {
                statusCode: 200,
                message: 'Request Success',
                result: data
            }
            res.json(result);
        } else {
            res.status(200).json('error getting stats')
        }
    })
    .catch(err => res.status(200).json('not found'))
}

const getAllAwardWinners = (req, res, knex) => {
    knex.select(
        'a.id',
        'a.display_season',
        'a.cha_season',
        'b.id as awardtypeid',
        'b.display_name',
        'c.id as teamid',
        'c.city',
        'c.nickname',
        'c.teamlogo',
        'c.teamcolor',
        'd.id as playerid',
        'd.firstname as playerfirst',
        'd.lastname as playerlast',
        'd.nhl_id',
        'e.id as ownerid',
        'e.firstname as ownerfirst',
        'e.lastname as ownerlast',
        'f.games_played as playergamesplayed',
        'f.goals',
        'f.assists',
        'f.points as playerpoints',
        // 'g.wins as teamwins',
        // 'g.goals_for',
        // 'g.goals_against',
        // 'g.points as teampoints',
        // 'h.games_played as goaliegamesplayed',
        // 'h.wins as goaliewins',
        // 'h.goals_against_avg',
        // 'h.save_pct'
    )
    .from('awards_v2 as a')
    .leftJoin('award_type_v2 as b', 'b.id', 'a.award_type')
    .leftJoin('teams_v2 as c', 'c.id', 'a.team_id')
    .leftJoin('players_v2 as d', 'd.id', 'a.player_id')
    .leftJoin('users_v2 as e', 'e.id', 'a.users_id')
    .leftJoin('players_stats_v2 as f', function() {
        this
        .on('f.player_id', '=', 'a.player_id')
        .on('f.playing_year', '=', 'a.cha_season')
        .on('f.season_type', '=', 'Regular')
    })
    // .leftJoin('team_stats_v2 as g', function() {
    //     this
    //     .on('g.team_id', '=', 'a.team_id')
    //     .on('g.playing_year', '=', 'a.cha_season')
    // })
    // .leftJoin('goalies_stats_v2 as h', function() {
    //     this
    //     .on('h.player_id', '=', 'a.player_id')
    //     .on('h.playing_year', '=', 'a.cha_season')
    // })
    .orderBy('display_season', 'desc')
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

const getAwardTypes = (req, res, knex) => {
    knex.select(
        'a.*',
    )
    .from('award_type_v2 as a')
    .whereNot('a.id', '1')
    .orderBy('display_name', 'desc')
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

const getAwardWinnerById = (req, res, knex) => {
    knex.select(
        'a.id',
        'a.display_season',
        'a.cha_season',
        'b.id as awardtypeid',
        'b.display_name',
        'c.id as teamid',
        'c.city',
        'c.nickname',
        'c.teamlogo',
        'c.teamcolor',
        'd.id as playerid',
        'd.firstname as playerfirst',
        'd.lastname as playerlast',
        'd.nhl_id',
        'e.id as ownerid',
        'e.firstname as ownerfirst',
        'e.lastname as ownerlast',
    )
    .from('awards_v2 as a')
    .leftJoin('award_type_v2 as b', 'b.id', 'a.award_type')
    .leftJoin('teams_v2 as c', 'c.id', 'a.team_id')
    .leftJoin('players_v2 as d', 'd.id', 'a.player_id')
    .leftJoin('users_v2 as e', 'e.id', 'a.users_id')
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
            res.status(400).json('error getting stats')
        }
    })
    .catch(err => res.status(400).json('not found'))
}

const addAwardWinner = (req, res, knex) => {
    knex('awards_v2').insert({
        display_season: req.body.display_season,
        cha_season: req.body.cha_season,
        team_id: req.body.team_id,
        users_id: req.body.users_id,
        player_id: req.body.player_id,
        award_type: req.body.award_type
    }).then(resp => {

        if (resp) {

            const result = {
                statusCode: 200,
                message: 'Add Player Success',
            }

            res.json(result)
        } else {
            res.status(400).json('Error!'); 
        }
    })
    .catch(err => {
        console.log(err); 
        res.status(400).json('not found');
    }) 
}

const editAwardWinner = (req, res, knex) => {
    knex('awards_v2').where({id: req.params.id})
    .update({
        display_season: req.body.display_season,
        cha_season: req.body.cha_season,
        team_id: req.body.team_id,
        users_id: req.body.users_id,
        player_id: req.body.player_id,
        award_type: req.body.award_type
    })
    .then(resp => {
        if (resp) {

            const result = {
                statusCode: 200,
                message: 'Edit Player Success',
            }

            res.json(result)
        } else {
            res.status(400).json('Error!'); 
        }
    })
    .catch(err => res.status(400).json('not found'))
}

const deleteAwardWinner = (req, res, knex) => {
    knex('awards_v2').where('id', req.params.id).del()
        .then(resp => {
            if (resp) {

                const result = {
                    statusCode: 200,
                    message: 'Delete Player Success',
                }

                res.json(result)
            } else {
                res.status(400).json('Error!'); 
            }
        })
        .catch(err => {
            console.log(err); 
            res.status(400).json('not found');
        })
}


module.exports = {
    getChampions, getScorers, getDefense, getRookies, getGoalies, getGm, getSeason,
    getPlayerAwardsByPlayerId, getGoalieAwardsByPlayerId, getTeamAwardsByUserId,
    getAllAwardWinners, getAwardTypes, getAwardWinnerById,
    addAwardWinner, editAwardWinner, deleteAwardWinner
};
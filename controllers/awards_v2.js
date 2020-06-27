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
        'c.city',
        'c.nickname',
        'c.teamlogo',
        'c.teamcolor',
        'd.firstname',
        'd.lastname',
    )
    .from('awards_v2 as a')
    .leftJoin('award_type_v2 as b', 'b.id', 'a.award_type')
    .leftJoin('teams_v2 as c', 'c.id', 'a.team_id')
    .leftJoin('users_v2 as d', 'd.id', 'a.users_id')
    .leftJoin('players_stats_v2 as e', function() {
        this
        .on('e.team_name', '=', 'c.shortname')
        .on('e.playing_year', '=', 'a.cha_season')
    })
    .where('e.season_type', 'Regular')
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
        'c.city',
        'c.nickname',
        'c.teamlogo',
        'c.teamcolor',
        'd.firstname',
        'd.lastname',
    )
    .from('awards_v2 as a')
    .leftJoin('award_type_v2 as b', 'b.id', 'a.award_type')
    .leftJoin('teams_v2 as c', 'c.id', 'a.team_id')
    .leftJoin('users_v2 as d', 'd.id', 'a.users_id')
    .leftJoin('goalies_stats_v2 as e', function() {
        this
        .on('e.team_name', '=', 'c.shortname')
        .on('e.playing_year', '=', 'a.cha_season')
    })
    .where('e.season_type', 'Regular')
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


module.exports = {
    getChampions, getScorers, getDefense, getRookies, getGoalies, getGm, getSeason,
    getPlayerAwardsByPlayerId, getGoalieAwardsByPlayerId
};
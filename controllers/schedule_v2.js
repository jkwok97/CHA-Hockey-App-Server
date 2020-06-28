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

module.exports = {
    getAllSeasonGames
};
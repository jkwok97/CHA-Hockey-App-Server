const request = require('request');

const acquire = (req, res, knex, waiversHookUrl) => {

    const players = req.body.players;
    const goalies = req.body.goalies;
    const newTeam = req.body.newTeam;

    let error = false;

    if (players && players.length > 0) {
        players.forEach(player => {
            knex('players_stats').where({id: player.id}).update({team_name: player.team_name})
                .then(resp => {
                    if (resp) {
                        console.log(resp);
                    } else {
                        error = true;
                    }
                })
                .catch(err => {res.status(400).json("Server Error!")});
        });
    }

    if (goalies && goalies.length > 0) {
        goalies.forEach((goalie) => {
            knex('goalie_stats').where({id: goalie.id}).update({team_name: goalie.team_name})
                .then(resp => {
                    if (resp) {
                        console.log(resp);
                    } else {
                        error = true;
                    }
                })
                .catch(err => {res.status(400).json("Server Error!")});
        });
    }

    if (!error) {

        const playersString = changeToString(players);
        const goaliesString = changeToString(goalies);

        request.post(waiversHookUrl, {
            json: {
                'text': `:rotating_light: WAIVER PICK UP ALERT :rotating_light: \n \n To ${newTeam}: ${ playersString } ${ goaliesString }`,
                'channel': '#waivers-and-drops',
                'username': 'League Office',
                'icon_emoji': ':office:'
            }
        }, (error, res, body) => {
            if (error) {
                console.log(error);
                return
            } else {
                console.log(body);
            }
        })
        res.status(200).json({
            players: players,
            goalies: goalies
        })
    } else {
        res.status(400).json("Error Updating Players")
    }
    
}

const release = (req, res, knex, waiversHookUrl) => {

    const players = req.body.players;
    const goalies = req.body.goalies;
    const originalTeam = req.body.originalTeam;

    let error = false;

    if (players && players.length > 0) {
        players.forEach(player => {
            knex('players_stats').where({id: player.id}).update({team_name: player.team_name})
                .then(resp => {
                    if (resp) {
                        console.log(resp);
                    } else {
                        error = true;
                    }
                })
                .catch(err => {res.status(400).json("Server Error!")});
        });
    }

    if (goalies && goalies.length > 0) {
        goalies.forEach((goalie) => {
            knex('goalie_stats').where({id: goalie.id}).update({team_name: goalie.team_name})
                .then(resp => {
                    if (resp) {
                        console.log(resp);
                    } else {
                        error = true;
                    }
                })
                .catch(err => {res.status(400).json("Server Error!")});
        });
    }

    if (!error) {

        const playersString = changeToString(players);
        const goaliesString = changeToString(goalies);

        request.post(waiversHookUrl, {
            json: {
                'text': `:rotating_light: WAIVER DROP ALERT :rotating_light: \n \n To Waivers From ${originalTeam}: ${ playersString } ${ goaliesString }`,
                'channel': '#waivers-and-drops',
                'username': 'League Office',
                'icon_emoji': ':office:'
            }
        }, (error, res, body) => {
            if (error) {
                console.log(error);
                return
            } else {
                console.log(body);
            }
        })
        res.status(200).json({
            players: players,
            goalies: goalies
        })
    } else {
        res.status(400).json("Error Updating Players")
    }
    
}

const trade = (req, res, knex, hookUrl) => {

    const teamOnePlayers = req.body.teamOne.players;
    const teamOneGoalies = req.body.teamOne.goalies;
    const teamOnePicks = req.body.teamOne.picks;
    const teamOneNewTeam = req.body.teamOne.newTeam;

    const teamTwoPlayers = req.body.teamTwo.players;
    const teamTwoGoalies = req.body.teamTwo.goalies;
    const teamTwoPicks = req.body.teamTwo.picks;
    const teamTwoNewTeam = req.body.teamTwo.newTeam;

    let error = false;

    const players = [];
    players.push(teamOnePlayers);
    players.push(teamTwoPlayers);

    console.log(players);

    const goalies = [];
    goalies.push(teamOneGoalies);
    goalies.push(teamTwoGoalies);

    console.log(goalies);

    if (players && players.length > 0) {
        players.forEach(player => {
            knex('players_stats').where({id: player.id}).update({team_name: player.team_name})
                .then(resp => {
                    if (resp) {
                        console.log(resp);
                    } else {
                        error = true;
                    }
                })
                .catch(err => {res.status(400).json("Server Error!")});
        });
    }

    if (goalies && goalies.length > 0) {
        goalies.forEach((goalie) => {
            knex('goalie_stats').where({id: goalie.id}).update({team_name: goalie.team_name})
                .then(resp => {
                    if (resp) {
                        console.log(resp);
                    } else {
                        error = true;
                    }
                })
                .catch(err => {res.status(400).json("Server Error!")});
        });
    }

    if (!error) {

        const teamOnePlayersString = changeToString(teamOnePlayers);
        const teamOneGoaliesString = changeToString(teamOneGoalies);
        const teamOnePicksString = changePicksToString(teamOnePicks);
        const teamTwoPlayersString = changeToString(teamTwoPlayers);
        const teamTwoGoaliesString = changeToString(teamTwoGoalies);
        const teamTwoPicksString = changePicksToString(teamTwoPicks);
        

        request.post(hookUrl, {
            json: {
                'text': `:rotating_light: TRADE ALERT :rotating_light: \n \n To ${teamOneNewTeam}: ${ teamOnePlayersString } ${ teamOneGoaliesString } ${ teamOnePicksString } \n \n To ${teamTwoNewTeam}: ${ teamTwoPlayersString } ${ teamTwoGoaliesString } ${ teamTwoPicksString }`,
                'channel': '#waivers-and-drops',
                'username': 'League Office',
                'icon_emoji': ':office:'
            }
        }, (error, res, body) => {
            if (error) {
                console.log(error);
                return
            } else {
                console.log(body);
            }
        })
        res.status(200).json({
            teamOne: {
                players: teamOnePlayers,
                goalies: teamOneGoalies,
                picks: teamOnePicks
            },
            teamTwo: {
                players: teamTwoPlayers,
                goalies: teamTwoGoalies,
                picks: teamTwoPicks
            }
        })
    } else {
        res.status(400).json("Error Updating Players")
    }
    
}

const changePicksToString = (array) => {
    let string = '';
    if (array) {
        array.forEach((element) => {
            string += `${element.team} ${element.pick_value}`
        })
    }
    return string;
}

const changeToString = (array) => {
    let string = '';
    if (array) {
        array.forEach((element) => {
            string += `${element.player_name}, `
        })
    }
    return string;
}

module.exports = {
    acquire, release, trade
};

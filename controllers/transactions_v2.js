const request = require('request');

const acquire = (req, res, knex, waiversHookUrl) => {

    const players = req.body.players;
    const goalies = req.body.goalies;
    const newTeam = req.body.newTeam;

    let error = false;

    if (players && players.length > 0) {
        players.forEach(player => {
            knex('players_stats_v2')
                .where({id: player.id})
                .update({team_name: player.team_name})
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
            knex('goalies_stats_v2')
                .where({id: goalie.id})
                .update({team_name: goalie.team_name})
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
            knex('players_stats_v2')
                .where({id: player.id})
                .update({team_name: player.team_name})
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
            knex('goalies_stats_v2').where({id: goalie.id})
                .update({team_name: goalie.team_name})
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
    const teamOneNewTeamId = req.body.teamOne.newTeamId;

    const teamTwoPlayers = req.body.teamTwo.players;
    const teamTwoGoalies = req.body.teamTwo.goalies;
    const teamTwoPicks = req.body.teamTwo.picks;
    const teamTwoNewTeam = req.body.teamTwo.newTeam;
    const teamTwoNewTeamId = req.body.teamTwo.newTeamId;

    let error = false;

    updatePlayers(teamOnePlayers, knex);
    updatePlayers(teamTwoPlayers, knex);
    updateGoalies(teamOneGoalies, knex);
    updateGoalies(teamTwoGoalies, knex);

    if (teamOnePicks && teamOnePicks.length > 0) {

        teamOnePicks.forEach((pick) => {
            switch (pick.pick_value) {
                case '1st':
                    knex('draft_order_v2').where('id', pick.id)
                        .update({round_one: teamOneNewTeamId})
                        .then(resp => {
                            if (resp) { console.log(resp); }
                            else { error = true; }
                        })
                        .catch(err => { res.status(400).json("Server Error!") });
                    break;
                case '2nd':
                    knex('draft_order_v2').where('id', pick.id)
                        .update({round_two: teamOneNewTeamId})
                        .then(resp => {
                            if (resp) { console.log(resp); }
                            else { error = true; }
                        })
                        .catch(err => { res.status(400).json("Server Error!") });
                    break;
                case '3rd':
                    knex('draft_order_v2').where('id', pick.id)
                        .update({round_three: teamOneNewTeamId})
                        .then(resp => {
                            if (resp) { console.log(resp); }
                            else { error = true; }
                        })
                        .catch(err => { res.status(400).json("Server Error!") });
                    break;
                case '4th':
                    knex('draft_order_v2').where('id', pick.id)
                        .update({round_four: teamOneNewTeamId})
                        .then(resp => {
                            if (resp) { console.log(resp); }
                            else { error = true; }
                        })
                        .catch(err => { res.status(400).json("Server Error!") });
                    break;
                case '5th':
                    knex('draft_order_v2').where('id', pick.id)
                        .update({round_five: teamOneNewTeamId})
                        .then(resp => {
                            if (resp) { console.log(resp); }
                            else { error = true; }
                        })
                        .catch(err => { res.status(400).json("Server Error!") });
                    break;
                default:
                    break;
            }
            
        })
    }

    if (teamTwoPicks && teamTwoPicks.length > 0) {

        teamTwoPicks.forEach((pick) => {
            switch (pick.pick_value) {
                case '1st':
                    knex('draft_order_v2').where('id', pick.id)
                        .update({round_one: teamTwoNewTeamId})
                        .then(resp => {
                            if (resp) { console.log(resp); }
                            else { error = true; }
                        })
                        .catch(err => { res.status(400).json("Server Error!") });
                    break;
                case '2nd':
                    knex('draft_order_v2').where('id', pick.id)
                        .update({round_two: teamTwoNewTeamId})
                        .then(resp => {
                            if (resp) { console.log(resp); }
                            else { error = true; }
                        })
                        .catch(err => { res.status(400).json("Server Error!") });
                    break;
                case '3rd':
                    knex('draft_order_v2').where('id', pick.id)
                        .update({round_three: teamTwoNewTeamId})
                        .then(resp => {
                            if (resp) { console.log(resp); }
                            else { error = true; }
                        })
                        .catch(err => { res.status(400).json("Server Error!") });
                    break;
                case '4th':
                    knex('draft_order_v2').where('id', pick.id)
                        .update({round_four: teamTwoNewTeamId})
                        .then(resp => {
                            if (resp) { console.log(resp); }
                            else { error = true; }
                        })
                        .catch(err => { res.status(400).json("Server Error!") });
                    break;
                case '5th':
                    knex('draft_order_v2').where('id', pick.id)
                        .update({round_five: teamTwoNewTeamId})
                        .then(resp => {
                            if (resp) { console.log(resp); }
                            else { error = true; }
                        })
                        .catch(err => { res.status(400).json("Server Error!") });
                    break;
                default:
                    break;
            }
            
        })
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

const updatePlayers = (players, knex) => {
    if (players && players.length > 0) {
        players.forEach(player => {
            knex('players_stats_v2')
                .where({id: player.id})
                .update({team_name: player.team_name})
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
}

const updateGoalies = (goalies, knex) => {
    if (goalies && goalies.length > 0) {
        goalies.forEach((goalie) => {
            knex('goalies_stats_v2')
                .where({id: goalie.id})
                .update({team_name: goalie.team_name})
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
}

const changePicksToString = (array) => {
    let string = '';
    if (array) {
        array.forEach((element) => {
            string += `${element.team} ${element.pick_value} ${element.draft_year}, `
        })
    }
    return string;
}

const changeToString = (array) => {
    let string = '';
    if (array) {
        array.forEach((element) => {
            string += `${element.firstname} ${element.lastname}, `
        })
    }
    return string;
}

const add = (req, res, knex) => {
    knex('transactions_v2').insert({
        transaction_date: req.body.transaction_date,
        team_one_id: req.body.team_one_id,
        team_one_picks: req.body.team_one_picks,
        team_one_players: req.body.team_one_players,
        team_two_id: req.body.team_two_id,
        team_two_picks: req.body.team_two_picks,
        team_two_players: req.body.team_two_players
    }).then(resp => {

        if (resp) {

            const result = {
                statusCode: 200,
                message: 'Add Transaction Success',
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

const getTransaction = (req, res, knex) => {

    knex.raw(`
        select 
        d.id,
        d.team_one_id,
        d.team_one_picks,
        d.team_two_id,
        d.team_two_picks,
        d.transaction_date,
        d.team_one_players,
        d.team_two_players,
        (select array_agg(p.firstname) from transactions_v2 c left join players_v2 p on p.id = any(c.team_one_players) where c.id = '${req.params.id}') as team_one_firstnames,
        (select array_agg(p.lastname) from transactions_v2 c left join players_v2 p on p.id = any(c.team_one_players) where c.id = '${req.params.id}') as team_one_lastnames,
        (select array_agg(p.nhl_id) from transactions_v2 c left join players_v2 p on p.id = any(c.team_one_players) where c.id = '${req.params.id}') as team_one_nhlids,
        (select array_agg(p.firstname) from transactions_v2 c left join players_v2 p on p.id = any(c.team_two_players) where c.id = '${req.params.id}') as team_two_firstnames,
        (select array_agg(p.lastname) from transactions_v2 c left join players_v2 p on p.id = any(c.team_two_players) where c.id = '${req.params.id}') as team_two_lastname,
        (select array_agg(p.nhl_id) from transactions_v2 c left join players_v2 p on p.id = any(c.team_two_players) where c.id = '${req.params.id}') as team_two_nhlids
        from transactions_v2 d
        where d.id = '${req.params.id}'
        group by d.id
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
    }).catch(err => res.status(400).json('not found'))
}

const getAllTransactions = (req, res, knex) => {
    knex.raw(`
    select 
    d.id,
    d.team_one_id,
    d.team_one_picks,
    d.team_two_id,
    d.team_two_picks,
    d.transaction_date,
    d.team_one_players,
    d.team_two_players,
    (select array_agg(p.firstname) from transactions_v2 c left join players_v2 p on p.id = any(c.team_one_players) where c.id = d.id) as team_one_firstnames,
    (select array_agg(p.lastname) from transactions_v2 c left join players_v2 p on p.id = any(c.team_one_players) where c.id = d.id) as team_one_lastnames,
    (select array_agg(p.nhl_id) from transactions_v2 c left join players_v2 p on p.id = any(c.team_one_players) where c.id = d.id) as team_one_nhlids,
    (select array_agg(p.firstname) from transactions_v2 c left join players_v2 p on p.id = any(c.team_two_players) where c.id = d.id) as team_two_firstnames,
    (select array_agg(p.lastname) from transactions_v2 c left join players_v2 p on p.id = any(c.team_two_players) where c.id = d.id) as team_two_lastname,
    (select array_agg(p.nhl_id) from transactions_v2 c left join players_v2 p on p.id = any(c.team_two_players) where c.id = d.id) as team_two_nhlids
    from transactions_v2 d
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
    }).catch(err => res.status(400).json('not found'))
}

const updateTransaction = (req, res, knex) => {
    
    const teamData = req.body;

    knex('transactions_v2').where({id: req.params.id})
        .update(teamData)
        .then(resp => {
            if (resp) {
                const result = {
                    statusCode: 200,
                    message: 'Update Transaction Success',
                    result: resp
                }
                res.json(result);
            } else {
                res.status(400).json('Error!'); 
            }
        }).catch(err => {
            res.status(400).json('Updating Transaction Error')
        })

}

const deleteTransaction = (req, res, knex) => {
    knex('transactions_v2').where('id', req.params.id).del()
    .then(resp => {
        if (resp) {

            const result = {
                statusCode: 200,
                message: 'Delete Transaction Success',
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
    acquire, release, trade,
    add, getTransaction, getAllTransactions, updateTransaction, deleteTransaction
};

const request = require('request');

const acquire = (req, res, knex, waiversHookUrl) => {

    console.log(req)

    const players = req.body.players;
    const goalies = req.body.goalies;

    if (players && players.length > 0) {
        players.forEach(player => {
            knex('players_stats').where({id: player.id}).update({team_name: player.team_name})
                .then(resp => {
                    if (resp) {
                        res.status(200);
                    } else {
                        res.status(400).json("Error Updating Player");
                    }
                });
        });
    }

    if (goalies && goalies.length > 0) {
        goalies.forEach((goalie) => {
            knex('goalie_stats').where({id: goalie.id}).update({team_name: goalie.team_name})
                .then(resp => {
                    if (resp) {
                        res.status(200);
                    } else {
                        res.status(400).json("Error Updating Goalie");
                    }
                });
        })
    }
    
}

module.exports = {
    acquire
};


// knex('draft_table').where({id: req.params.id}).update({round_five: req.body.team})
    //     .then(resp => {
    //         if (resp) {
                // request.post(waiversHookUrl, {
                //     json: {
                //         'text': `:rotating_light: ${req.body.type} ALERT :rotating_light: \n \n ${req.body.prevTeam}'s round ${req.body.round} pick has been traded to ${req.body.team}`,
                //         'channel': '#trades',
                //         'username': 'League Office',
                //         'icon_emoji': ':office:'
                //     }
                // }, (error, res, body) => {
                //     if (error) {
                //         console.log(error);
                //         return
                //     } else {
                //         console.log(body);
                //     }
                // })
        //         res.json("Success!")
        //     } else {
        //         res.status(400).json("Error Updating Player");
        //     }
        // })
        // .catch(err => {
        //     console.log(err);
        //     res.status(400).json("Server Error!")
        // });
const request = require('request');

const acquire = (req, res, knex, waiversHookUrl) => {
    console.log(req)
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
}

module.exports = {
    acquire
};
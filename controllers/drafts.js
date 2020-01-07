const request = require('request');

const handleDraftsGet = (req, res, knex) => {
    knex.select('*').from('drafts')
        .then(data => {
            if (data.length) {
                res.json(data);
            } else {
                res.status(400).json('error getting draft')
            }
    })
    .catch(err => res.status(400).json('not found'))
}

const getDraftTable = (req, res, knex) => {
    knex.select('*').from('draft_table')
        .then(data => {
            if (data.length) {
                res.json(data);
            } else {
                res.status(400).json('error getting draft')
            }
    })
    .catch(err => res.status(400).json('not found'))
}

const tradeRoundOnePick = (req, res, knex, hookUrl) => {
    // console.log(hookUrl);
    knex('draft_table').where({id: req.params.id}).update({round_one: req.body.team})
        .then(resp => {
            if (resp) {
                request.post(hookUrl, {
                    json: {
                        'text': `:rotating_light: ${req.body.type} ALERT :rotating_light: \n \n ${req.body.prevTeam}'s round ${req.body.round} has been traded to ${req.body.team}`,
                        'channel': '#trades',
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
                res.json("Success!")
            } else {
                res.status(400).json("Error Updating Player");
            }
        })
        .catch(err => {
            console.log(err);
            res.status(400).json("Server Error!")
        });
}

const tradeRoundTwoPick = (req, res, knex, hookUrl) => {
    // console.log(hookUrl);
    knex('draft_table').where({id: req.params.id}).update({round_two: req.body.team})
        .then(resp => {
            if (resp) {
                request.post(hookUrl, {
                    json: {
                        'text': `:rotating_light: ${req.body.type} ALERT :rotating_light: \n \n ${req.body.prevTeam}'s round ${req.body.round} has been traded to ${req.body.team}`,
                        'channel': '#trades',
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
                res.json("Success!")
            } else {
                res.status(400).json("Error Updating Player");
            }
        })
        .catch(err => {
            console.log(err);
            res.status(400).json("Server Error!")
        });
}

const tradeRoundThreePick = (req, res, knex, hookUrl) => {
    // console.log(hookUrl);
    knex('draft_table').where({id: req.params.id}).update({round_three: req.body.team})
        .then(resp => {
            if (resp) {
                request.post(hookUrl, {
                    json: {
                        'text': `:rotating_light: ${req.body.type} ALERT :rotating_light: \n \n ${req.body.prevTeam}'s round ${req.body.round} has been traded to ${req.body.team}`,
                        'channel': '#trades',
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
                res.json("Success!")
            } else {
                res.status(400).json("Error Updating Player");
            }
        })
        .catch(err => {
            console.log(err);
            res.status(400).json("Server Error!")
        });
}

const tradeRoundFourPick = (req, res, knex, hookUrl) => {
    // console.log(hookUrl);
    knex('draft_table').where({id: req.params.id}).update({round_four: req.body.team})
        .then(resp => {
            if (resp) {
                request.post(hookUrl, {
                    json: {
                        'text': `:rotating_light: ${req.body.type} ALERT :rotating_light: \n \n ${req.body.prevTeam}'s round ${req.body.round} has been traded to ${req.body.team}`,
                        'channel': '#trades',
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
                res.json("Success!")
            } else {
                res.status(400).json("Error Updating Player");
            }
        })
        .catch(err => {
            console.log(err);
            res.status(400).json("Server Error!")
        });
}

const tradeRoundFivePick = (req, res, knex, hookUrl) => {
    // console.log(hookUrl);
    knex('draft_table').where({id: req.params.id}).update({round_five: req.body.team})
        .then(resp => {
            if (resp) {
                request.post(hookUrl, {
                    json: {
                        'text': `:rotating_light: ${req.body.type} ALERT :rotating_light: \n \n ${req.body.prevTeam}'s round ${req.body.round} has been traded to ${req.body.team}`,
                        'channel': '#trades',
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
                res.json("Success!")
            } else {
                res.status(400).json("Error Updating Player");
            }
        })
        .catch(err => {
            console.log(err);
            res.status(400).json("Server Error!")
        });
}

module.exports = {
    handleDraftsGet, getDraftTable, tradeRoundOnePick, tradeRoundTwoPick, tradeRoundThreePick, tradeRoundFourPick,
    tradeRoundFivePick
};
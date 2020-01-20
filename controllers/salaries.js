
nhlAPI = 'https://statsapi.web.nhl.com/api/v1/people';
nhlCOM = 'https://api.nhle.com/stats/rest/en/leaders';
nhlComSummary = 'https://api.nhle.com/stats/rest/en';
statsType = 'statsSingleSeason';
currentNHLSeason = '20192020';

const getForwardSalaries = (req, res, knex) => {
    knex.select('*').from('forward_salaries as a')
        .innerJoin('players_stats as b', 'a.player_id', 'b.player_id')
        .where('b.season_type', req.query.type)
        .where('b.playing_year', req.query.year)
        .orderBy('a.current_season_salary', 'desc')
        .then(data => {
            if (data.length) {
                res.json(data);
            } else {
                res.status(400).json('error getting stats')
            }
    })
    .catch(err => {
        console.log(err); 
        res.status(400).json('not found');
    })
}

const getDefenseSalaries = (req, res, knex) => {
    knex.select('*').from('defense_salaries as a')
        .innerJoin('players_stats as b', 'a.player_id', 'b.player_id')
        .where('b.season_type', req.query.type).where('b.playing_year', req.query.year)
        .orderBy('a.current_season_salary', 'desc')
        .then(data => {
            if (data.length) {
                res.json(data);
            } else {
                res.status(400).json('error getting stats')
            }
    })
    .catch(err => {
        console.log(err); 
        res.status(400).json('not found');
    })
}

const getGoalieSalaries = (req, res, knex) => {
    knex.select('*').from('goalie_salaries as a')
        .innerJoin('goalie_stats as b', 'a.player_id', 'b.player_id')
        .where('b.season_type', req.query.type).where('b.playing_year', req.query.year)
        .orderBy('a.current_season_salary', 'desc')
        .then(data => {
            if (data.length) {
                res.json(data);
            } else {
                res.status(400).json('error getting stats')
            }
    })
    .catch(err => {
        console.log(err); 
        res.status(400).json('not found');
    })
}

const getTeamForwardSalaries = (req, res, knex) => {
    knex.select('*').from('forward_salaries as a')
        .innerJoin('players_stats as b', 'a.player_id', 'b.player_id')
        .where('b.season_type', req.query.type)
        .where('b.playing_year', req.query.year)
        .where('b.team_name', req.query.team)
        .orderBy('a.current_season_salary', 'desc')
        .then(data => {
            if (data.length) {
                res.json(data);
            } else {
                res.status(400).json('error getting stats')
            }
    })
    .catch(err => {
        console.log(err); 
        res.status(400).json('not found');
    })
}

const getTeamDefenseSalaries = (req, res, knex) => {
    knex.select('*').from('defense_salaries as a')
        .innerJoin('players_stats as b', 'a.player_id', 'b.player_id')
        .where('b.season_type', req.query.type).where('b.playing_year', req.query.year)
        .where('b.team_name', req.query.team)
        .orderBy('a.current_season_salary', 'desc')
        .then(data => {
            if (data.length) {
                res.json(data);
            } else {
                res.status(400).json('error getting stats')
            }
    })
    .catch(err => {
        console.log(err); 
        res.status(400).json('not found');
    })
}

const getTeamGoalieSalaries = (req, res, knex) => {
    knex.select('*').from('goalie_salaries as a')
        .innerJoin('goalie_stats as b', 'a.player_id', 'b.player_id')
        .where('b.season_type', req.query.type).where('b.playing_year', req.query.year)
        .where('b.team_name', req.query.team)
        .orderBy('a.current_season_salary', 'desc')
        .then(data => {
            if (data.length) {
                res.json(data);
            } else {
                res.status(400).json('error getting stats')
            }
        })
        .catch(err => {
            console.log(err); 
            res.status(400).json('not found');
        })
}

const getGoalieIndividualSalary = (req, res, knex) => {
    knex.select('*').from('goalie_salaries').where('id', req.params.id)
        .then(data => {
            if (data.length) {
                res.json(data);
            } else {
                res.status(400).json('error getting stats')
            }
        })
        .catch(err => {
            console.log(err); 
            res.status(400).json('not found');
        })
}

const getDefenseIndividualSalary = (req, res, knex) => {
    knex.select('*').from('defense_salaries').where('id', req.params.id)
        .then(data => {
            if (data.length) {
                res.json(data);
            } else {
                res.status(400).json('error getting stats')
            }
        })
        .catch(err => {
            console.log(err); 
            res.status(400).json('not found');
        })
}

const getForwardIndividualSalary = (req, res, knex) => {
    knex.select('*').from('forward_salaries').where('id', req.params.id)
        .then(data => {
            if (data.length) {
                res.json(data);
            } else {
                res.status(400).json('error getting stats')
            }
        })
        .catch(err => {
            console.log(err); 
            res.status(400).json('not found');
        })
}

const getAllForwardSalaries = (req, res, knex) => {
    knex.select('*').from('forward_salaries')
        .then(data => {
            if (data.length) {
                res.json(data);
            } else {
                res.status(400).json('error getting stats')
            }
        })
        .catch(err => {
            console.log(err); 
            res.status(400).json('not found');
        })
}

const getAllDefenseSalaries = (req, res, knex) => {
    knex.select('*').from('defense_salaries')
        .then(data => {
            if (data.length) {
                res.json(data);
            } else {
                res.status(400).json('error getting stats')
            }
        })
        .catch(err => {
            console.log(err); 
            res.status(400).json('not found');
        })
}

const getAllGoalieSalaries = (req, res, knex) => {
    knex.select('*').from('goalie_salaries')
        .then(data => {
            if (data.length) {
                res.json(data);
            } else {
                res.status(400).json('error getting stats')
            }
        })
        .catch(err => {
            console.log(err); 
            res.status(400).json('not found');
        })
}

const updateForwardSalary = (req, res, knex) => {
    knex('forward_salaries').where('id', req.params.id)
        .update({
            player_name: req.body.name,
            player_id: req.body.player_id,
            current_season_salary: req.body.current,
            year_two: req.body.two,
            year_three: req.body.three,
            year_four: req.body.four,
            year_five: req.body.five
        })
        .then(resp => {
            if (resp) {
                console.log("success")
                res.json("Success!")
            } else {
                res.status(400).json('Error!'); 
            }
        })
        .catch(err => {
            console.log(err); 
            res.status(400).json('not found');
        })
}

const updateDefenseSalary = (req, res, knex) => {
    knex('defense_salaries').where('id', req.params.id)
        .update({
            player_name: req.body.name,
            player_id: req.body.player_id,
            current_season_salary: req.body.current,
            year_two: req.body.two,
            year_three: req.body.three,
            year_four: req.body.four,
            year_five: req.body.five
        })
        .then(resp => {
            if (resp) {
                res.json("Success!")
            } else {
                res.status(400).json('Error!'); 
            }
        })
        .catch(err => {
            console.log(err); 
            res.status(400).json('not found');
        })
}

const updateGoalieSalary = (req, res, knex) => {
    knex('goalie_salaries').where('id', req.params.id)
        .update({
            player_name: req.body.name,
            player_id: req.body.player_id,
            current_season_salary: req.body.current,
            year_two: req.body.two,
            year_three: req.body.three,
            year_four: req.body.four,
            year_five: req.body.five
        })
        .then(resp => {
            if (resp) {
                res.json("Success!")
            } else {
                res.status(400).json('Error!'); 
            }
        })
        .catch(err => {
            console.log(err); 
            res.status(400).json('not found');
        })
}

const deleteForwardSalary = (req, res, knex) => {
    knex('forward_salaries').where('id', req.params.id).del()
        .then(resp => {
            if (resp) {
                console.log("success")
                res.json("Success!")
            } else {
                res.status(400).json('Error!'); 
            }
        })
        .catch(err => {
            console.log(err); 
            res.status(400).json('not found');
        })
}

const deleteDefenseSalary = (req, res, knex) => {
    knex('defense_salaries').where('id', req.params.id).del()
        .then(resp => {
            if (resp) {
                console.log("success")
                res.json("Success!")
            } else {
                res.status(400).json('Error!'); 
            }
        })
        .catch(err => {
            console.log(err); 
            res.status(400).json('not found');
        })
}

const deleteGoalieSalary = (req, res, knex) => {
    knex('goalie_salaries').where('id', req.params.id).del()
        .then(resp => {
            if (resp) {
                console.log("success")
                res.json("Success!")
            } else {
                res.status(400).json('Error!'); 
            }
        })
        .catch(err => {
            console.log(err); 
            res.status(400).json('not found');
        })
}

const addForwardSalary = (req, res, knex) => {
    let nextId = knex('players_stats').max('player_id').then(resp => {
        return resp + 1;
    })
    console.log(nextId);
    knex('forward_salaries').insert({
        player_id: nextId,
        player_name: req.body.name,
        current_season_salary: req.body.current,
        year_two: req.body.two,
        year_three: req.body.three,
        year_four: req.body.four,
        year_five: req.body.five
    }).then(resp => {
        if (resp) {
            console.log("success")
            res.json("Success!")
        } else {
            res.status(400).json('Error!'); 
        }
    })
    .catch(err => {
        console.log(err); 
        res.status(400).json('not found');
    })     
}

const addDefenseSalary = (req, res, knex) => {
    let nextId = knex('players_stats').max('player_id').then(resp => {
        return resp + 1;
    })
    console.log(nextId);
    knex('defense_salaries').insert({
        player_name: req.body.name,
        current_season_salary: req.body.current,
        year_two: req.body.two,
        year_three: req.body.three,
        year_four: req.body.four,
        year_five: req.body.five
    }).then(resp => {
        if (resp) {
            console.log("success")
            res.json("Success!")
        } else {
            res.status(400).json('Error!'); 
        }
    })
    .catch(err => {
        console.log(err); 
        res.status(400).json('not found');
    })     
}

const addGoalieSalary = (req, res, knex) => {
    let nextId = knex('goalie_stats').max('player_id').then(resp => {
        return resp + 1;
    })
    console.log(nextId);
    knex('goalie_salaries').insert({
        player_name: req.body.name,
        current_season_salary: req.body.current,
        year_two: req.body.two,
        year_three: req.body.three,
        year_four: req.body.four,
        year_five: req.body.five
    }).then(resp => {
        if (resp) {
            console.log("success")
            res.json("Success!")
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
    getForwardSalaries, getDefenseSalaries, getGoalieSalaries, 
    getTeamForwardSalaries, getTeamDefenseSalaries, getTeamGoalieSalaries,
    getGoalieIndividualSalary, getDefenseIndividualSalary, getForwardIndividualSalary, 
    getAllForwardSalaries, getAllDefenseSalaries, getAllGoalieSalaries, 
    updateForwardSalary, updateDefenseSalary, updateGoalieSalary, 
    deleteForwardSalary, deleteDefenseSalary, deleteGoalieSalary, 
    addForwardSalary, addDefenseSalary, addGoalieSalary
};
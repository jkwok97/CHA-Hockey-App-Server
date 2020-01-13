const handleChampionsGet = (req, res, knex) => {
    console.log(req.query.type);
    knex.select('*').from('champions').where('award_type', req.query.type).orderBy('year_won', 'desc')
        .then(champions => {
            if (champions.length) {
                res.json(champions);
            } else {
                res.status(400).json('error getting champion')
            }
    })
    .catch(err => res.status(400).json('not found'))
}

const addChamp = (req, res, knex) => {
    knex('champions').insert({
        year_won: req.body.year_won,
        team_name: req.body.team_name,
        owner_name: req.body.owner_name,
        player_name: req.body.player_name,
        team_short: req.body.team_short,
        award_type: req.body.award_type
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

const deleteChamp = (req, res, knex) => {
    knex('champions').where('id', req.params.id).del()
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

const updateChamp = (req, res, knex) => {
    knex('champions').where({id: req.params.id})
        .update({
            year_won: req.body.year_won,
            team_name: req.body.team_name,
            owner_name: req.body.owner_name,
            player_name: req.body.player_name,
            team_short: req.body.team_short,
            award_type: req.body.award_type
        })
        .then(resp => {
            if (resp) {
                console.log("success")
                res.json("Success!")
            } else {
                res.status(400).json('Error!'); 
            }
    })
    .catch(err => res.status(400).json('not found'))
}

module.exports = {
    handleChampionsGet, addChamp, deleteChamp, updateChamp
};



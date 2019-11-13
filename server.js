const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const champions = require('./controllers/champions');
const drafts = require('./controllers/drafts');
const player_stats = require('./controllers/players_stats');
const player = require('./controllers/players');
const goalie = require('./controllers/goalies');
const teams = require('./controllers/teams');
const goalie_stats = require('./controllers/goalie_stats');
const users = require('./controllers/users');
const morgan = require('morgan');
const knex = require('knex')({
    client: 'pg',
    connection: {
        connectionString: process.env.DATABASE_URL,
        ssl: true
    }
})

const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use(morgan('combined'));

app.get('/', (req, res) => { res.send("it is working"); });

app.get('/champions/', (req, res) => {champions.handleChampionsGet(req, res, knex)});

app.get('/drafts/', (req, res) => {drafts.handleDraftsGet(req, res, knex)});

app.get('/players-stats/', (req, res) => {
    if (req.query.year && req.query.type) {
        player_stats.alltimePlayerStatsByYearBySeason(req, res, knex);
    } else if (req.query.type && req.query.group) {
        if (req.query.group === "Season") {
            player_stats.alltimePlayerStatsByType(req, res, knex);
        } else if (req.query.group === "Alltime") {
            player_stats.alltimePlayerStatsGrouped(req, res, knex);
        }
    } else if (req.query.year) {
        player_stats.alltimePlayerStatsByYear(req, res, knex);
    } else if (req.query.type) {
        player_stats.alltimePlayerStatsByType(req, res, knex);
    } else {
        player_stats.allTimePlayerStats(req, res, knex);
    }
});

app.get('/goalies-stats/', (req, res) => {
    if (req.query.year && req.query.type) {
        goalie_stats.alltimeGoalieStatsByYearByType(req, res, knex);
    } else if (req.query.type && req.query.group) {
        if (req.query.group === "Season") {
            goalie_stats.alltimeGoalieStatsByType(req, res, knex);
        } else if (req.query.group === "Alltime") {
            goalie_stats.alltimeGoalieStatsGrouped(req, res, knex);
        }
    } else if (req.query.year) {
        goalie_stats.alltimeGoalieStatsByYear(req, res, knex);
    } else if (req.query.type) {
        goalie_stats.alltimeGoalieStatsByType(req, res, knex);
    } else {
        goalie_stats.alltimeGoalieStats(req, res, knex);
    }
});

app.get('/team-stats/', (req, res) => {
    if (req.query.year && req.query.type) {
        teams.allTeamsStatsByYearByType(req, res, knex);
    } else if (req.query.type && req.query.group) {
        if (req.query.group === "Season") {
            console.log("by season");
            teams.allTeamsStatsByType(req, res, knex);
        } else if (req.query.group === "Alltime") {
            console.log("by alltime");
            teams.allTeamsStatsGrouped(req, res, knex);
        }
    } else if (req.query.year) {
        teams.allTeamsStatsByYear(req, res, knex);
    } else if (req.query.type) {
        teams.allTeamsStatsByType(req, res, knex);
    } else {
        teams.allTeamsStatsAllTime(req, res, knex);
    }
});

app.get('/players-stats/:teamName', (req, res) => {
    if (req.query.year && req.query.type) {
        player_stats.playerStatsByTeamByYearByType(req, res, knex);
    } else if (req.query.type && req.query.group) {
        if (req.query.group === "Season") {
            player_stats.playerStatsByTeamByType(req, res, knex);
        } else if (req.query.group === "Alltime") {
            player_stats.allTimeTeamPlayersStatsGrouped(req, res, knex);
        }
    } else if (req.query.type) {
        player_stats.playerStatsByTeamByType(req, res, knex);
    } else if (req.query.year) {
        player_stats.playerStatsByTeamByYear(req, res, knex);
    } else {
        player_stats.allTimePlayerStatsByTeam(req, res, knex);
    }
});

app.get('/goalies-stats/:teamName', (req, res) => {
    if (req.query.year && req.query.type) {
        goalie_stats.goalieStatsByTeamByYearByType(req, res, knex);
    } else if (req.query.type && req.query.group) {
        if (req.query.group === "Season") {
            goalie_stats.goalieStatsByTeamByType(req, res, knex);
        } else if (req.query.group === "Alltime") {
            goalie_stats.allTimeTeamGoaliesStatsGrouped(req, res, knex);
        }
    } else if (req.query.year) {
        goalie_stats.goalieStatsByTeamByYear(req, res, knex);
    } else if (req.query.type) {
        goalie_stats.goalieStatsByTeamByType(req, res, knex);
    } else {
        goalie_stats.alltimeGoalieStatsByTeam(req, res, knex);
    }
});

app.get('/team-stats/:teamName', (req, res) => {
    if (req.query.year && req.query.type) {
        teams.teamStatsByYearByType(req, res, knex);
    } else if (req.query.type && req.query.group) {
        if (req.query.group === "Season") {
            teams.teamStatsByType(req, res, knex);
        } else if (req.query.group === "Alltime") {
            teams.oneTeamStatsGrouped(req, res, knex);
        }
    } else if (req.query.year) {
        teams.teamStatsByYear(req, res, knex);
    } else if (req.query.type) {
        teams.teamStatsByType(req, res, knex);
    } else {
        teams.teamStatsAllTime(req, res, knex);
    }
});

app.get('/players/:name', (req, res) => { 
    if (req.query.type) {
        player.getPlayerStatsByType(req, res, knex);
    } else {
        player.getPlayerStats(req, res, knex);
    }
})

app.get('/goalies/:name', (req, res) => { 
    if (req.query.type) {
        goalie.getPlayerStatsByType(req, res, knex);
    } else {
        goalie.getPlayerStats(req, res, knex);
    }
})

app.get('/users/', (req, res) => {users.getUsers(req, res, knex)});

app.get('/users/:email', (req, res) => {users.getUser(req, res, knex)});

app.get('/player-info/', (req, res) => {
    try {
        player_stats.getAllPlayerInfo(req, res)
    } catch (error) {
        console.log(error);
        try {
            player_stats.getAllPlayerInfo2(req, res)
        } catch (error) {
            console.log(error);
        }
    }
});

// app.get('/player-info/:playerId', (req, res) => {player_stats.getRealPlayerInfo(req, res, knex)});

app.listen(process.env.PORT || 3000, () => {
    console.log(`app is running on port ${process.env.PORT}`);
});

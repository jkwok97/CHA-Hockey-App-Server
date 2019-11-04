const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const champions = require('./controllers/champions');
const drafts = require('./controllers/drafts');
const player_stats = require('./controllers/players_stats');
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

app.get('/players-stats/', (req, res) => {player_stats.handlePlayersStatsGet(req, res, knex)});

app.get('/players-stats/:teamName', (req, res) => {player_stats.teamPlayersStats(req, res, knex)});

app.get('/goalies-stats/', (req, res) => {goalie_stats.handleGoaliesStatsGet(req, res, knex)});

app.get('/goalies-stats/:teamName', (req, res) => {goalie_stats.teamGoaliesStats(req, res, knex)});

app.get('/team-stats/', (req, res) => {
    console.log(req.query);
    if (req.query) {
        teams.allTeamsStatsByYear(req, res, knex);
    } else {
        console.log("in all time");
        teams.allTeamsStatsAllTime(req, res, knex);
    }
});

// app.get('/team-stats/', (req, res) => {teams.allTeamsStatsAllTime(req, res, knex)});

app.get('/team-stats/:teamName', (req, res) => {
    if (req.query) {
        teams.teamStatsByYear(req, res, knex);
    } else {
        console.log("in all time");
        teams.teamStatsAllTime(req, res, knex);
    }
});

app.get('/users/', (req, res) => {users.getUsers(req, res, knex)});

app.get('/users/:email', (req, res) => {users.getUser(req, res, knex)});

app.get('/player-info/', (req, res) => {player_stats.getAllPlayerInfo(req, res)});

// app.get('/player-info/:playerId', (req, res) => {player_stats.getRealPlayerInfo(req, res, knex)});

app.listen(process.env.PORT || 3000, () => {
    console.log(`app is running on port ${process.env.PORT}`);
});

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const champions = require('./controllers/champions');
const drafts = require('./controllers/drafts');
const player_stats = require('./controllers/players_stats');
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

app.get('/players-stats', (req, res) => {player_stats.teamPlayersStats(req, res, knex)});

app.listen(process.env.PORT || 3000, () => {
    console.log(`app is running on port ${process.env.PORT}`);
});

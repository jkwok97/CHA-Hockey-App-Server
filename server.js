const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const champions = require('./controllers/champions');
const drafts = require('./controllers/drafts');
const morgan = require('morgan');
// const knex = require('knex')({
//     client: 'pg',
//     connection: process.env.POSTGRES_URI
// });
const knex = require('knex')({
    client: 'pg',
    connection: {
        connectionString: process.env.DATABASE_URL,
        ssl: true
    }
})

// console.log(knex.select('*').from('champions')
// .then(data => {
//     console.log(data);
// }));

const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use(morgan('combined'));

app.get('/', (req, res) => {
    res.send("it is working");
    // res.send("it is working", knex.owners);
});

app.get('/db', async (req, res) => {
    try {
        const client = await knex.connect()
        const result = await client.query('SELECT * FROM drafts');
        const results = {'results': (result ? result.rows : null)};
        res.render('pages/db', results);
        client.release();
    } catch (err) {
        console.log(err);
        res.send("Error " + err);
    }
})

app.get('/champions/', (req, res) => {champions.handleChampionsGet(req, res, knex)});

app.get('/drafts/', (req, res) => {drafts.handleDraftsGet(req, res, knex)});

app.get('/playersStats/', (req, res) => {playersStats.handlePlayersStatsGet(req, res, knex)});

app.listen(process.env.PORT || 3000, () => {
    console.log(`app is running on port ${process.env.PORT}`);
});
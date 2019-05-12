const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const champions = require('./controllers/champions');
const drafts = require('./controllers/drafts');
const morgan = require('morgan');
const knex = require('knex')({
    client: 'pg',
    connection: process.env.POSTGRES_URI
});

// console.log(knex.select('*').from('champions')
// .then(data => {
//     console.log(data);
// }));

const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use(morgan('combined'));

app.get('/', (req, res) => {
    res.send(knex.owners);
});

app.get('/champions/', (req, res) => {champions.handleChampionsGet(req, res, knex)});

app.get('/drafts/', (req, res) => {drafts.handleDraftsGet(req, res, knex)});

app.listen(3000, () => {
    console.log('app is running on port 3000');
});
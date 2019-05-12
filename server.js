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
        host: '127.0.0.1',
        user: 'postgres',
        password: '',
        database: 'cha-hockey-app-server'
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
    res.send("it is working", knex.owners);
});

app.get('/champions/', (req, res) => {champions.handleChampionsGet(req, res, knex)});

app.get('/drafts/', (req, res) => {drafts.handleDraftsGet(req, res, knex)});

app.listen(process.env.PORT || 3000, () => {
    console.log(`app is running on port ${process.env.PORT}`);
});
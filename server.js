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
const waivers = require('./controllers/waivers');
const schedule = require('./controllers/schedule');
const morgan = require('morgan');
const knex = require('knex')({
    client: 'pg',
    connection: {
        connectionString: process.env.DATABASE_URL,
        ssl: true
    }
});
const hookUrl = process.env.SLACK_WEBHOOK;

const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use(morgan('combined'));

app.get('/', (req, res) => { res.send("it is working"); });

app.get('/champions/', (req, res) => {champions.handleChampionsGet(req, res, knex)});

app.get('/drafts/', (req, res) => {drafts.handleDraftsGet(req, res, knex)});
app.get('/drafts/:id', (req, res) => {drafts.getPlayer(req, res, knex)});

app.get('/draft-table/', (req, res) => {drafts.getDraftTable(req, res, knex)});

app.get('/real-stats/', (req, res) => {
    if (req.query.pace) {
        player.getOnPaceNhlPlayerStats(req, res);
    } else {
        player.getNhlPlayerStats(req, res);
    }
});

app.get('/player-ratings/:name', (req, res) => {player.getPlayerRatings(req, res, knex)});

app.get('/goalie-ratings/:name', (req, res) => {goalie.getPlayerRatings(req, res, knex)});

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
            teams.allTeamsStatsByType(req, res, knex);
        } else if (req.query.group === "Alltime") {
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
    if (req.query.type && req.query.league) {
        player.getPlayerStatsByTypeWithJoin(req, res, knex);
    } else if (req.query.type) {
        player.getPlayerStatsByType(req, res, knex);
    } else if (req.query.league) {
        player.getPlayerStatsWithJoin(req, res, knex);
    } else {
        player.getPlayerStats(req, res, knex);
    }
})

app.get('/goalies/:name', (req, res) => { 
    if (req.query.type && req.query.league) {
        goalie.getPlayerStatsByTypeWithJoin(req, res, knex);
    } else if (req.query.type) {
        goalie.getPlayerStatsByType(req, res, knex);
    } else if (req.query.league) {
        goalie.getPlayerStatsWithJoin(req, res, knex);
    } else {
        goalie.getPlayerStats(req, res, knex);
    }
})

app.get('/nhl-leaders/', (req, res) => {
    if (req.query.sort && req.query.playerType == "skater") {
        player.getAllNHLPlayerStats(req, res);
    } else if (req.query.sort && req.query.playerType == "goalie") {
        player.getAllNHLGoalieStats(req, res);
    } else if (req.query.player && req.query.playerType == "player") {
        player.getChaTeam(req, res, knex);
    } else if (req.query.player && req.query.playerType == "goalie") {
        goalie.getGoalieChaTeam(req, res, knex);
    }
});

app.get('/nhl-leaders/summary', (req, res) => { player.getNHLPlayerSummary(req, res) });

app.get('/nhl-rookie-leaders/', (req, res) => { player.getAllNHLRookieStats(req, res) });

app.get('/nhl-rookie-leaders/summary', (req, res) => { player.getAllNHLRookieSummary(req, res) });

app.get('/users/', (req, res) => {users.getUsers(req, res, knex)});

app.get('/users/:email', (req, res) => {users.getUser(req, res, knex)});

app.get('/player-info/', (req, res) => {player_stats.getAllPlayerInfo(req, res)});

app.get('/salaries/', (req, res) => {
    if (req.query.position == "forward" && req.query.team) {
        player.getTeamForwardSalaries(req, res, knex);
    } else if (req.query.position == "defense" && req.query.team) {
        player.getTeamDefenseSalaries(req, res, knex);
    } else if (req.query.position == "goalie" && req.query.team) {
        player.getTeamGoalieSalaries(req, res, knex);
    } else if (req.query.position == "forward") {
        player.getForwardSalaries(req, res, knex);
    } else if (req.query.position == "defense") {
        player.getDefenseSalaries(req, res, knex);
    } else if (req.query.position == "goalie") {
        player.getGoalieSalaries(req, res, knex);
    }
});

app.get('/salaries/all', (req, res) => {
    if (req.query.position == "forward") {
        player.getAllForwardSalaries(req, res, knex);
    } else if (req.query.position == "defense") {
        player.getAllDefenseSalaries(req, res, knex);
    } else if (req.query.position == "goalie") {
        player.getAllGoalieSalaries(req, res, knex);
    }
})

app.get('/salaries/:id', (req, res) => {
    if (req.query.position == "forward") {
        player.getForwardIndividualSalary(req, res, knex);
    } else if (req.query.position == "defense") {
        player.getDefenseIndividualSalary(req, res, knex);
    } else if (req.query.position == "goalie") {
        player.getGoalieIndividualSalary(req, res, knex);
    }
})

app.get('/waivers/', (req, res) => {
    waivers.getAllTeams(req, res, knex);
})

app.get('/schedule/', (req, res) => {
    if (req.query.day) {
        schedule.getNextDays(req, res, knex);
    } else {
        schedule.getWholeSchedule(req, res, knex);
    }
})

app.put('/salaries/:id', (req, res) => { 
    if (req.body.type == "forward") {
        player.updateForwardSalary(req, res, knex);
    } else if (req.body.type == "defense") {
        player.updateDefenseSalary(req, res, knex);
    } else if (req.body.type == "goalie") {
        player.updateGoalieSalary(req, res, knex);
    }
})

app.patch('/players-stats/:id', (req, res) => { player_stats.tradePlayer(req, res, knex, hookUrl) });
app.patch('/players-stats/name/:id', (req, res) => { player_stats.updateName(req, res, knex, hookUrl) });

app.patch('/goalies-stats/:id', (req, res) => { goalie_stats.tradeGoalie(req, res, knex, hookUrl) });
app.patch('/goalies-stats/name/:id', (req, res) => { goalie_stats.updateName(req, res, knex, hookUrl) });

app.patch('/draft-table/:id', (req, res) => { 
    if (req.body.round === "one") {
        drafts.tradeRoundOnePick(req, res, knex, hookUrl); 
    } else if (req.body.round === "two") {
        drafts.tradeRoundTwoPick(req, res, knex, hookUrl); 
    } else if (req.body.round === "three") {
        drafts.tradeRoundThreePick(req, res, knex, hookUrl); 
    } else if (req.body.round === "four") {
        drafts.tradeRoundFourPick(req, res, knex, hookUrl); 
    } else if (req.body.round === "five") {
        drafts.tradeRoundFivePick(req, res, knex, hookUrl); 
    }
});

app.patch('/waivers/:id', (req, res) => { waivers.updateAllTeams(req, res, knex) });
app.patch('/schedule/:id', (req, res) => {
    console.log(req.body); 
    if (req.body.vis_team_score) {
        schedule.updateVisTeamScore(req, res, knex);
    } else if (req.body.home_team_score) {
        schedule.updateHomeTeamScore(req, res, knex);
    }
});

app.delete('/salaries/:id/forward', (req, res) => { player.deleteForwardSalary(req, res, knex) });
app.delete('/salaries/:id/defense', (req, res) => { player.deleteDefenseSalary(req, res, knex) });
app.delete('/salaries/:id/goalie', (req, res) => { player.deleteGoalieSalary(req, res, knex) });

app.post('/salaries/forward', (req, res) => { player.addForwardSalary(req, res, knex) })
app.post('/salaries/defense', (req, res) => { player.addDefenseSalary(req, res, knex) })
app.post('/salaries/goalie', (req, res) => { player.addGoalieSalary(req, res, knex) })

app.listen(process.env.PORT || 3000, () => {
    console.log(`app is running on port ${process.env.PORT}`);
});

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
const waivers = require('./controllers/waivers');
const schedule = require('./controllers/schedule');
const salaries = require('./controllers/salaries');
const transactions = require('./controllers/transactions');


const users = require('./controllers/users');
const nhl = require('./controllers/nhl');
const playerInfo = require('./controllers/playerInfo');
const salaries_v2 = require('./controllers/salaries_v2');
const teams_v2 = require('./controllers/teams_v2');
const league = require('./controllers/league');
const playersStats_v2 = require('./controllers/playersStats_v2');
const goaliesStats_v2 = require('./controllers/goaliesStats_v2');
const draft_table = require('./controllers/draft_table');
const draft_v2 = require('./controllers/drafts_v2');
const transactions_v2 = require('./controllers/transactions_v2');
const teamStats_v2 = require('./controllers/teamStats_v2');


const morgan = require('morgan');
const knex = require('knex')({
    client: 'pg',
    connection: {
        connectionString: process.env.DATABASE_URL,
        ssl: true
    }
});
const hookUrl = process.env.SLACK_WEBHOOK;
const waiversHookUrl = process.env.SLACK_WAIVERS_WEBHOOK;

const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use(morgan('combined'));

app.get('/', (req, res) => { res.send("it is working"); });

// ****************************************************************************************
//                                       VERSION 2
// ****************************************************************************************

// ****************************************************************************************
//                                       League
// ****************************************************************************************

app.get('/v2/league/divisions', (req, res) => {league.getDivisions(req, res, knex)});

// ****************************************************************************************
//                                       Users
// ****************************************************************************************

app.get('/v2/users/', (req, res) => {users.getUsers(req, res, knex)});
app.get('/v2/users/:email', (req, res) => {users.getUser(req, res, knex)});
app.get('/v2/users/edit/:id', (req, res) => {users.getUserById(req, res, knex)});

app.put('/v2/users/edit/:id', (req, res) => {users.updateUser(req, res, knex)});

app.post('/v2/users/add', (req, res) => {users.addUser(req, res, knex)});

app.delete('/v2/users/delete/:id', (req, res) => {users.deleteUser(req, res, knex)});

// ****************************************************************************************
//                                       Players
// ****************************************************************************************

app.get('/v2/players/', (req, res) => {playerInfo.getAllPlayers(req, res, knex)});
app.get('/v2/players/active', (req, res) => {playerInfo.getAllPlayersByActive(req, res, knex)});
app.get('/v2/players/edit/:id', (req, res) => {playerInfo.getPlayer(req, res, knex)});

app.put('/v2/players/edit/:id', (req, res) => {playerInfo.updatePlayer(req, res, knex)});

app.post('/v2/players/add', (req, res) => {playerInfo.addPlayer(req, res, knex)});

app.delete('/v2/players/delete/:id', (req, res) => {playerInfo.deletePlayer(req, res, knex)});

// ****************************************************************************************
//                                       Players Stats
// ****************************************************************************************

app.get('/v2/players-stats/', (req, res) => {playersStats_v2.getPlayersStats(req, res, knex)});
app.get('/v2/players-stats/:id', (req, res) => {playersStats_v2.getPlayersStatsById(req, res, knex)});
app.get('/v2/players-stats/team/:id', (req, res) => {playersStats_v2.getActivePlayersByTeam(req, res, knex)});

app.get('/v2/players-stats/season/current', (req, res) => {playersStats_v2.getPlayersBySeasonByType(req, res, knex)});
app.get('/v2/players-stats/season/forwards', (req, res) => {playersStats_v2.getPlayersBySeasonByTypeByForwards(req, res, knex)});
app.get('/v2/players-stats/season/defense', (req, res) => {playersStats_v2.getPlayersBySeasonByTypeByDefense(req, res, knex)});

app.get('/v2/players-stats/current/team/:id', (req, res) => {playersStats_v2.getPlayersBySeasonByTypeByTeam(req, res, knex)});
app.get('/v2/players-stats/history/user/:id', (req, res) => {playersStats_v2.getPlayersByTypeByUser(req, res, knex)});
app.get('/v2/players-stats/show/history/user/:id', (req, res) => {playersStats_v2.getPlayersByShowByTypeByUser(req, res, knex)});

app.get('/v2/players-stats/leaders/points', (req, res) => {playersStats_v2.getPointLeaders(req, res, knex)});
app.get('/v2/players-stats/leaders/defense', (req, res) => {playersStats_v2.getDefenseLeaders(req, res, knex)});
app.get('/v2/players-stats/leaders/rookies', (req, res) => {playersStats_v2.getRookieLeaders(req, res, knex)});
app.get('/v2/players-stats/leaders/assists', (req, res) => {playersStats_v2.getAssistsLeaders(req, res, knex)});
app.get('/v2/players-stats/leaders/goals', (req, res) => {playersStats_v2.getGoalsLeaders(req, res, knex)});
app.get('/v2/players-stats/leaders/ppgoals', (req, res) => {playersStats_v2.getPpGoalsLeaders(req, res, knex)});
app.get('/v2/players-stats/leaders/shgoals', (req, res) => {playersStats_v2.getShGoalsLeaders(req, res, knex)});
app.get('/v2/players-stats/leaders/shots', (req, res) => {playersStats_v2.getShotsLeaders(req, res, knex)});
app.get('/v2/players-stats/leaders/blocked', (req, res) => {playersStats_v2.getBlockedShotsLeaders(req, res, knex)});
app.get('/v2/players-stats/leaders/penalties', (req, res) => {playersStats_v2.getPenaltyLeaders(req, res, knex)});
app.get('/v2/players-stats/leaders/minutes', (req, res) => {playersStats_v2.getMinutesLeaders(req, res, knex)});
app.get('/v2/players-stats/leaders/plus', (req, res) => {playersStats_v2.getPlusMinusLeaders(req, res, knex)});
app.get('/v2/players-stats/leaders/minus', (req, res) => {playersStats_v2.getWorstPlusMinusLeaders(req, res, knex)});
app.get('/v2/players-stats/leaders/hits', (req, res) => {playersStats_v2.getHitsLeaders(req, res, knex)});
app.get('/v2/players-stats/leaders/current', (req, res) => {playersStats_v2.getStreakLeaders(req, res, knex)});
app.get('/v2/players-stats/leaders/long', (req, res) => {playersStats_v2.getLongStreakLeaders(req, res, knex)});

app.patch('/v2/players-stats/:id', (req, res) => {playersStats_v2.updatePlayersStatsById(req, res, knex)});

// ****************************************************************************************
//                                       Goalies Stats
// ****************************************************************************************

app.get('/v2/goalies-stats/', (req, res) => {goaliesStats_v2.getGoaliesStats(req, res, knex)});
app.get('/v2/goalies-stats/:id', (req, res) => {goaliesStats_v2.getGoaliesStatsById(req, res, knex)});
app.get('/v2/goalies-stats/team/:id', (req, res) => {goaliesStats_v2.getActiveGoaliesByTeam(req, res, knex)});

app.get('/v2/goalies-stats/season/current', (req, res) => {goaliesStats_v2.getGoaliesBySeasonByType(req, res, knex)});

app.get('/v2/goalies-stats/current/team/:id', (req, res) => {goaliesStats_v2.getGoaliesBySeasonByTypeByTeam(req, res, knex)});
app.get('/v2/goalies-stats/history/user/:id', (req, res) => {goaliesStats_v2.getGoaliesByTypeByUser(req, res, knex)});
app.get('/v2/goalies-stats/show/history/user/:id', (req, res) => {goaliesStats_v2.getGoaliesByShowByTypeByUser(req, res, knex)});

app.get('/v2/goalies-stats/leaders/wins', (req, res) => {goaliesStats_v2.getWinsLeaders(req, res, knex)});
app.get('/v2/goalies-stats/leaders/shutouts', (req, res) => {goaliesStats_v2.getShutoutLeaders(req, res, knex)});
app.get('/v2/goalies-stats/leaders/savepct', (req, res) => {goaliesStats_v2.getSavePctLeaders(req, res, knex)});
app.get('/v2/goalies-stats/leaders/gaa', (req, res) => {goaliesStats_v2.getGaaLeaders(req, res, knex)});
app.get('/v2/goalies-stats/leaders/shots', (req, res) => {goaliesStats_v2.getShotsFacedLeaders(req, res, knex)});

app.patch('/v2/goalies-stats/:id', (req, res) => {goaliesStats_v2.updateGoaliesStatsById(req, res, knex)});

// ****************************************************************************************
//                                       Team Stats
// ****************************************************************************************

app.get('/v2/team-stats/:userId/type', (req, res) => {teamStats_v2.getStatsBySeasonTypeByUser(req, res, knex)});
app.get('/v2/team-stats/season', (req, res) => {teamStats_v2.getStatsBySeasonByType(req, res, knex)});

app.get('/v2/team-stats/season/conference', (req, res) => {teamStats_v2.getStatsBySeasonByTypeByConference(req, res, knex)});
app.get('/v2/team-stats/season/division', (req, res) => {teamStats_v2.getStatsBySeasonByTypeByDivision(req, res, knex)});

// ****************************************************************************************
//                                       Draft Table
// ****************************************************************************************

app.get('/v2/draft-table', (req, res) => {draft_table.getDraftTableByYear(req, res, knex)});
app.get('/v2/draft-table/:id', (req, res) => {draft_table.getDraftTableById(req, res, knex)});
app.get('/v2/draft-table/team/:id', (req, res) => {draft_table.getDraftPicksByTeam(req, res, knex)});

app.patch('/v2/draft-table/:id', (req, res) => {draft_table.updateDraftTableById(req, res, knex)});

// ****************************************************************************************
//                                       Draft Player
// ****************************************************************************************

app.get('/v2/draft', (req, res) => {draft_v2.getDraftedPlayers(req, res, knex)});
app.get('/v2/draft/:id', (req, res) => {draft_v2.getDraftedPlayerById(req, res, knex)});
app.get('/v2/draft/season', (req, res) => {draft_v2.getDraftedPlayersBySeason(req, res, knex)});

app.put('/v2/draft/edit/:id', (req, res) => {draft_v2.updateDraftedPlayer(req, res, knex)});

app.post('/v2/draft/add', (req, res) => {draft_v2.addDraftedPlayer(req, res, knex)});

app.delete('/v2/draft/edit/:id', (req, res) => {draft_v2.deleteDraftedPlayer(req, res, knex)});

// ****************************************************************************************
//                                       Salaries
// ****************************************************************************************

app.get('/v2/players/salaries', (req, res) => {salaries_v2.getAllSalaries(req, res, knex)});
app.get('/v2/players/salaries/active', (req, res) => {salaries_v2.getAllActiveSalaries(req, res, knex)});
app.get('/v2/players/salaries/edit/:id', (req, res) => {salaries_v2.getSalary(req, res, knex)});

app.get('/v2/salaries/team/:id', (req, res) => {salaries_v2.getSalaryByTeamId(req, res, knex)});

app.put('/v2/players/salaries/edit/:id', (req, res) => {salaries_v2.updateSalary(req, res, knex)});

app.post('/v2/players/salaries/add', (req, res) => {salaries_v2.addSalary(req, res, knex)});

// ****************************************************************************************
//                                       Teams
// ****************************************************************************************

app.get('/v2/teams', (req, res) => {teams_v2.getTeams(req, res, knex)});
app.get('/v2/teams/active', (req, res) => {teams_v2.getTeamsByActive(req, res, knex)});
app.get('/v2/teams/user/:id', (req, res) => {teams_v2.getTeamsByUser(req, res, knex)});
app.get('/v2/teams/:id', (req, res) => {teams_v2.getTeamById(req, res, knex)});
app.get('/v2/teams/:id/logo', (req, res) => {teams_v2.getTeamLogo(req, res, knex)});
app.get('/v2/teams/:teamName/user/', (req, res) => {teams_v2.getUserIdByTeamName(req, res, knex)});

app.get('/v2/teams/current/all', (req, res) => {teams_v2.getCurrentTeams(req, res, knex)});

app.put('/v2/teams/:id', (req, res) => {teams_v2.updateTeam(req, res, knex)});

app.post('/v2/teams', (req, res) => {teams_v2.addTeam(req, res, knex)});

app.delete('/v2/teams/:id', (req, res) => {teams_v2.deleteTeam(req, res, knex)});

// ****************************************************************************************
//                                    Transactions
// ****************************************************************************************

app.put('/v2/transactions/acquire', (req, res) => {transactions_v2.acquire(req, res, knex, waiversHookUrl)});
app.put('/v2/transactions/release', (req, res) => {transactions_v2.release(req, res, knex, waiversHookUrl)});
app.put('/v2/transactions/trade', (req, res) => {transactions_v2.trade(req, res, knex, hookUrl)});

// ****************************************************************************************
//                                       NHL
// ****************************************************************************************

app.get('/nhl-leaders/', (req, res) => {
    if (req.query.sort && req.query.playerType == "skater") {
        nhl.getAllNHLPlayerStats(req, res);
    } else if (req.query.sort && req.query.playerType == "goalie") {
        nhl.getAllNHLGoalieStats(req, res);
    } else if (req.query.id && req.query.playerType == "player") {
        player.getChaTeam(req, res, knex);
    } else if (req.query.id && req.query.playerType == "goalie") {
        goalie.getGoalieChaTeam(req, res, knex);
    }
});

app.get('/nhl-leaders/summary', (req, res) => { nhl.getNHLPlayerSummary(req, res) });

app.get('/nhl-rookie-leaders/', (req, res) => { nhl.getAllNHLRookieStats(req, res) });

app.get('/nhl-rookie-leaders/summary', (req, res) => { nhl.getAllNHLRookieSummary(req, res) });

app.get('/nhl-stats/player', (req, res) => {
    if (req.query.pace) {
        nhl.getOnPaceNhlPlayerStats(req, res);
    } else {
        nhl.getNhlPlayerStats(req, res);
    }
});


















// ****************************************************************************************
//                                       VERSION 1
// ****************************************************************************************

app.get('/champions/', (req, res) => {champions.handleChampionsGet(req, res, knex)});

app.get('/drafts/', (req, res) => {drafts.handleDraftsGet(req, res, knex)});
app.get('/drafts/:id', (req, res) => {drafts.getPlayer(req, res, knex)});

app.get('/draft-table/', (req, res) => {drafts.getDraftTable(req, res, knex)});
app.get('/draft-table/all', (req, res) => {drafts.getAllDraftTable(req, res, knex)});

app.get('/player-ratings/:id', (req, res) => {player.getPlayerRatings(req, res, knex)});

app.get('/goalie-ratings/:id', (req, res) => {goalie.getPlayerRatings(req, res, knex)});

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

app.get('/players/:id', (req, res) => { 
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

app.get('/goalies/:id', (req, res) => { 
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

app.get('/users/', (req, res) => {users.getUsers(req, res, knex)});

app.get('/users/:email', (req, res) => {users.getUser(req, res, knex)});

app.get('/player-info/', (req, res) => {player_stats.getAllPlayerInfo(req, res)});

app.get('/salaries/', (req, res) => {
    if (req.query.position == "forward" && req.query.team) {
        salaries.getTeamForwardSalaries(req, res, knex);
    } else if (req.query.position == "defense" && req.query.team) {
        salaries.getTeamDefenseSalaries(req, res, knex);
    } else if (req.query.position == "goalie" && req.query.team) {
        salaries.getTeamGoalieSalaries(req, res, knex);
    } else if (req.query.position == "forward") {
        salaries.getForwardSalaries(req, res, knex);
    } else if (req.query.position == "defense") {
        salaries.getDefenseSalaries(req, res, knex);
    } else if (req.query.position == "goalie") {
        salaries.getGoalieSalaries(req, res, knex);
    }
});

app.get('/salaries/all', (req, res) => {
    if (req.query.position == "forward") {
        salaries.getAllForwardSalaries(req, res, knex);
    } else if (req.query.position == "defense") {
        salaries.getAllDefenseSalaries(req, res, knex);
    } else if (req.query.position == "goalie") {
        salaries.getAllGoalieSalaries(req, res, knex);
    }
})

app.get('/salaries/:id', (req, res) => {
    if (req.query.position == "forward") {
        salaries.getForwardIndividualSalary(req, res, knex);
    } else if (req.query.position == "defense") {
        salaries.getDefenseIndividualSalary(req, res, knex);
    } else if (req.query.position == "goalie") {
        salaries.getGoalieIndividualSalary(req, res, knex);
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
        salaries.updateForwardSalary(req, res, knex);
    } else if (req.body.type == "defense") {
        salaries.updateDefenseSalary(req, res, knex);
    } else if (req.body.type == "goalie") {
        salaries.updateGoalieSalary(req, res, knex);
    }
})

app.put('/drafts/:id', (req, res) => {drafts.updatePlayer(req, res, knex)});

app.put('/champions/:id', (req, res) => {champions.updateChamp(req, res, knex)});

app.put('/transactions/acquire', (req, res) => {transactions.acquire(req, res, knex, waiversHookUrl)});
app.put('/transactions/release', (req, res) => {transactions.release(req, res, knex, waiversHookUrl)});
app.put('/transactions/trade', (req, res) => {transactions.trade(req, res, knex, hookUrl)});

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

app.delete('/salaries/:id/forward', (req, res) => { salaries.deleteForwardSalary(req, res, knex) });
app.delete('/salaries/:id/defense', (req, res) => { salaries.deleteDefenseSalary(req, res, knex) });
app.delete('/salaries/:id/goalie', (req, res) => { salaries.deleteGoalieSalary(req, res, knex) });

app.delete('/drafts/:id', (req, res) => { drafts.deletePlayer(req, res, knex) });

app.delete('/champions/:id', (req, res) => { champions.deleteChamp(req, res, knex) });

app.post('/salaries/forward', (req, res) => { salaries.addForwardSalary(req, res, knex) })
app.post('/salaries/defense', (req, res) => { salaries.addDefenseSalary(req, res, knex) })
app.post('/salaries/goalie', (req, res) => { salaries.addGoalieSalary(req, res, knex) })

app.post('/drafts/', (req, res) => { drafts.addPlayer(req, res, knex) })

app.post('/champions/', (req, res) => { champions.addChamp(req, res, knex) })

// ****************************************************************************************
//                                      END VERSION 1
// ****************************************************************************************

app.listen(process.env.PORT || 3000, () => {
    console.log(`app is running on port ${process.env.PORT}`);
});

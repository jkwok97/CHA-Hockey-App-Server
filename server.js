const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

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
const waivers_v2 = require('./controllers/waivers_v2');
const awards_v2 = require('./controllers/awards_v2');
const ratings_v2 = require('./controllers/ratings_v2');
const schedule_v2 = require('./controllers/schedule_v2');

const morgan = require('morgan');

const knex = require('knex')({
    client: 'pg',
    connection: {
        connectionString: process.env.DATABASE_URL,
        ssl: { rejectUnauthorized: false }
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

app.get('/v2/league/current-data', (req, res) => {league.getCurrentData(req, res, knex)});

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
app.get('/v2/players/:id', (req, res) => {playerInfo.getPlayerInfo(req, res, knex)});
app.get('/v2/goalies/:id', (req, res) => {playerInfo.getGoalieInfo(req, res, knex)});

app.get('/v2/players/nhl/:id', (req, res) => {playerInfo.getPlayerLogoByNhlId(req, res, knex)});
app.get('/v2/goalies/nhl/:id', (req, res) => {playerInfo.getGoalieLogoByNhlId(req, res, knex)});

app.get('/v2/all-players/active', (req, res) => {playerInfo.getAllPlayersByActive(req, res, knex)});
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

app.get('/v2/players-stats/player/:id', (req, res) => {playersStats_v2.getPlayerStatsByPlayerId(req, res, knex)});

app.get('/v2/players-stats/season/current', (req, res) => {playersStats_v2.getPlayersBySeasonByType(req, res, knex)});
app.get('/v2/players-stats/season/forwards', (req, res) => {playersStats_v2.getPlayersBySeasonByTypeByForwards(req, res, knex)});
app.get('/v2/players-stats/season/defense', (req, res) => {playersStats_v2.getPlayersBySeasonByTypeByDefense(req, res, knex)});

app.get('/v2/players-stats/current/team/:id', (req, res) => {playersStats_v2.getPlayersBySeasonByTypeByTeam(req, res, knex)});
app.get('/v2/players-stats/history/user/:id', (req, res) => {playersStats_v2.getPlayersByTypeByUser(req, res, knex)});
app.get('/v2/players-stats/show/history/user/:id', (req, res) => {playersStats_v2.getPlayersByShowByTypeByUser(req, res, knex)});

app.get('/v2/players-stats/type/all-time', (req, res) => {playersStats_v2.getStatsByTypeSummed(req, res, knex)});
app.get('/v2/players-stats/type/season', (req, res) => {playersStats_v2.getStatsbyType(req, res, knex)});
app.get('/v2/players-stats/type/all-time/forward', (req, res) => {playersStats_v2.getForwardStatsByTypeSummed(req, res, knex)});
app.get('/v2/players-stats/type/season/forward', (req, res) => {playersStats_v2.getForwardStatsbyType(req, res, knex)});
app.get('/v2/players-stats/type/all-time/defense', (req, res) => {playersStats_v2.getDefenseStatsByTypeSummed(req, res, knex)});
app.get('/v2/players-stats/type/season/defense', (req, res) => {playersStats_v2.getDefenseStatsbyType(req, res, knex)});

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

app.get('/v2/goalies-stats/player/:id', (req, res) => {goaliesStats_v2.getGoalieStatsByPlayerId(req, res, knex)});

app.get('/v2/goalies-stats/season/current', (req, res) => {goaliesStats_v2.getGoaliesBySeasonByType(req, res, knex)});

app.get('/v2/goalies-stats/current/team/:id', (req, res) => {goaliesStats_v2.getGoaliesBySeasonByTypeByTeam(req, res, knex)});
app.get('/v2/goalies-stats/history/user/:id', (req, res) => {goaliesStats_v2.getGoaliesByTypeByUser(req, res, knex)});
app.get('/v2/goalies-stats/show/history/user/:id', (req, res) => {goaliesStats_v2.getGoaliesByShowByTypeByUser(req, res, knex)});

app.get('/v2/goalies-stats/type/all-time', (req, res) => {goaliesStats_v2.getGoalieStatsByTypeSummed(req, res, knex)});
app.get('/v2/goalies-stats/type/season', (req, res) => {goaliesStats_v2.getGoalieStatsbyType(req, res, knex)});

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
app.get('/v2/team-stats/season/team/:id', (req, res) => {teamStats_v2.getTeamStatsByTeamIdBySeasonbyType(req, res, knex)});

app.get('/v2/team-stats/season/conference', (req, res) => {teamStats_v2.getStatsBySeasonByTypeByConference(req, res, knex)});
app.get('/v2/team-stats/season/division', (req, res) => {teamStats_v2.getStatsBySeasonByTypeByDivision(req, res, knex)});

app.get('/v2/team-stats/type/all-time', (req, res) => {teamStats_v2.getStatsByTypeSummed(req, res, knex)});
app.get('/v2/team-stats/type/season', (req, res) => {teamStats_v2.getStatsbyType(req, res, knex)});

app.get('/v2/team-stats/schedule/team/:id', (req, res) => {teamStats_v2.getStatsForSchedule(req, res, knex)});

// ****************************************************************************************
//                                       Draft Table
// ****************************************************************************************

app.get('/v2/draft-table', (req, res) => {draft_table.getDraftTableByYear(req, res, knex)});
app.get('/v2/draft-table/:id', (req, res) => {draft_table.getDraftTableById(req, res, knex)});
app.get('/v2/draft-table/team/:id', (req, res) => {draft_table.getDraftPicksByTeam(req, res, knex)});

app.get('/v2/draft-table/season/standings', (req, res) => {draft_table.getDraftTableByYearByStandings(req, res, knex)});

app.patch('/v2/draft-table/:id', (req, res) => {draft_table.updateDraftTableById(req, res, knex)});

// ****************************************************************************************
//                                       Draft Player
// ****************************************************************************************

app.get('/v2/draft', (req, res) => {draft_v2.getDraftedPlayers(req, res, knex)});
app.get('/v2/draft/ordered', (req, res) => {draft_v2.getDraftedPlayersOrdered(req, res, knex)});
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

app.get('/v2/salaries/players/:id', (req, res) => {salaries_v2.getPlayerSalariesByPlayerId(req, res, knex)});
app.get('/v2/salaries/goalies/:id', (req, res) => {salaries_v2.getGoalieSalariesByPlayerId(req, res, knex)});

app.get('/v2/salaries/team/:id/players', (req, res) => {salaries_v2.getPlayerSalaryByTeamId(req, res, knex)});
app.get('/v2/salaries/team/:id/goalies', (req, res) => {salaries_v2.getGoalieSalaryByTeamId(req, res, knex)});

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
app.get('/v2/teams/:teamName/players/', (req, res) => {teams_v2.getPlayersByTeamName(req, res, knex)});

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

app.get('/v2/transactions', (req, res) => {transactions_v2.getAllTransactions(req, res, knex)});
app.get('/v2/transactions/date', (req, res) => {transactions_v2.getTransactionsByDateRange(req, res, knex)});

app.get('/v2/transactions/edit/:id', (req, res) => {transactions_v2.getTransaction(req, res, knex)});

app.put('/v2/transactions/edit/:id', (req, res) => {transactions_v2.updateTransaction(req, res, knex)});

app.post('/v2/transactions/add', (req, res) => {transactions_v2.add(req, res, knex)});

app.delete('/v2/transactions/edit/:id', (req, res) => {transactions_v2.deleteTransaction(req, res, knex)});

// ****************************************************************************************
//                                    Waivers
// ****************************************************************************************

app.get('/v2/waivers/', (req, res) => {waivers_v2.getAllTeams(req, res, knex);})

app.patch('/v2/waivers/:id', (req, res) => { waivers_v2.updateAllTeams(req, res, knex) });

// ****************************************************************************************
//                                    Awards
// ****************************************************************************************

app.get('/v2/awards', (req, res) => {awards_v2.getAllAwardWinners(req, res, knex);})
app.get('/v2/awards/winners/:id', (req, res) => {awards_v2.getAwardWinnerById(req, res, knex);})
app.get('/v2/awards/champions', (req, res) => {awards_v2.getChampions(req, res, knex);})
app.get('/v2/awards/scorers', (req, res) => {awards_v2.getScorers(req, res, knex);})
app.get('/v2/awards/defense', (req, res) => {awards_v2.getDefense(req, res, knex);})
app.get('/v2/awards/rookies', (req, res) => {awards_v2.getRookies(req, res, knex);})
app.get('/v2/awards/goalies', (req, res) => {awards_v2.getGoalies(req, res, knex);})
app.get('/v2/awards/gm', (req, res) => {awards_v2.getGm(req, res, knex);})
app.get('/v2/awards/season', (req, res) => {awards_v2.getSeason(req, res, knex);})
app.get('/v2/awards/player/:id', (req, res) => {awards_v2.getPlayerAwardsByPlayerId(req, res, knex);})
app.get('/v2/awards/goalie/:id', (req, res) => {awards_v2.getGoalieAwardsByPlayerId(req, res, knex);})
app.get('/v2/awards/user/:id', (req, res) => {awards_v2.getTeamAwardsByUserId(req, res, knex);})
app.get('/v2/awards/award-types', (req, res) => {awards_v2.getAwardTypes(req, res, knex);})

app.post('/v2/awards/add', (req, res) => { awards_v2.addAwardWinner(req, res, knex) })

app.put('/v2/awards/winners/:id', (req, res) => {awards_v2.editAwardWinner(req, res, knex)});

app.delete('/v2/awards/winners/:id', (req, res) => { awards_v2.deleteAwardWinner(req, res, knex) });

// ****************************************************************************************
//                                    Ratings
// ****************************************************************************************

app.get('/v2/ratings/player/:id', (req, res) => {ratings_v2.getPlayerRatings(req, res, knex);})
app.get('/v2/ratings/goalie/:id', (req, res) => {ratings_v2.getGoalieRatings(req, res, knex);})
app.get('/v2/ratings/player', (req, res) => {ratings_v2.getAllPlayerRatings(req, res, knex);})
app.get('/v2/ratings/goalie', (req, res) => {ratings_v2.getAllGoalieRatings(req, res, knex);})
app.get('/v2/ratings/player/team/:team', (req, res) => {ratings_v2.getTeamPlayerRatings(req, res, knex);})
app.get('/v2/ratings/goalie/team/:team', (req, res) => {ratings_v2.getTeamGoalieRatings(req, res, knex);})

// ****************************************************************************************
//                                    Schedule
// ****************************************************************************************

app.get('/v2/schedule', (req, res) => {schedule_v2.getAllSeasonGames(req, res, knex);})
app.get('/v2/schedule/days', (req, res) => {schedule_v2.getGamesForDays(req, res, knex);})
app.get('/v2/schedule/last-five/:id', (req, res) => {schedule_v2.getLastFiveRecordForTeam(req, res, knex);})
app.get('/v2/schedule/match-up', (req, res) => {schedule_v2.getMatchupRecord(req, res, knex);})

app.patch('/v2/schedule/home/:id', (req, res) => {schedule_v2.updateHomeTeamScore(req, res, knex);})
app.patch('/v2/schedule/visitor/:id', (req, res) => {schedule_v2.updateVisTeamScore(req, res, knex);})

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

app.get('/nhl-defense-leaders/', (req, res) => { nhl.getAllNhlDefenseStats(req, res) });

app.get('/nhl-rookie-leaders/summary', (req, res) => { nhl.getAllNHLRookieSummary(req, res) });

app.get('/nhl-stats/player', (req, res) => {
    if (req.query.pace) {
        nhl.getOnPaceNhlPlayerStats(req, res);
    } else {
        nhl.getNhlPlayerStats(req, res);
    }
});


app.get('/nhl-stats/career/:id', (req, res) => { nhl.getCareerNHLPlayerStats(req, res) });
app.get('/nhl-stats/player-info/:id', (req, res) => { nhl.getNhlPlayerInfo(req, res) });

// ****************************************************************************************
//                                      END VERSION 2
// ****************************************************************************************

app.listen(process.env.PORT || 3000, () => {
    console.log(`app is running on port ${process.env.PORT}`);
});
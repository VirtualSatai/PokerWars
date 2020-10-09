const ANLI = require("./ANLI");
const BasicBitch = require("./BasicBitch");
const JFC = require("./JFC");
const MAF = require("./MAF");
const SteveBuchemi = require("./SteveBuchemi");
const TRBA = require("./TRBA");
const brj = require("./brj");
const dam = require("./dam");
const jman = require("./jman");
const jofr = require("./jofr");
const steinBagger = require("./steinBagger");
const tbk = require("./TBK");
const tbknew = require("./challenger.js");
const TBK = require("./TBK");

var NUMBER_OF_TOURNAMENTS = 5000,
    HANDS_PER_ROUND = 8,
    CHIPS = 1000,
    MAXROUNDS = 1000,
    BLINDS = [10, 15, 25, 40, 60, 85, 110, 140, 175, 215, 260, 305, 355];

var MachinePoker = require("machine-poker"),
  JsSeat = MachinePoker.seats.JsLocal;
    async = require('async'),
    noLimitWithIncreasingBlinds = require('./src/bettings/no_limit_with_increasing_blinds')
    assert = require('assert');

var redColor = '\033[31m',
    greenColor = '\033[32m',
    blueColor = '\033[34m',
    resetColor = '\033[0m';

var currentBlinds = BLINDS

var bots = [
  { player: JsSeat.create(ANLI) },
  { player: JsSeat.create(BasicBitch) },
  { player: JsSeat.create(JFC) },
  { player: JsSeat.create(MAF) },
  { player: JsSeat.create(SteveBuchemi) },
  { player: JsSeat.create(TRBA) },
  { player: JsSeat.create(brj) },
  { player: JsSeat.create(dam) },
  { player: JsSeat.create(TBK) },
  { player: JsSeat.create(jofr) },
  { player: JsSeat.create(steinBagger) },
  //  { player: JsSeat.create(TBK) },
  { player: JsSeat.create(tbknew) },
];


function reset(){
    bots.forEach(bot => {
        bot.tournamentsPlayed = 0;
        bot.busted = false;
        bot.chips = CHIPS;
    });
    currentBlinds = BLINDS
}

function runTournaments(n, next) {
    reset();
    async.timesSeries(
        MAXROUNDS,
        runRounds,
        function(err, winnings) {
            var payout = winnings[winnings.length-1][0].payout;
            var winner = winnings[winnings.length-1][0].player.name;
            if (playerWinnings[winner]) {
                playerWinnings[winner] += 1;
            } else {
                playerWinnings[winner] = 1;
            }
            /*var runnerUp = ""
            winnings[winnings.length-2].forEach(bot => {
                if(bot.payout === payout * -1){
                    runnerUp = bot.player.name;
                }
            });
            if(runnerUp === ""){
                largestStack = 0
                winnings[winnings.length-2].forEach(bot => {
                    if(bot.payout < largestStack){
                        largestStack = bot.payout
                        runnerUp = bot.player.name;
                    }
                });
            }
            if (playerWinnings[runnerUp]) {
                playerWinnings[runnerUp] += 25;
            } else {
                playerWinnings[runnerUp] = 25;
            }*/
            var sortedPlayers = [];
            for (var player in playerWinnings){
                sortedPlayers.push([player, playerWinnings[player]]);
            }
            sortedPlayers.sort((a,b) => {
                return b[1] - a[1];
            });
            /*res = "";
            for (var i = 0; i < sortedPlayers.length; i++){
            
                res += sortedPlayers[i][0] + "\t\t " + sortedPlayers[i][1]
                res += "\n"
                console.log(sortedPlayers[i][0] + ": " + sortedPlayers[i][1])
            }*/
            console.clear();
            console.table(sortedPlayers);
            //console.log(res);
            next(null, playerWinnings);
        });
    
}

function runRounds(n, next){

    var selectedBots = selectNextBots();

    if(selectedBots.length == 1){
        
        next("done", selectedBots);
        return;
    }

    var opts = {
        maxRounds: HANDS_PER_ROUND,
        chips: CHIPS,
        betting: noLimitWithIncreasingBlinds(currentBlinds,selectedBots.length)
    }

    var table = MachinePoker.create(opts);
    var rounds = 0
    table.addPlayers(selectedBots);
    table.on('roundStart', function(data) {
        rounds++;
    })
    table.on('tournamentComplete', function(players) {
        selectedBots.forEach(bot => {
            player = players.filter(player => player.name === bot.player.name)[0];
            bot.busted = player.chips <= 0;
            if(bot.busted){
                currentBlinds = currentBlinds.slice(1, currentBlinds.length)
            }
            bot.chips = player.chips;
            bot.payout = player.payout;
            bot.tournamentsPlayed++;
        });

        //printTournamentResults(selectedBots);
        next(null, selectedBots);
    });
    table.start();
    
    
}

function selectNextBots(){
    var activeBots = bots.filter(bot => !bot.busted);
    if (activeBots.length <= 8) {
        return activeBots;
    }
    var lowestTournamentsPlayed = activeBots.reduce((min, bot) => 
        bot.tournamentsPlayed < min ? bot.tournamentsPlayed : min, bots[0].tournamentsPlayed);
    var selectedBots = activeBots.filter(bot => bot.tournamentsPlayed == lowestTournamentsPlayed);
    if (selectedBots.length == 8) {
        return selectedBots;
    } else if (selectedBots.length > 8) {
        shuffle(selectedBots);
        return selectedBots.slice(0, 8);
    } else {
        var i = 1;
        while(selectedBots.length < 8 && selectedBots.length < activeBots.length){
            var nextBots = activeBots.filter(bot => bot.tournamentsPlayed == lowestTournamentsPlayed + i);
            shuffle(nextBots);
            var lowBotCount = selectedBots.length;
            for (let index = 0; index < 8 - lowBotCount && index < nextBots.length; index++) {
                selectedBots.push(nextBots[index]);
            }
            i++;
        }
        return selectedBots;
        
    }
}

function shuffle(array) {
    var m = array.length, t, i;
  
    // While there remain elements to shuffle…
    while (m) {
  
      // Pick a remaining element…
      i = Math.floor(Math.random() * m--);
  
      // And swap it with the current element.
      t = array[m];
      array[m] = array[i];
      array[i] = t;
    }
  
    return array;
  }

function printTournamentResults(selectedBots) {
    console.log(resetColor);
    console.log("Player Standings");
    console.log(resetColor);
    var sortable = [];
    selectedBots.sort((bot1, bot2) => bot1.chips - bot2.chips);

    selectedBots.forEach(bot => {
        if (bot.chips == 0) {
            console.log(redColor + bot.player.name + " is out of the tournamnet!" + resetColor);
        } else {
            console.log(greenColor + bot.player.name + " is still in it with " + bot.chips  + "$" + resetColor);
        }
    });
}

var playerWinnings = {}

function benchmark() {
    console.log("\n\n===Starting Tournament===\n\n");
    async.timesSeries(
        NUMBER_OF_TOURNAMENTS,
        runTournaments,
        function(err, winnings) {
        });
}

benchmark();
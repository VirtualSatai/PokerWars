const { couldStartTrivia } = require("typescript");

var PreFlopRange = require("./range").PreFlopRange;
var Hand = require("pokersolver").Hand;

function getBigBlind(game) {
  return Math.max(...game.players.map((x) => x.blind));
}


function getPotSize(game) {
  var arr = game.players.map((x) => x.wagered)
  var arrSum = arr => arr.reduce((a,b) => a+b);
  return arr.reduce((a,b) => a+b);
}

function getActivePlayers(game) {
  var arr = game.players.map((x) => x.wagered)
  return arr.reduce((a,b) => a+b);
}


module.exports = function () {

  var info = {
    name: "Brunson Bot v10.2",
    email: "jfc@netcompany.com",
    btcWallet: ""
  };

  function update(game) {
    if (game.state !== "complete") {

      var remainingBigBlinds = game.self.chips / getBigBlind(game)
      var totalPot = getPotSize(game)
      
      //console.log(remainingBigBlinds)
      //console.log(totalPot)
      //console.log(game)
      //console.log(game.self)
      //console.log(game.players)
      //console.log(game.players[0])

      if(game.state === "pre-flop") {

        var allInRange = new PreFlopRange("JJ+");

        var raiseRange = new PreFlopRange("88+, A9s+, KTs+, QJs, T2s, AQo+ "); 
        var callRange = new PreFlopRange("77+, A8s+, K9s+, Q9s+, JTs, ATo+, KJo+"); 
        
        if(allInRange.isHandInRange(game.self.cards)
        || remainingBigBlinds < 20  ){ //TODO: wait for people to bet a few times before shoving
          return game.self.chips;
        } else if(raiseRange.isHandInRange(game.self.cards)){
          return game.betting.raise;
        } else if (callRange.isHandInRange(game.self.cards)){
          return game.betting.call;
        } else {
          return 0;
        }

      } else {
          
        var hand = Hand.solve(game.self.cards.concat(game.community));
        //console.log(hand.rank)
        if ((remainingBigBlinds < 10) && (hand.rank > 2))
        {
          return game.self.chips
        }
        else if (hand.rank > 4){
          return game.self.chips;
        }
        else if (hand.rank > 3){
          return 0.75 * totalPot;
        }
        else if (hand.rank > 2){
          return 0.35 * totalPot;
        } else if (hand.rank === 2){
          return game.betting.call;
        } else {
          return 0;
        }

      }
    }
  }

  return { update: update, info: info }

}

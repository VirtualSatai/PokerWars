var PreFlopRange = require("./range").PreFlopRange;
var Hand = require("pokersolver").Hand;

module.exports = function () {

  var info = {
    name: "Steve Buchemi",
    email: "jrm",
    btcWallet: "SteveBuchemisWallet"
  };

  function update(game) {
    if (game.state !== "complete") {
      var allInRange = new PreFlopRange("AA");
      var myHand = Hand.solve(game.self.cards.concat(game.community));
      var anyAllIn = game.players.find(x => x.state === 'allIn') ? true : false;

      if (game.state === "pre-flop") {

        var raiseRange = new PreFlopRange("22+, AKs");
        var callRange = new PreFlopRange("22-TT, ATs+, AQo+, KQs");
        
        if(raiseRange.isHandInRange(game.self.cards)){
          return game.betting.raise;
        } else if (myHand.rank > 2){
          return game.betting.call;
        } else {
          return 0;
        }

      } else if (game.state === "river") {
        if (allInRange.isHandInRange(game.self.cards) && (myHand.rank === 10)) {
          return game.self.chips;
        } else {
          if (anyAllIn) {
            return 0;
          } else if (myHand.rank > 5) {
            return game.betting.raise;
          } else if (myHand.rank > 2) {
            return game.betting.call;
          } else {
            return 0;
          }
        }
      } else if (game.state === "turn") {
        if (allInRange.isHandInRange(game.self.cards) && (myHand.rank === 10)) {
          return game.self.chips;
        } else {
          if (anyAllIn) {
            return 0;
          } else if (myHand.rank > 5) {
            return game.betting.raise;
          } else if (myHand.rank > 2) {
            return game.betting.call;
          } else {
            return 0;
          }
        }
      } else {
        if (Math.random() > 0.5) {
          if (Math.random() > 0.5) {
            return game.betting.raise;
          } else {
            return game.betting.call;
          }
        } else {
          if (myHand.rank > 5) {
            return game.betting.raise + Math.floor(Math.random() * Math.floor(50));
          } else if (myHand.rank > 2) {
            return game.betting.raise;
          } else if (myHand.rank === 2){
            return game.betting.call;
          } else {
            return 0;
          } 
        }
      }
    }
  }

  return { update: update, info: info }

}

var PreFlopRange = require("./range").PreFlopRange;
var Hand = require("pokersolver").Hand;

module.exports = function () {

  var info = {
    name: "Angus \'Pothole\' McDuck",
    email: "",
    btcWallet: ""
  };

  function getBigBlind(game) {
    return Math.max(...game.players.map((x) => x.blind));
  }

  function update(game) {
    if (game.state !== "complete") {

      if(game.state === "pre-flop"){

        var raiseRange = new PreFlopRange("77+, A9s+, K9s+, Q9s+, J9s+, T9s, ATo+");

        if(raiseRange.isHandInRange(game.self.cards)){
          return game.betting.raise; 
        } else {
          return 0;
        }

      } else {

        var hand = Hand.solve(game.self.cards.concat(game.community));

        if (hand.rank < 4){
          return 0;
        } else if (hand.rank < 5){
          return game.betting.call;
        } else if (hand.rank < 8){
          return game.betting.raise;
        }
        else {
          return game.betting.raise;
        }

      }
    }
  }

  return { update: update, info: info }

}
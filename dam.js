const { isConstructorDeclaration } = require("typescript");

var PreFlopRange = require("./range").PreFlopRange;
var Hand = require("pokersolver").Hand;

module.exports = function () {

  var info = {
    name: "TBD",
    email: "",
    btcWallet: ""
  };

  function update(game) {
    if (game.state !== "complete") {
      var raiseRange = new PreFlopRange("JJ+, AKs");
      var callRange = new PreFlopRange("22-TT, ATs+, AQo+, KQs, AJ, QJ");
      if(game.state === "pre-flop"){
        game.self.brain = { memory: 0}

        
        if(raiseRange.isHandInRange(game.self.cards)){
          return game.betting.raise;
        } else if (callRange.isHandInRange(game.self.cards)){
          return game.betting.call;
        } else if(game.betting.call <= getBigBlind(game)){
          return game.betting.call;
        } else {
          // console.log("Raise: " + game.betting.raise + " BigBlind: " + getBigBlind(game))
          return 0;
        }

      } else {
        var allin = game.self.chips;
        var hand = Hand.solve(game.self.cards.concat(game.community));
        var communityHand = Hand.solve(game.community);
        var ownHand = Hand.solve(game.self.cards);
        if(communityHand.rank < 4 && raiseRange.isHandInRange(game.self.cards)){
          console.log("AllIn: " +allin);
          game.betting.raise = allin;
          return game.betting.raise;
        }
        if(communityHand.rank < 4 && raiseRange.isHandInRange(game.self.cards)){
          game.betting.raise = allin/5;
          return game.betting.raise;
        }
        if(hand.rank > 5 && ownHand.Rank > 1){
          game.betting.raise = game.betting.raise * 4;
          return game.betting.raise;
        }
        if(hand.rank > 4 && Math.max(game.betting.raise < game.self.chips/10, getBigBlind(game)*2)){
          game.betting.raise = game.betting.raise * 2;
          return game.betting.raise;
        }
        if (hand.rank > 2 && game.betting.raise < Math.max((getBigBlind(game)*2), game.self.wagered*3)){
          return game.betting.raise;
        } else if (hand.rank === 2){
          return game.betting.call;
        } else if((callRange.isHandInRange(game.self.cards) || raiseRange.isHandInRange(game.self.cards)) && (game.state == "flop" || game.state == "turn") && game.betting.raise < (getBigBlind(game)*2)){
          
          return game.call;
        } else {
          return 0;
        }

      }
    }else {
      // console.log(game.self.actions);
      for(var prop in game.self.actions){
        // console.log(prop);
        var property = game.self.actions[prop][0];
        var type = property["type"];
        // if(type == "raise" && property.betting.raise > 1000){
        //   console.log("ALLIN");
        // }
        var tmp = "";
      }
  } 
}

  return { update: update, info: info }

}

function getBigBlind(game) {
  return Math.max(...game.players.map((x) => x.blind));
}

var PreFlopRange = require("./range").PreFlopRange;
var Hand = require("pokersolver").Hand;

module.exports = function () {

  var info = {
    name: "schwartz",
    email: "",
    btcWallet: "SteinBagger"
  };

//////

  function setRaisePreFlop(game) {
    // Raise 15 %
    var raiseRange = new PreFlopRange("66+, A5s+, K9s+, Q9s+, JTs, ATo+, KJo+");
    if(getActive(game) === 3) {
        raiseRange = new PreFlopRange("66+, A5s+, K9s+, QTs+, JTs, ATo+, KJo+");
    }
    if(getActive(game) === 2) {
        raiseRange = new PreFlopRange("55+, A7s+, K9s+, QTs+, A9o+, KJo+");
    }

     if(game.self.blind != 0) {
         // Raise 47 %
         raiseRange = new PreFlopRange("22+, A2s+, K2s+, Q2s+, J3s+, T6s+, 96s+, 86s+, 76s, A2o+, K6o+, Q8o+, J8o+, T8o+");
         if(getActive(game) === 3) {
            raiseRange = new PreFlopRange("22+, A2s+, K2s+, Q2s+, J4s+, T6s+, 96s+, 87s, A2o+, K5o+, Q7o+, J8o+, T9o");
        }
        if(getActive(game) === 2) {
            raiseRange = new PreFlopRange("22+, A2s+, K2s+, Q2s+, J6s+, T7s+, 98s, A2o+, K3o+, Q7o+, J8o+, T9o");
        }
     }

    return raiseRange;
 }

 function setCallPreFlop(game) {
     // Call 35 %
    var callRange = new PreFlopRange("33+, A2s+, K2s+, Q4s+, J7s+, T7s+, 97s+, 87s, A5o+, K8o+, Q9o+, J9o+");
    if(getActive(game) === 3) {
        callRange = new PreFlopRange("44+, A2s+, K2s+, Q6s+, J7s+, T8s+, 98s, A3o+, K7o+, Q9o+, JTo");
    }
    if(getActive(game) === 2) {
        callRange = new PreFlopRange("33+, A2s+, K3s+, Q6s+, J8s+, T9s, A2o+, K7o+, Q9o+, JTo");
    }

     if(game.self.blind != 0) {
         // Call 70 %
         callRange = new PreFlopRange("22+, A2s+, K2s+, Q2s+, J2s+, T2s+, 92s+, 82s+, 73s+, 63s+, 53s+, 43s, A2o+, K2o+, Q3o+, J5o+, T6o+, 97o+, 86o+");
         if(getActive(game) === 3) {
            callRange = new PreFlopRange("22+, A2s+, K2s+, Q2s+, J2s+, T2s+, 92s+, 84s+, 74s+, 64s+, 53s+, A2o+, K2o+, Q2o+, J4o+, T6o+, 96o+, 87o");
        }
        if(getActive(game) === 2) {
            callRange = new PreFlopRange("22+, A2s+, K2s+, Q2s+, J2s+, T2s+, 93s+, 85s+, 75s+, A2o+, K2o+, Q2o+, J2o+, T5o+, 97o+, 87o");
        }
     }

    return callRange;
 }

 function getActive(game) {
    let numberOfPlayers = 0;
    game.players.forEach(element => {
        if(element.state === 'active') numberOfPlayers = numberOfPlayers + 1;
     });
     return numberOfPlayers;
 }

 function returnAtFlop(hand, game) {
  if (hand.rank > 2){
    return game.betting.raise;
  } else if (hand.rank === 2){
    return game.betting.call;
  }
  return 0;
 }

 function returnAtRiver(hand, game) {
  if (hand.rank > 2){
    return game.betting.raise;
  } else if (hand.rank === 2){
    return game.betting.call;
  }
  return 0;
 }

 function returnATurn(hand, game) {
  if (hand.rank > 2){
    return game.betting.raise;
  } else if (hand.rank === 2){
    return game.betting.call;
  }
  return 0;
 }

 //////

  function update(game) {
    if (game.state !== "complete") {

      if(game.state === "pre-flop"){

        var raiseRange = setRaisePreFlop(game);
        var callRange = setCallPreFlop(game);
        
        if(raiseRange.isHandInRange(game.self.cards)){
          return game.betting.raise;
        } else if (callRange.isHandInRange(game.self.cards)){
          return game.betting.call;
        } else {
          return 0;
        }

      } else {
        var hand = Hand.solve(game.self.cards.concat(game.community));

        if(game.state === 'flop') {
          return returnAtFlop(hand, game);
        }
        if (game.state === 'river') {
          return returnAtRiver(hand, game);
        }
        return returnATurn(hand, game);
      }
    }
  }

  return { update: update, info: info }
}

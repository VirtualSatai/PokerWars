var PreFlopRange = require("./range").PreFlopRange;
var Hand = require("pokersolver").Hand;

module.exports = function () {

  var info = {
    name: "JMAN",
    email: "",
    btcWallet: ""
  };

  function GetBigBlind({players}){
    return players.reduce((bigBlind, {blind}) => Math.max(bigBlind, blind), 0)
  }

  function GetPot({betting}){
    return betting.call;
  }

  function BetSoFar(game) {
    var actions = Object.entries(game.self.actions).map(([type, actions]) => actions).flatMap(actions => actions);
    return (actions || []).reduce((acc, {bet}) => bet ? acc+bet : acc, 0);
  }

  function RoundsSoFar(game) {
    var actions = Object.entries(game.self.actions).map(([type, actions]) => actions).flatMap(actions => actions);
    return actions.lenght;
  }

  function update(game) {
    if (game.state !== "complete") {
      const call = game.betting.call;
      const raise = game.betting.raise;
      if(game.state === "pre-flop"){
        var highRaiseRange = new PreFlopRange("77+, A9s+, KTs+, QJs, AJo+, KQo");
        var raiseRange = new PreFlopRange("JJ+, AKs");
        var callRange = new PreFlopRange("55+, A2s+, K5s+, Q8s+, J8s+, T9s, A8o+, K9o+, QTo+, JTo");

        if(highRaiseRange.isHandInRange(game.self.cards) && game.betting.canRaise){
          if(raise < game.self.chips * 0.60){
            return raise * 2;
          } else if (call < game.self.chips * 0.60){
            return call;
          }
        } else if(raiseRange.isHandInRange(game.self.cards) && game.betting.canRaise){
          if(call < game.self.chips * 0.30){
            return call;
          }
        } else if (callRange.isHandInRange(game.self.cards) && call < game.self.chips * 0.05){
         if (call < game.self.chips * 0.15){
            return call;
         }
        } else {
          return 0;
        }

      } else {
        const betSofar = BetSoFar(game);
        var hand = Hand.solve(game.self.cards.concat(game.community));
        if(hand.rank >= 6){
          return game.self.chips;
        }
        if(hand.rank === 5) {
          if(call > 0 && call < game.self.chips*0.40 ){
            return game.betting.call;
          } else if (raise < game.self.chips*0.60) {
            return raise;
          } else if(call == 0){
            return raise;
          }
        }
        if(hand.rank === 4){
          if(call > 0 && call < Math.max(GetBigBlind(game), betSofar*0.05) ){
            return game.betting.call;
          } else if (raise < Math.max(GetBigBlind(game), betSofar*0.10)) {
            return raise;
          } else if(call == 0){
            return call;
          }
        }
        if (hand.rank >= 2 && game.betting.call == 0){
          //const betSoFar = BetSoFar(game);
          return game.betting.call;
        } else {
          return 0;
        }

      }
    } else {
      // var hand = Hand.solve(game.self.cards.concat(game.community));
      // if(game.self.payout > 0){
      //   //console.log("Rank: " + hand.rank + " Desc: " + hand.descr + " Payout:" + game.self.payout);
      // } else if (game.self.payout < (-GetBigBlind(game))){
      //   if(hand.rank < 5 && game.self.payout < (-200)){
      //    console.log("test");
      //   }
      //   console.log("Rank: " + hand.rank + " Desc: " + hand.descr + " Payout:" + game.self.payout);
      // }
    }
  }

  return { update: update, info: info }

}

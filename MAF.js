var PreFlopRange = require("./range").PreFlopRange;
var Hand = require("pokersolver").Hand;

module.exports = function () {
  var info = {
    name: "Named Challenger",
    email: "maf@netcompany.com",
    btcWallet: "not relevant",
  };

  //1 = Højt kort
  //2 = Et Par
  //3 = To Par
  //4 = Tre ens
  //5 = Straight
  //6 = Flush
  //7 = House
  //8 = 4 ens
  //9 = Straight Flush
  //10 = Royal Straight Flush

  function getBigBlind(game) {
    return Math.max(...game.players.map((x) => x.blind));
  }

  function update(game) {
    if (game.state !== "complete") {
      //Community Hand
      var hand = Hand.solve(game.self.cards.concat(game.community));
      var ownHand = Hand.solve(game.self.cards);
      var boardHand = null;

      if (game.state !== "pre-flop") {
        boardHand = Hand.solve(game.community);
      }

      var allInAmount = game.self.chips;

      var remainingPlayers = ""; //TODO

      if (game.state === "pre-flop") {
        var raiseRange = new PreFlopRange("JJ+, AKs");
        var callRange = new PreFlopRange("66-TT, ATs+, AQo+, KQs");
        var allInRange = new PreFlopRange("AA");

        var hardRaiseRange = new PreFlopRange("KK, AKs");

        //If AA on preflop - always all in
        if (allInRange.isHandInRange(game.self.cards)) {
          // console.log("[PREFLOP] Pocket rockets => All in");
          return allInAmount;
        }

        if (getBigBlind(game) >= allInAmount) {
          // console.log("[PREFLOP] Big blind exceeded own chips => I feel lucky....");
          return allInAmount;
        }

        if (hardRaiseRange.isHandInRange(game.self.cards)) {
          // console.log("[PREFLOP] KK or AKs => Hard raise");
          return game.betting.raise * 2;
        } else if (raiseRange.isHandInRange(game.self.cards)) {
          return game.betting.raise;
        } else if (callRange.isHandInRange(game.self.cards) && game.betting.call < allInAmount / 3) {
          return game.betting.call;
        } else {
          return 0;
        }
      } else if (game.state === "flop") {
        //Hvis hand rank er større end
        if (hand.rank > boardHand.rank + 1) {
          // console.log("[FLOP] Rank er mindst to større end bord Rank => All in")
          return allInAmount;
        }

        //Hvis hand rank er større end
        if (hand.rank > boardHand.rank) {
          var bet = Math.max(getBigBlind(game) * 4, game.betting.raise);
          // console.log("[FLOP] Rank er større end bord Rank => better " + bet);
          return bet;
        }

        //Hvis 2 par på floppet - all in
        if (hand.rank >= 2) {
          // console.log("[FLOP] Der er to par - god sandsynlighed for at jeg er skyld i det")
          return Math.max(getBigBlind(game) * 4, game.betting.raise);
        }

        return 0;
      } else if (game.state === "turn") {
        if (hand.rank > 6) {
          // console.log("[TURN] Rank er 6+ => All in")
          return allInAmount;
        }

        //Hvis hand rank er større end
        if (hand.rank > boardHand.rank + 1) {
          // console.log("[TURN] Rank er mindst to større end bord Rank => All in")
          return allInAmount;
        }

        //Hvis hand rank er større end
        if (hand.rank > boardHand.rank) {
          // console.log("[TURN] Rank er to større end bord Rank => All in")
          return Math.max(getBigBlind(game) * 4, game.betting.raise);
        }

        if (game.betting.call > allInAmount / 2) {
          // console.log("[TURN] Call-prisen er halvdelen af mine chips. Vi skal ikke være med...");
          return 0;
        }

        //Hvis 2 par på floppet - all in
        if (hand.rank >= 2) {
          // console.log("[TURN] Der er to par - god sandsynlighed for at jeg er skyld i det")
          return Math.max(getBigBlind(game) * 4, game.betting.raise);
        }

        return 0;
      } else {
        //RIVER

        if (hand.rank > 6) {
          // console.log("[RIVER] Rank er 6+ => All in")
          return allInAmount;
        }

        //Hvis hand rank er større end
        if (hand.rank > boardHand.rank + 1) {
          // console.log("[RIVER] Rank er mindst to større end bord Rank => All in")
          return allInAmount;
        }

        //Hvis hand rank er større end
        if (hand.rank > boardHand.rank) {
          // console.log("[RIVER] Rank er to større end bord Rank => Raise")
          return Math.max(getBigBlind(game) * 4, game.betting.raise);
        }

        if (game.betting.call > allInAmount / 2) {
          // console.log("[RIVER] Call-prisen er halvdelen af mine chips. Vi skal ikke være med...");
          return 0;
        }

        //Hvis 2 par
        if (hand.rank >= 2) {
          // console.log("[RIVER] Der er to par - caller")
          return game.betting.call;
        }

        return 0;
      }
    }
  }

  return { update: update, info: info };
};

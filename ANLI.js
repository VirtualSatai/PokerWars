var PreFlopRange = require("./range").PreFlopRange;
var Hand = require("pokersolver").Hand;

module.exports = function () {

  var info = {
    name: "ANLI",
    email: "anli@netcompany.com",
    btcWallet: ""
  };

  function initial(game) {
    var result = 0
    if (game.betting !== null) {
      result = game.betting.call
    }
    return result
  }
  function preFlop(game, blind, blinds) {
    var result = initial(game);
    var allInRange = new PreFlopRange("KK+");
    var raiseRange = new PreFlopRange("55+, A2s+, K5s+, Q8s+, J8s+, T9s, A8o+, K9o+, QTo+, JTo");
    var callRange = new PreFlopRange("22+, A2s+, K2s+, Q2s+, J2s+, T5s+, 96s+, 86s+, 75s+, A2o+, K5o+, Q7o+, J8o+, T8o+");

    if (blinds > 10) {
      if (allInRange.isHandInRange(game.self.cards)) {
        result = game.self.chips;
      } else if (raiseRange.isHandInRange(game.self.cards)) {
        result = game.betting.raise;
      } else if (callRange.isHandInRange(game.self.cards)) {
        result = game.betting.call;
      } else {
        result = 0;
      }
    } else {
      if (callRange.isHandInRange(game.self.cards)) {
        result = game.self.chips;
      } else {
        result = 0
      }
    }
    return result
  }
  function flop(game, hand, blind, blinds) {
    var result = initial(game);
    if (blinds > 10) {
      if (hand.rank >= 5) {
        result = game.self.chips
      } else if (hand.rank >= 2) {
        result = game.betting.raise;
      } else if (hand.rank <= 1) {
        result = 0
      }
    } else {
      if (hand.rank >= 3) {
        result = game.self.chips
      } else {
        result = 0
      }
    }
    return result;
  }
  function turn(game, hand, blind, blinds) {
    var result = initial(game);
    if (blinds > 10) {
      if (hand.rank >= 5) {
        result = game.self.chips
      } else if (hand.rank >= 2) {
        result = game.betting.raise;
      } else if (hand.rank <= 1) {
        result = 0
      }
    } else {
      if (hand.rank >= 3) {
        result = game.self.chips
      } else {
        result = 0
      }
    }
    return result;
  }
  function river(game, hand, blind, blinds) {
    var result = initial(game);
    if (blinds > 10) {
      if (hand.rank >= 5) {
        result = game.self.chips
      } else if (hand.rank >= 2) {
        result = game.betting.raise;
      } else if (hand.rank <= 1) {
        result = 0
      }
    } else {
      if (hand.rank >= 3) {
        result = game.self.chips
      } else {
        result = 0
      }
    }
    return result;
  }
  function update(game) {
    var result = initial(game);
    var blind = Math.max(game.players[0].blind, game.players[1].blind)
    var blinds = Math.floor(game.self.chips / blind)
    var hand = Hand.solve(game.self.cards.concat(game.community));
    switch (game.state) {
      case "pre-flop":
        result = preFlop(game, blind, blinds);
        break;
      case "flop":
        result = flop(game, hand, blind, blinds);
        break;
      case "turn":
        result = turn(game, hand, blind, blinds);
        break;
      case "river":
        result = river(game, hand, blind, blinds);
        break;
      default:
    }
    return result
  }

  return { update: update, info: info }

}

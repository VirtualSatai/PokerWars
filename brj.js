var PreFlopRange = require("./range").PreFlopRange;
var Hand = require("pokersolver").Hand;
var OddsCalculator = require("poker-odds-calculator").OddsCalculator;
var CardGroup = require("poker-odds-calculator").CardGroup;

var allCards = [
  "2c",
  "3c",
  "4c",
  "5c",
  "6c",
  "7c",
  "8c",
  "9c",
  "10c",
  "Jc",
  "Qc",
  "Kc",
  "Ac",
  "2d",
  "3d",
  "4d",
  "5d",
  "6d",
  "7d",
  "8d",
  "9d",
  "10d",
  "Jd",
  "Qd",
  "Kd",
  "Ad",
  "2s",
  "3s",
  "4s",
  "5s",
  "6s",
  "7s",
  "8s",
  "9s",
  "10s",
  "Js",
  "Qs",
  "Ks",
  "As",
  "2h",
  "3h",
  "4h",
  "5h",
  "6h",
  "7h",
  "8h",
  "9h",
  "10h",
  "Jh",
  "Qh",
  "Kh",
  "Ah",
];

module.exports = function () {
  var info = {
    name: "Русский бот",
    email: "",
    btcWallet: "",
  };

  function update(game) {
    if (game.state !== "complete") {
      var numActive = 0;
      var pot = 0;
      var timetoAct = false;
      game.players.forEach((player) => {
        if (player.state === "active" || player.state === "allIn") {
          numActive++;
        }
        pot += player.wagered;
        if (player.blind >= 350) {
          timetoAct = true;
        }

        if (player.wagered >= game.self.chips + 300) {
          return 0;
        }
      });

      var hasPair = Hand.solve(game.self.cards).rank == 2;

      if (hasPair && game.state == "pre-flop") {
        return game.betting.raise + 100 + pot / 30;
      }

      var hand = Hand.solve(game.self.cards.concat(game.community));

      if (hand.rank > 6) {
        return game.self.chips;
      }

      if (game.self.chips <= 100) {
        return game.self.chips;
      }

      if (numActive > 5) {
        return game.betting.call;
      }

      if (timetoAct) {
        return game.self.chips;
      }

      //var hand = Hand.solve(game.self.cards.concat(game.community));

      /*       if (hand.rank > 2){
        return game.betting.raise;
      } else if (hand.rank === 2){
        return game.betting.call;
      } else {
        return 0;
      } */

      /* var availCards = game.self.cards.concat(game.community);
      var randCard = allCards.filter(function (el) {
        return !availCards.includes(el);
      });

      var playersNow = [];
      for (let i = 0; i < numActive; i++) {
        for (let j = 0; j < 2; j++) {
          playersNow = array.splice(
            Math.floor(Math.random() * array.length),
            1
          );
        }
      }

      var randoCards = [], size = 2;

      while (playersNow.length > 0) randoCards.push(playersNow.splice(0, size));

      const player1Cards = CardGroup.fromString(game.self.cards.join(''));


      
      const board = CardGroup.fromString(game.community.join('')); 

             const result = OddsCalculator.calculate(
              randoCards,
        board
      );  */

      //console.log(`Player #1 - ${player1Cards} - ${result.equities[0].getEquity()}%`);
      //console.log(`Player #2 - ${player2Cards} - ${result.equities[1].getEquity()}%`);
    }

    return 0;
  }

  return { update: update, info: info };
};

var PreFlopRange = require("./range").PreFlopRange;
var Hand = require("pokersolver").Hand;
const numberOfBigBlindsBeforeDesperation = 10;

const allRanges = [
  new PreFlopRange("KK+"), // 1%
  new PreFlopRange("JJ+"), // 2%
  new PreFlopRange("99+"), // 3%
  new PreFlopRange("88+, AQs+"), // 4%
  new PreFlopRange("88+, AQs+, AKo"), // 5%
  new PreFlopRange("77+, ATs+, AKo"), // 6%
  new PreFlopRange("77+, ATs+, KQs, AQo+"), // 7%
  new PreFlopRange("77+, ATs+, KQs, AJo+"), // 8%
  new PreFlopRange("66+, A9s+, KJs+, AJo+"), // 9%
  new PreFlopRange("66+, A9s+, KTs+, AJo+"), // 10%
  new PreFlopRange("66+, A8s+, KTs+, ATo+"), // 11%
  new PreFlopRange("66+, A7s+, KTs+, QJs, ATo+, KQo"), // 12%
  new PreFlopRange("66+, A7s+, KTs+, QJs, ATo+, KJo+"), // 13%
  new PreFlopRange("66+, A7s+, K9s+, QJs, ATo+, KJo+"), // 14%
  new PreFlopRange("55+, A7s+, K9s+, QTs+, A9o+, KJo+"), // 15%
  new PreFlopRange("55+, A5s+, K9s+, QTs+, A9o+, KJo+"), // 16%
  new PreFlopRange("55+, A4s+, K9s+, QTs+, A8o+, KJo+"), // 17%
  new PreFlopRange("55+, A4s+, K8s+, QTs+, A8o+, KTo+"), // 18%
  new PreFlopRange("55+, A4s+, K8s+, Q9s+, A8o+, KTo+"), // 19%
  new PreFlopRange("55+, A4s+, K8s+, Q9s+, A7o+, KTo+, QJo"), // 20%
  new PreFlopRange("55+, A3s+, K7s+, Q9s+, JTs, A7o+, KTo+, QJo"), // 21%
  new PreFlopRange("44+, A2s+, K7s+, Q9s+, JTs, A7o+, KTo+, QJo"), // 22%
  new PreFlopRange("44+, A2s+, K7s+, Q9s+, JTs, A7o+, K9o+, QJo"), // 23%
  new PreFlopRange("44+, A2s+, K6s+, Q9s+, JTs, A7o+, K9o+, QTo+"), // 24%
  new PreFlopRange("44+, A2s+, K6s+, Q9s+, JTs, A7o+, A5o, K9o+, QTo+"), // 25%
  new PreFlopRange("44+, A2s+, K6s+, Q8s+, JTs, A5o+, K9o+, QTo+"), // 26%
  new PreFlopRange("44+, A2s+, K5s+, Q8s+, J9s+, A5o+, K9o+, QTo+"), // 27%
  new PreFlopRange("44+, A2s+, K5s+, Q8s+, J9s+, A4o+, K9o+, QTo+"), // 28%
  new PreFlopRange("44+, A2s+, K5s+, Q8s+, J9s+, A4o+, K8o+, QTo+"), // 29%
  new PreFlopRange("44+, A2s+, K4s+, Q8s+, J9s+, A4o+, K8o+, Q9o+"), // 30%
  new PreFlopRange("44+, A2s+, K4s+, Q8s+, J9s+, A3o+, K8o+, Q9o+"), // 31%
  new PreFlopRange("33+, A2s+, K4s+, Q7s+, J9s+, A3o+, K8o+, Q9o+, JTo"), // 32%
  new PreFlopRange("33+, A2s+, K4s+, Q7s+, J9s+, A3o+, K7o+, Q9o+, JTo"), // 33%
  new PreFlopRange("33+, A2s+, K4s+, Q7s+, J8s+, T9s, A3o+, K7o+, Q9o+, JTo"), // 34%
  new PreFlopRange("33+, A2s+, K3s+, Q6s+, J8s+, T9s, A2o+, K7o+, Q9o+, JTo"), // 35%
  new PreFlopRange("33+, A2s+, K2s+, Q6s+, J8s+, T9s, A2o+, K7o+, Q9o+, JTo"), // 36%
  new PreFlopRange("33+, A2s+, K2s+, Q6s+, J8s+, T9s, A2o+, K6o+, Q9o+, JTo"), // 37%
  new PreFlopRange("33+, A2s+, K2s+, Q5s+, J8s+, T9s, A2o+, K6o+, Q8o+, JTo"), // 38%
  new PreFlopRange("33+, A2s+, K2s+, Q5s+, J8s+, T9s, A2o+, K6o+, Q8o+, J9o+"), // 39%
  new PreFlopRange("33+, A2s+, K2s+, Q5s+, J7s+, T8s+, A2o+, K5o+, Q8o+, J9o+"), // 40%
  new PreFlopRange("33+, A2s+, K2s+, Q4s+, J7s+, T8s+, A2o+, K5o+, Q8o+, J9o+"), // 41%
  new PreFlopRange("22+, A2s+, K2s+, Q3s+, J7s+, T8s+, A2o+, K4o+, Q8o+, J9o+"), // 42%
  new PreFlopRange("22+, A2s+, K2s+, Q3s+, J7s+, T8s+, 98s, A2o+, K4o+, Q8o+, J9o+, T9o"), // 43%
  new PreFlopRange("22+, A2s+, K2s+, Q3s+, J7s+, T8s+, 98s, A2o+, K4o+, Q7o+, J9o+, T9o"), // 44%
  new PreFlopRange("22+, A2s+, K2s+, Q3s+, J6s+, T7s+, 98s, A2o+, K4o+, Q7o+, J9o+, T9o"), // 45%
  new PreFlopRange("22+, A2s+, K2s+, Q3s+, J6s+, T7s+, 98s, A2o+, K4o+, Q7o+, J8o+, T9o"), // 46%
  new PreFlopRange("22+, A2s+, K2s+, Q2s+, J6s+, T7s+, 98s, A2o+, K3o+, Q7o+, J8o+, T9o"), // 47%
  new PreFlopRange("22+, A2s+, K2s+, Q2s+, J5s+, T7s+, 98s, A2o+, K3o+, Q6o+, J8o+, T9o"), // 48%
  new PreFlopRange("22+, A2s+, K2s+, Q2s+, J5s+, T7s+, 98s, A2o+, K2o+, Q6o+, J8o+, T9o"), // 49%
  new PreFlopRange("22+, A2s+, K2s+, Q2s+, J5s+, T7s+, 98s, A2o+, K2o+, Q5o+, J8o+, T9o"), // 50%
  new PreFlopRange("22+, A2s+, K2s+, Q2s+, J5s+, T7s+, 98s, A2o+, K2o+, Q5o+, J8o+, T8o+"), // 51%
  new PreFlopRange("22+, A2s+, K2s+, Q2s+, J4s+, T7s+, 98s, A2o+, K2o+, Q5o+, J7o+, T8o+"), // 52%
  new PreFlopRange("22+, A2s+, K2s+, Q2s+, J3s+, T6s+, 97s+, A2o+, K2o+, Q5o+, J7o+, T8o+"), // 53%
  new PreFlopRange("22+, A2s+, K2s+, Q2s+, J3s+, T6s+, 97s+, 87s, A2o+, K2o+, Q4o+, J7o+, T8o+"), // 54%
  new PreFlopRange("22+, A2s+, K2s+, Q2s+, J2s+, T5s+, 96s+, 87s, A2o+, K2o+, Q4o+, J7o+, T8o+"), // 55%
  new PreFlopRange("22+, A2s+, K2s+, Q2s+, J2s+, T5s+, 96s+, 87s, A2o+, K2o+, Q4o+, J7o+, T8o+, 98o"), // 56%
  new PreFlopRange("22+, A2s+, K2s+, Q2s+, J2s+, T5s+, 96s+, 87s, A2o+, K2o+, Q4o+, J6o+, T8o+, 98o"), // 57%
  new PreFlopRange("22+, A2s+, K2s+, Q2s+, J2s+, T5s+, 96s+, 87s, A2o+, K2o+, Q3o+, J6o+, T8o+, 98o"), // 58%
  new PreFlopRange("22+, A2s+, K2s+, Q2s+, J2s+, T4s+, 96s+, 87s, A2o+, K2o+, Q3o+, J6o+, T7o+, 98o"), // 59%
  new PreFlopRange("22+, A2s+, K2s+, Q2s+, J2s+, T4s+, 96s+, 87s, A2o+, K2o+, Q2o+, J6o+, T7o+, 98o"), // 60%
  new PreFlopRange("22+, A2s+, K2s+, Q2s+, J2s+, T4s+, 96s+, 86s+, A2o+, K2o+, Q2o+, J5o+, T7o+, 98o"), // 61%
  new PreFlopRange("22+, A2s+, K2s+, Q2s+, J2s+, T3s+, 95s+, 86s+, A2o+, K2o+, Q2o+, J5o+, T7o+, 98o"), // 62%
  new PreFlopRange("22+, A2s+, K2s+, Q2s+, J2s+, T3s+, 95s+, 86s+, A2o+, K2o+, Q2o+, J5o+, T7o+, 97o+"), // 63%
  new PreFlopRange("22+, A2s+, K2s+, Q2s+, J2s+, T2s+, 95s+, 86s+, A2o+, K2o+, Q2o+, J5o+, T6o+, 97o+"), // 64%
  new PreFlopRange("22+, A2s+, K2s+, Q2s+, J2s+, T2s+, 95s+, 86s+, 76s, A2o+, K2o+, Q2o+, J4o+, T6o+, 97o+"), // 65%
  new PreFlopRange("22+, A2s+, K2s+, Q2s+, J2s+, T2s+, 95s+, 85s+, 76s, A2o+, K2o+, Q2o+, J3o+, T6o+, 97o+"), // 66%
  new PreFlopRange("22+, A2s+, K2s+, Q2s+, J2s+, T2s+, 94s+, 85s+, 76s, A2o+, K2o+, Q2o+, J3o+, T6o+, 97o+"), // 67%
  new PreFlopRange("22+, A2s+, K2s+, Q2s+, J2s+, T2s+, 94s+, 85s+, 75s+, A2o+, K2o+, Q2o+, J3o+, T6o+, 97o+, 87o"), // 68%
  new PreFlopRange("22+, A2s+, K2s+, Q2s+, J2s+, T2s+, 94s+, 85s+, 75s+, A2o+, K2o+, Q2o+, J2o+, T6o+, 97o+, 87o"), // 69%
  new PreFlopRange("22+, A2s+, K2s+, Q2s+, J2s+, T2s+, 93s+, 85s+, 75s+, A2o+, K2o+, Q2o+, J2o+, T5o+, 97o+, 87o"), // 70%
  new PreFlopRange("22+, A2s+, K2s+, Q2s+, J2s+, T2s+, 92s+, 85s+, 75s+, A2o+, K2o+, Q2o+, J2o+, T5o+, 96o+, 87o"), // 71%
  new PreFlopRange("22+, A2s+, K2s+, Q2s+, J2s+, T2s+, 92s+, 84s+, 75s+, 65s, A2o+, K2o+, Q2o+, J2o+, T5o+, 96o+, 87o"), // 72%
  new PreFlopRange("22+, A2s+, K2s+, Q2s+, J2s+, T2s+, 92s+, 84s+, 75s+, 65s, A2o+, K2o+, Q2o+, J2o+, T4o+, 96o+, 87o"), // 73%
  new PreFlopRange("22+, A2s+, K2s+, Q2s+, J2s+, T2s+, 92s+, 84s+, 75s+, 65s, A2o+, K2o+, Q2o+, J2o+, T4o+, 96o+, 86o+"), // 74%
  new PreFlopRange("22+, A2s+, K2s+, Q2s+, J2s+, T2s+, 92s+, 84s+, 74s+, 65s, A2o+, K2o+, Q2o+, J2o+, T3o+, 96o+, 86o+"), // 75%
  new PreFlopRange("22+, A2s+, K2s+, Q2s+, J2s+, T2s+, 92s+, 83s+, 74s+, 64s+, A2o+, K2o+, Q2o+, J2o+, T3o+, 95o+, 86o+"), // 76%
  new PreFlopRange("22+, A2s+, K2s+, Q2s+, J2s+, T2s+, 92s+, 83s+, 74s+, 64s+, A2o+, K2o+, Q2o+, J2o+, T3o+, 95o+, 86o+, 76o"), // 77%
  new PreFlopRange("22+, A2s+, K2s+, Q2s+, J2s+, T2s+, 92s+, 83s+, 74s+, 64s+, 54s, A2o+, K2o+, Q2o+, J2o+, T2o+, 95o+, 86o+, 76o"), // 78%
  new PreFlopRange("22+, A2s+, K2s+, Q2s+, J2s+, T2s+, 92s+, 82s+, 73s+, 64s+, 54s, A2o+, K2o+, Q2o+, J2o+, T2o+, 95o+, 86o+, 76o"), // 79%
  new PreFlopRange("22+, A2s+, K2s+, Q2s+, J2s+, T2s+, 92s+, 82s+, 73s+, 64s+, 54s, A2o+, K2o+, Q2o+, J2o+, T2o+, 95o+, 85o+, 76o"), // 80%
  new PreFlopRange("22+, A2s+, K2s+, Q2s+, J2s+, T2s+, 92s+, 82s+, 73s+, 63s+, 53s+, A2o+, K2o+, Q2o+, J2o+, T2o+, 94o+, 85o+, 76o"), // 81%
  new PreFlopRange("22+, A2s+, K2s+, Q2s+, J2s+, T2s+, 92s+, 82s+, 73s+, 63s+, 53s+, A2o+, K2o+, Q2o+, J2o+, T2o+, 94o+, 85o+, 75o+"), // 82%
  new PreFlopRange("22+, A2s+, K2s+, Q2s+, J2s+, T2s+, 92s+, 82s+, 73s+, 63s+, 53s+, A2o+, K2o+, Q2o+, J2o+, T2o+, 93o+, 85o+, 75o+"), // 83%
  new PreFlopRange("22+, A2s+, K2s+, Q2s+, J2s+, T2s+, 92s+, 82s+, 72s+, 63s+, 53s+, A2o+, K2o+, Q2o+, J2o+, T2o+, 93o+, 85o+, 75o+"), // 84%
  new PreFlopRange("22+, A2s+, K2s+, Q2s+, J2s+, T2s+, 92s+, 82s+, 72s+, 63s+, 53s+, A2o+, K2o+, Q2o+, J2o+, T2o+, 93o+, 84o+, 75o+, 65o"), // 85%
  new PreFlopRange("22+, A2s+, K2s+, Q2s+, J2s+, T2s+, 92s+, 82s+, 72s+, 63s+, 53s+, 43s, A2o+, K2o+, Q2o+, J2o+, T2o+, 93o+, 84o+, 75o+, 65o"), // 86%
  new PreFlopRange("22+, A2s+, K2s+, Q2s+, J2s+, T2s+, 92s+, 82s+, 72s+, 62s+, 52s+, 43s, A2o+, K2o+, Q2o+, J2o+, T2o+, 92o+, 84o+, 75o+, 65o"), // 87%
  new PreFlopRange("22+, A2s+, K2s+, Q2s+, J2s+, T2s+, 92s+, 82s+, 72s+, 62s+, 52s+, 42s+, A2o+, K2o+, Q2o+, J2o+, T2o+, 92o+, 84o+, 74o+, 65o"), // 88%
  new PreFlopRange("22+, A2s+, K2s+, Q2s+, J2s+, T2s+, 92s+, 82s+, 72s+, 62s+, 52s+, 42s+, A2o+, K2o+, Q2o+, J2o+, T2o+, 92o+, 83o+, 74o+, 65o"), // 89%
  new PreFlopRange("22+, A2s+, K2s+, Q2s+, J2s+, T2s+, 92s+, 82s+, 72s+, 62s+, 52s+, 42s+, A2o+, K2o+, Q2o+, J2o+, T2o+, 92o+, 83o+, 74o+, 65o, 54o"), // 90%
  new PreFlopRange("22+, A2s+, K2s+, Q2s+, J2s+, T2s+, 92s+, 82s+, 72s+, 62s+, 52s+, 42s+, 32s, A2o+, K2o+, Q2o+, J2o+, T2o+, 92o+, 83o+, 74o+, 64o+, 54o"), // 91%
  new PreFlopRange("22+, A2s+, K2s+, Q2s+, J2s+, T2s+, 92s+, 82s+, 72s+, 62s+, 52s+, 42s+, 32s, A2o+, K2o+, Q2o+, J2o+, T2o+, 92o+, 82o+, 74o+, 64o+, 54o"), // 92%
  new PreFlopRange("22+, A2s+, K2s+, Q2s+, J2s+, T2s+, 92s+, 82s+, 72s+, 62s+, 52s+, 42s+, 32s, A2o+, K2o+, Q2o+, J2o+, T2o+, 92o+, 82o+, 73o+, 64o+, 54o"), // 93%
  new PreFlopRange("22+, A2s+, K2s+, Q2s+, J2s+, T2s+, 92s+, 82s+, 72s+, 62s+, 52s+, 42s+, 32s, A2o+, K2o+, Q2o+, J2o+, T2o+, 92o+, 82o+, 73o+, 64o+, 53o+"), // 94%
  new PreFlopRange("22+, A2s+, K2s+, Q2s+, J2s+, T2s+, 92s+, 82s+, 72s+, 62s+, 52s+, 42s+, 32s, A2o+, K2o+, Q2o+, J2o+, T2o+, 92o+, 82o+, 73o+, 63o+, 53o+"), // 95%
  new PreFlopRange("22+, A2s+, K2s+, Q2s+, J2s+, T2s+, 92s+, 82s+, 72s+, 62s+, 52s+, 42s+, 32s, A2o+, K2o+, Q2o+, J2o+, T2o+, 92o+, 82o+, 73o+, 63o+, 53o+, 43o"), // 96%
  new PreFlopRange("22+, A2s+, K2s+, Q2s+, J2s+, T2s+, 92s+, 82s+, 72s+, 62s+, 52s+, 42s+, 32s, A2o+, K2o+, Q2o+, J2o+, T2o+, 92o+, 82o+, 72o+, 63o+, 53o+, 43o"), // 97%
  new PreFlopRange("22+, A2s+, K2s+, Q2s+, J2s+, T2s+, 92s+, 82s+, 72s+, 62s+, 52s+, 42s+, 32s, A2o+, K2o+, Q2o+, J2o+, T2o+, 92o+, 82o+, 72o+, 63o+, 52o+, 43o"), // 98%
  new PreFlopRange("22+, A2s+, K2s+, Q2s+, J2s+, T2s+, 92s+, 82s+, 72s+, 62s+, 52s+, 42s+, 32s, A2o+, K2o+, Q2o+, J2o+, T2o+, 92o+, 82o+, 72o+, 62o+, 52o+, 43o"), // 99%
  new PreFlopRange("22+, A2s+, K2s+, Q2s+, J2s+, T2s+, 92s+, 82s+, 72s+, 62s+, 52s+, 42s+, 32s, A2o+, K2o+, Q2o+, J2o+, T2o+, 92o+, 82o+, 72o+, 62o+, 52o+, 42o+, 32o"), // 100%
];

const RAISE_RANGE_INDEX = 7;
const CALL_RANGE_INDEX = 16;
const BIG_BLINDS_TO_ALL_IN_RATIO = 3;

module.exports = function () {
  var info = {
    name: "🃏the joke is on you🃏",
    email: "tbk@netcompany.com",
    btcWallet: "",
  };

  function update(game) {
    if (game.state !== "complete") {
      if (game.state === "pre-flop") {
        var raiseRange = allRanges[RAISE_RANGE_INDEX];
        var callRange = allRanges[CALL_RANGE_INDEX];

        let currentBigBlind = getBigBlind(game);
        if (game.self.chips <= currentBigBlind * numberOfBigBlindsBeforeDesperation) {
          const bigBlindsLeft = game.self.chips / currentBigBlind;
          let rangeIndex = Math.floor(bigBlindsLeft * BIG_BLINDS_TO_ALL_IN_RATIO);
          let range = allRanges[rangeIndex];
          if (range.isHandInRange(game.self.cards)) {
            // console.log("🤣yolo🤣");
            return game.self.chips;
          }
        }

        if (raiseRange.isHandInRange(game.self.cards)) {
          return game.betting.raise;
        } else if (callRange.isHandInRange(game.self.cards)) {
          return game.betting.call;
        } else {
          return 0;
        }
      } else {
        var hand = Hand.solve(game.self.cards.concat(game.community));

        if (hand.rank >= 5) {
          return Math.max(getBigBlind(game) * 4, game.betting.raise);
        } else if (hand.rank > 2) {
          return game.betting.raise;
        } else if (hand.rank === 2) {
          return game.betting.call;
        } else {
          return 0;
        }
      }
    }
  }

  return { update: update, info: info };
};
function getBigBlind(game) {
  return Math.max(...game.players.map((x) => x.blind));
}

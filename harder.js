var PreFlopRange = require("./range").PreFlopRange;
var Hand = require("pokersolver").Hand;
const allRanges = [
  new PreFlopRange("KK+"),
  new PreFlopRange("JJ+"),
  new PreFlopRange("99+"),
  new PreFlopRange("88+, AQs+"),
  new PreFlopRange("88+, AQs+, AKo"),
  new PreFlopRange("77+, ATs+, AKo"),
  new PreFlopRange("77+, ATs+, KQs, AQo+"),
  new PreFlopRange("77+, ATs+, KQs, AJo+"),
  new PreFlopRange("66+, A9s+, KJs+, AJo+"),
  new PreFlopRange("66+, A9s+, KTs+, AJo+"),
  new PreFlopRange("66+, A8s+, KTs+, ATo+"),
  new PreFlopRange("66+, A7s+, KTs+, QJs, ATo+, KQo"),
  new PreFlopRange("66+, A7s+, KTs+, QJs, ATo+, KJo+"),
  new PreFlopRange("66+, A7s+, K9s+, QJs, ATo+, KJo+"),
  new PreFlopRange("55+, A7s+, K9s+, QTs+, A9o+, KJo+"),
  new PreFlopRange("55+, A5s+, K9s+, QTs+, A9o+, KJo+"),
  new PreFlopRange("55+, A4s+, K9s+, QTs+, A8o+, KJo+"),
  new PreFlopRange("55+, A4s+, K8s+, QTs+, A8o+, KTo+"),
  new PreFlopRange("55+, A4s+, K8s+, Q9s+, A8o+, KTo+"),
  new PreFlopRange("55+, A4s+, K8s+, Q9s+, A7o+, KTo+, QJo"),
  new PreFlopRange("55+, A3s+, K7s+, Q9s+, JTs, A7o+, KTo+, QJo"),
  new PreFlopRange("44+, A2s+, K7s+, Q9s+, JTs, A7o+, KTo+, QJo"),
  new PreFlopRange("44+, A2s+, K7s+, Q9s+, JTs, A7o+, K9o+, QJo"),
  new PreFlopRange("44+, A2s+, K6s+, Q9s+, JTs, A7o+, K9o+, QTo+"),
  new PreFlopRange("44+, A2s+, K6s+, Q9s+, JTs, A7o+, A5o, K9o+, QTo+"),
  new PreFlopRange("44+, A2s+, K6s+, Q8s+, JTs, A5o+, K9o+, QTo+"),
  new PreFlopRange("44+, A2s+, K5s+, Q8s+, J9s+, A5o+, K9o+, QTo+"),
  new PreFlopRange("44+, A2s+, K5s+, Q8s+, J9s+, A4o+, K9o+, QTo+"),
  new PreFlopRange("44+, A2s+, K5s+, Q8s+, J9s+, A4o+, K8o+, QTo+"),
  new PreFlopRange("44+, A2s+, K4s+, Q8s+, J9s+, A4o+, K8o+, Q9o+"),
  new PreFlopRange("44+, A2s+, K4s+, Q8s+, J9s+, A3o+, K8o+, Q9o+"),
  new PreFlopRange("33+, A2s+, K4s+, Q7s+, J9s+, A3o+, K8o+, Q9o+, JTo"),
  new PreFlopRange("33+, A2s+, K4s+, Q7s+, J9s+, A3o+, K7o+, Q9o+, JTo"),
  new PreFlopRange("33+, A2s+, K4s+, Q7s+, J8s+, T9s, A3o+, K7o+, Q9o+, JTo"),
  new PreFlopRange("33+, A2s+, K3s+, Q6s+, J8s+, T9s, A2o+, K7o+, Q9o+, JTo"),
  new PreFlopRange("33+, A2s+, K2s+, Q6s+, J8s+, T9s, A2o+, K7o+, Q9o+, JTo"),
  new PreFlopRange("33+, A2s+, K2s+, Q6s+, J8s+, T9s, A2o+, K6o+, Q9o+, JTo"),
  new PreFlopRange("33+, A2s+, K2s+, Q5s+, J8s+, T9s, A2o+, K6o+, Q8o+, JTo"),
  new PreFlopRange("33+, A2s+, K2s+, Q5s+, J8s+, T9s, A2o+, K6o+, Q8o+, J9o+"),
  new PreFlopRange("33+, A2s+, K2s+, Q5s+, J7s+, T8s+, A2o+, K5o+, Q8o+, J9o+"),
  new PreFlopRange("33+, A2s+, K2s+, Q4s+, J7s+, T8s+, A2o+, K5o+, Q8o+, J9o+"),
  new PreFlopRange("22+, A2s+, K2s+, Q3s+, J7s+, T8s+, A2o+, K4o+, Q8o+, J9o+"),
  new PreFlopRange("22+, A2s+, K2s+, Q3s+, J7s+, T8s+, 98s, A2o+, K4o+, Q8o+, J9o+, T9o"),
  new PreFlopRange("22+, A2s+, K2s+, Q3s+, J7s+, T8s+, 98s, A2o+, K4o+, Q7o+, J9o+, T9o"),
  new PreFlopRange("22+, A2s+, K2s+, Q3s+, J6s+, T7s+, 98s, A2o+, K4o+, Q7o+, J9o+, T9o"),
  new PreFlopRange("22+, A2s+, K2s+, Q3s+, J6s+, T7s+, 98s, A2o+, K4o+, Q7o+, J8o+, T9o"),
  new PreFlopRange("22+, A2s+, K2s+, Q2s+, J6s+, T7s+, 98s, A2o+, K3o+, Q7o+, J8o+, T9o"),
  new PreFlopRange("22+, A2s+, K2s+, Q2s+, J5s+, T7s+, 98s, A2o+, K3o+, Q6o+, J8o+, T9o"),
  new PreFlopRange("22+, A2s+, K2s+, Q2s+, J5s+, T7s+, 98s, A2o+, K2o+, Q6o+, J8o+, T9o"),
  new PreFlopRange("22+, A2s+, K2s+, Q2s+, J5s+, T7s+, 98s, A2o+, K2o+, Q5o+, J8o+, T9o"),
  new PreFlopRange("22+, A2s+, K2s+, Q2s+, J5s+, T7s+, 98s, A2o+, K2o+, Q5o+, J8o+, T8o+"),
  new PreFlopRange("22+, A2s+, K2s+, Q2s+, J4s+, T7s+, 98s, A2o+, K2o+, Q5o+, J7o+, T8o+"),
  new PreFlopRange("22+, A2s+, K2s+, Q2s+, J3s+, T6s+, 97s+, A2o+, K2o+, Q5o+, J7o+, T8o+"),
  new PreFlopRange("22+, A2s+, K2s+, Q2s+, J3s+, T6s+, 97s+, 87s, A2o+, K2o+, Q4o+, J7o+, T8o+"),
  new PreFlopRange("22+, A2s+, K2s+, Q2s+, J2s+, T5s+, 96s+, 87s, A2o+, K2o+, Q4o+, J7o+, T8o+"),
  new PreFlopRange("22+, A2s+, K2s+, Q2s+, J2s+, T5s+, 96s+, 87s, A2o+, K2o+, Q4o+, J7o+, T8o+, 98o"),
  new PreFlopRange("22+, A2s+, K2s+, Q2s+, J2s+, T5s+, 96s+, 87s, A2o+, K2o+, Q4o+, J6o+, T8o+, 98o"),
  new PreFlopRange("22+, A2s+, K2s+, Q2s+, J2s+, T5s+, 96s+, 87s, A2o+, K2o+, Q3o+, J6o+, T8o+, 98o"),
  new PreFlopRange("22+, A2s+, K2s+, Q2s+, J2s+, T4s+, 96s+, 87s, A2o+, K2o+, Q3o+, J6o+, T7o+, 98o"),
  new PreFlopRange("22+, A2s+, K2s+, Q2s+, J2s+, T4s+, 96s+, 87s, A2o+, K2o+, Q2o+, J6o+, T7o+, 98o"),
  new PreFlopRange("22+, A2s+, K2s+, Q2s+, J2s+, T4s+, 96s+, 86s+, A2o+, K2o+, Q2o+, J5o+, T7o+, 98o"),
  new PreFlopRange("22+, A2s+, K2s+, Q2s+, J2s+, T3s+, 95s+, 86s+, A2o+, K2o+, Q2o+, J5o+, T7o+, 98o"),
  new PreFlopRange("22+, A2s+, K2s+, Q2s+, J2s+, T3s+, 95s+, 86s+, A2o+, K2o+, Q2o+, J5o+, T7o+, 97o+"),
  new PreFlopRange("22+, A2s+, K2s+, Q2s+, J2s+, T2s+, 95s+, 86s+, A2o+, K2o+, Q2o+, J5o+, T6o+, 97o+"),
  new PreFlopRange("22+, A2s+, K2s+, Q2s+, J2s+, T2s+, 95s+, 86s+, 76s, A2o+, K2o+, Q2o+, J4o+, T6o+, 97o+"),
  new PreFlopRange("22+, A2s+, K2s+, Q2s+, J2s+, T2s+, 95s+, 85s+, 76s, A2o+, K2o+, Q2o+, J3o+, T6o+, 97o+"),
  new PreFlopRange("22+, A2s+, K2s+, Q2s+, J2s+, T2s+, 94s+, 85s+, 76s, A2o+, K2o+, Q2o+, J3o+, T6o+, 97o+"),
  new PreFlopRange("22+, A2s+, K2s+, Q2s+, J2s+, T2s+, 94s+, 85s+, 75s+, A2o+, K2o+, Q2o+, J3o+, T6o+, 97o+, 87o"),
  new PreFlopRange("22+, A2s+, K2s+, Q2s+, J2s+, T2s+, 94s+, 85s+, 75s+, A2o+, K2o+, Q2o+, J2o+, T6o+, 97o+, 87o"),
  new PreFlopRange("22+, A2s+, K2s+, Q2s+, J2s+, T2s+, 93s+, 85s+, 75s+, A2o+, K2o+, Q2o+, J2o+, T5o+, 97o+, 87o"),
  new PreFlopRange("22+, A2s+, K2s+, Q2s+, J2s+, T2s+, 92s+, 85s+, 75s+, A2o+, K2o+, Q2o+, J2o+, T5o+, 96o+, 87o"),
  new PreFlopRange("22+, A2s+, K2s+, Q2s+, J2s+, T2s+, 92s+, 84s+, 75s+, 65s, A2o+, K2o+, Q2o+, J2o+, T5o+, 96o+, 87o"),
  new PreFlopRange("22+, A2s+, K2s+, Q2s+, J2s+, T2s+, 92s+, 84s+, 75s+, 65s, A2o+, K2o+, Q2o+, J2o+, T4o+, 96o+, 87o"),
  new PreFlopRange("22+, A2s+, K2s+, Q2s+, J2s+, T2s+, 92s+, 84s+, 75s+, 65s, A2o+, K2o+, Q2o+, J2o+, T4o+, 96o+, 86o+"),
  new PreFlopRange("22+, A2s+, K2s+, Q2s+, J2s+, T2s+, 92s+, 84s+, 74s+, 65s, A2o+, K2o+, Q2o+, J2o+, T3o+, 96o+, 86o+"),
  new PreFlopRange("22+, A2s+, K2s+, Q2s+, J2s+, T2s+, 92s+, 83s+, 74s+, 64s+, A2o+, K2o+, Q2o+, J2o+, T3o+, 95o+, 86o+"),
  new PreFlopRange("22+, A2s+, K2s+, Q2s+, J2s+, T2s+, 92s+, 83s+, 74s+, 64s+, A2o+, K2o+, Q2o+, J2o+, T3o+, 95o+, 86o+, 76o"),
  new PreFlopRange("22+, A2s+, K2s+, Q2s+, J2s+, T2s+, 92s+, 83s+, 74s+, 64s+, 54s, A2o+, K2o+, Q2o+, J2o+, T2o+, 95o+, 86o+, 76o"),
  new PreFlopRange("22+, A2s+, K2s+, Q2s+, J2s+, T2s+, 92s+, 82s+, 73s+, 64s+, 54s, A2o+, K2o+, Q2o+, J2o+, T2o+, 95o+, 86o+, 76o"),
  new PreFlopRange("22+, A2s+, K2s+, Q2s+, J2s+, T2s+, 92s+, 82s+, 73s+, 64s+, 54s, A2o+, K2o+, Q2o+, J2o+, T2o+, 95o+, 85o+, 76o"),
  new PreFlopRange("22+, A2s+, K2s+, Q2s+, J2s+, T2s+, 92s+, 82s+, 73s+, 63s+, 53s+, A2o+, K2o+, Q2o+, J2o+, T2o+, 94o+, 85o+, 76o"),
  new PreFlopRange("22+, A2s+, K2s+, Q2s+, J2s+, T2s+, 92s+, 82s+, 73s+, 63s+, 53s+, A2o+, K2o+, Q2o+, J2o+, T2o+, 94o+, 85o+, 75o+"),
  new PreFlopRange("22+, A2s+, K2s+, Q2s+, J2s+, T2s+, 92s+, 82s+, 73s+, 63s+, 53s+, A2o+, K2o+, Q2o+, J2o+, T2o+, 93o+, 85o+, 75o+"),
  new PreFlopRange("22+, A2s+, K2s+, Q2s+, J2s+, T2s+, 92s+, 82s+, 72s+, 63s+, 53s+, A2o+, K2o+, Q2o+, J2o+, T2o+, 93o+, 85o+, 75o+"),
  new PreFlopRange("22+, A2s+, K2s+, Q2s+, J2s+, T2s+, 92s+, 82s+, 72s+, 63s+, 53s+, A2o+, K2o+, Q2o+, J2o+, T2o+, 93o+, 84o+, 75o+, 65o"),
  new PreFlopRange("22+, A2s+, K2s+, Q2s+, J2s+, T2s+, 92s+, 82s+, 72s+, 63s+, 53s+, 43s, A2o+, K2o+, Q2o+, J2o+, T2o+, 93o+, 84o+, 75o+, 65o"),
  new PreFlopRange("22+, A2s+, K2s+, Q2s+, J2s+, T2s+, 92s+, 82s+, 72s+, 62s+, 52s+, 43s, A2o+, K2o+, Q2o+, J2o+, T2o+, 92o+, 84o+, 75o+, 65o"),
  new PreFlopRange("22+, A2s+, K2s+, Q2s+, J2s+, T2s+, 92s+, 82s+, 72s+, 62s+, 52s+, 42s+, A2o+, K2o+, Q2o+, J2o+, T2o+, 92o+, 84o+, 74o+, 65o"),
  new PreFlopRange("22+, A2s+, K2s+, Q2s+, J2s+, T2s+, 92s+, 82s+, 72s+, 62s+, 52s+, 42s+, A2o+, K2o+, Q2o+, J2o+, T2o+, 92o+, 83o+, 74o+, 65o"),
  new PreFlopRange("22+, A2s+, K2s+, Q2s+, J2s+, T2s+, 92s+, 82s+, 72s+, 62s+, 52s+, 42s+, A2o+, K2o+, Q2o+, J2o+, T2o+, 92o+, 83o+, 74o+, 65o, 54o"),
  new PreFlopRange("22+, A2s+, K2s+, Q2s+, J2s+, T2s+, 92s+, 82s+, 72s+, 62s+, 52s+, 42s+, 32s, A2o+, K2o+, Q2o+, J2o+, T2o+, 92o+, 83o+, 74o+, 64o+, 54o"),
  new PreFlopRange("22+, A2s+, K2s+, Q2s+, J2s+, T2s+, 92s+, 82s+, 72s+, 62s+, 52s+, 42s+, 32s, A2o+, K2o+, Q2o+, J2o+, T2o+, 92o+, 82o+, 74o+, 64o+, 54o"),
  new PreFlopRange("22+, A2s+, K2s+, Q2s+, J2s+, T2s+, 92s+, 82s+, 72s+, 62s+, 52s+, 42s+, 32s, A2o+, K2o+, Q2o+, J2o+, T2o+, 92o+, 82o+, 73o+, 64o+, 54o"),
  new PreFlopRange("22+, A2s+, K2s+, Q2s+, J2s+, T2s+, 92s+, 82s+, 72s+, 62s+, 52s+, 42s+, 32s, A2o+, K2o+, Q2o+, J2o+, T2o+, 92o+, 82o+, 73o+, 64o+, 53o+"),
  new PreFlopRange("22+, A2s+, K2s+, Q2s+, J2s+, T2s+, 92s+, 82s+, 72s+, 62s+, 52s+, 42s+, 32s, A2o+, K2o+, Q2o+, J2o+, T2o+, 92o+, 82o+, 73o+, 63o+, 53o+"),
  new PreFlopRange("22+, A2s+, K2s+, Q2s+, J2s+, T2s+, 92s+, 82s+, 72s+, 62s+, 52s+, 42s+, 32s, A2o+, K2o+, Q2o+, J2o+, T2o+, 92o+, 82o+, 73o+, 63o+, 53o+, 43o"),
  new PreFlopRange("22+, A2s+, K2s+, Q2s+, J2s+, T2s+, 92s+, 82s+, 72s+, 62s+, 52s+, 42s+, 32s, A2o+, K2o+, Q2o+, J2o+, T2o+, 92o+, 82o+, 72o+, 63o+, 53o+, 43o"),
  new PreFlopRange("22+, A2s+, K2s+, Q2s+, J2s+, T2s+, 92s+, 82s+, 72s+, 62s+, 52s+, 42s+, 32s, A2o+, K2o+, Q2o+, J2o+, T2o+, 92o+, 82o+, 72o+, 63o+, 52o+, 43o"),
  new PreFlopRange("22+, A2s+, K2s+, Q2s+, J2s+, T2s+, 92s+, 82s+, 72s+, 62s+, 52s+, 42s+, 32s, A2o+, K2o+, Q2o+, J2o+, T2o+, 92o+, 82o+, 72o+, 62o+, 52o+, 43o"),
  new PreFlopRange("22+, A2s+, K2s+, Q2s+, J2s+, T2s+, 92s+, 82s+, 72s+, 62s+, 52s+, 42s+, 32s, A2o+, K2o+, Q2o+, J2o+, T2o+, 92o+, 82o+, 72o+, 62o+, 52o+, 42o+, 32o"),
];

module.exports = function () {

  var info = {
    name: "🛴BasicBitch🛴",
    email: "",
    btcWallet: ""
  };
  const WinState =1;
  const BallzyVariable = 1;

  function update(game) {
    if (game.state !== "complete") {

      if(game.state === "pre-flop"){
        var Balzyness = validateblind(game)
        
        if(Balzyness == 1){
          return game.self.chips;
        }else if(Balzyness == 2){
          var raiseRange = allRanges[50];
          if(raiseRange.isHandInRange(game.self.cards)){
            return game.betting.raise;
          }else{
            return 0;
          }          
        }else if(Balzyness == 3){
          var raiseRange = allRanges[25*WinState];
          var callRange = allRanges[50*WinState];
          if(raiseRange.isHandInRange(game.self.cards)){
            return game.betting.raise;
          }else if(callRange.isHandInRange(game.self.cards)){
            return game.betting.call;
          }else{return 0;}
        }else{
          var goodcards = goodcardsFlop(game);
          if(goodcards == 4){
            return 0;
          }else if(goodcards == 1){
            return game.self.chips;
          }else if(goodcards == 2){
            return game.betting.raise;
          }else{
            return game.betting.call;
          }          
        }
        
        

      } else {
        
        var community = Hand.solve(game.community);
        var allcards = Hand.solve(game.self.cards.concat(game.community));

        if(community.rank >= allcards){
          return 0;
        }
        if(allcards.rank >= 4){
          return game.self.chips;
        }
        if(allcards.rank >=2){
          return game.self.raise;
        }else{return 0;}       

      }
    }
  }
  function validateblind(game){
    bigblind = 0;
    game.players.forEach(player => {
      if(player.blind > bigblind)
      bigblind = player.blind
    });
    if(bigblind*3*BallzyVariable >= game.self.chips){
      return 1;
    }else if(bigblind*6*BallzyVariable >= game.self.chips){
      return 2;
    }else if(bigblind * 10*BallzyVariable>= game.self.chips){
      return 3;
    }else{return 4;}
  }

  function goodcardsFlop(game){
    Cards_p3 = allRanges[3*WinState]
    Cards_p10 = allRanges[10*WinState]
    Cards_p20 = allRanges[20*WinState]
    if(Cards_p3.isHandInRange(game.self.cards)){
      return 1;
    }else if(Cards_p10.isHandInRange(game.self.cards)){
      return 2;
    }else if(Cards_p20.isHandInRange(game.self.cards)){
      return 3;
    }else{return 4;}
    
  }


  return { update: update, info: info }

  

}

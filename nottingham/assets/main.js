// feature request from Andy:
// select which expansion you are using and have addtional rules and options revelaed to you
// - royal goods rules are optional
// sub real names for player #

var goods = {
  apples : {
    value : 2,
    bonus : {
      king: 20,
      queen: 10
    }
  },
  cheese: {
    value : 3,
    bonus : {
      king: 15,
      queen: 10
    }
  },
  bread: {
    value : 3,
    bonus: {
      king: 15,
      queen: 10
    }
  },
  chickens: {
    value : 4,
    bonus : {
      king: 10,
      queen: 5
    }
  },
  pepper: {
    value: 6
  },
  mead: {
    value: 7
  },
  silk: {
    value: 8
  },
  crossbows: {
    value: 9
  }
};

var setNumberOfPlayers = $("#number-players");
var lockPlayerNumber = $("#lock-number");
var numberOfPlayers = getNumberOfPlayers();

setNumberOfPlayers.change(getNumberOfPlayers);
lockPlayerNumber.click(toggleLock);
buildScoreCard(numberOfPlayers);

function toggleLock () {
  setNumberOfPlayers.prop('disabled', function(_, prop){
    return !prop;
  })
}

function getNumberOfPlayers() {
  buildScoreCard(setNumberOfPlayers.val())
  return setNumberOfPlayers.val();
}

function buildScoreCard (num) {
  $('#scorecard').html('');
  for (i = 0; i < num; i++) {
    $('#scorecard').append('<h3>'
                          + 'Player ' + (i + 1)
                          + '</h3>'
                          + '<div>'
                          + '<label for="">Apples</label>'
                          + '<input type="number" id="apples' + (i + 1) + '">'
                          + '</div>'
                          + '<div>'
                          + '<label for="">Cheese</label>'
                          + '<input type="number" id="cheese' + (i + 1) + '">'
                          + '</div>'
                          + '<div>'
                          + '<label for="">Bread</label>'
                          + '<input type="number" id="bread"' + (i + 1) + '>'
                          + '</div>'
                          + '<div>'
                          + '<label for="">Chickens</label>'
                          + '<input type="number" id="chickens' + (i + 1) + '">'
                          + '</div>'
                          + '<div>'
                          + '<label for="">Coins</label>'
                          + '<input type="number" id="coins"' + (i + 1) + '>'
                          + '</div>'
                          );
  }
}

function calcGoodTotal (goods, num) {
  var goodValue = null;
  for (var good in goods) {
    goodValue += (goods[good].value * num);
  }
  return goodValue;
}

function isContraband (good) {
  return !goods[good].hasOwnProperty('bonus');
}

function calcTieBonus (good) {
  var tieBonusTotal = Math.floor((goods[good].bonus.king + goods[good].bonus.queen) / 2);
  return tieBonusTotal;
}

function coinsTotal (coins) {
  return coins;
}

function calcFinalScore (good, num, coins, calcGoodTotal, calcTieBonus, coinsTotal) {
  var finalScore = this.calcGoodTotal(good, num) + this.calcTieBonus(good) + this.coinsTotal(coins);
  return finalScore;
}

function determineWinningScore (arr) {
  return Math.max(...arr);
}

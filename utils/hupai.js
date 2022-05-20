function isShunKe(cards, laiziCount) {
  if (cards.length === 0) {
      return true;
  }
  // 若第一张是顺子中的一张  
  for (var first = cards[0] - 2; first <= cards[0]; first++) {
      if (first % 10 > 7 || (laiziCount === 0 && first < cards[0])) {
          // 顺子第一张牌不会大于7点、无赖子情况下顺子第一张只能用手上的牌  
          continue;
      }
      var shunCount = 0;
      for (var i = 0; i < 3; i++) {
          if (cards.indexOf(first + i) >= 0) {
              shunCount++;
          }
      }
      if (shunCount === 3 || shunCount + laiziCount >= 3) {
          // 找到包含第一张牌的顺子  
          var puCards = cards.slice();
          var puLaizi = laiziCount;
          for (var i = 0; i < 3; i++) {
              var deletePos = puCards.indexOf(first + i);
              if (deletePos >= 0) {
                  puCards.splice(deletePos, 1);
              } else {
                  puLaizi--;
              }
          }
          if (isShunKe(puCards, puLaizi)) {
              // 剩下的牌成扑  
              return true;
          }
      }
  }
  // 若第一张是刻子中的一张  
  var keziCount = 1;
  var keziCard = cards[0];
  if (cards[1] === keziCard) {
      keziCount++;
  }
  if (cards[2] === keziCard) {
      keziCount++;
  }
  if (keziCount === 3 || keziCount + laiziCount >= 3) {
      var puCards = cards.slice();
      var puLaizi = laiziCount;
      for (var i = 0; i < 3; i++) {
          var deletePos = puCards.indexOf(keziCard);
          if (deletePos >= 0) {
              puCards.splice(deletePos, 1);
          } else {
              puLaizi--;
          }
      }
      if (isShunKe(puCards, puLaizi)) {
          return true;
      }
  }
  return false;
}

function canHuLaizi(cards, laiziCount) {
  if ((cards.length + laiziCount + 1) % 3 != 0) {
      // 若牌张数不是2、5、8、11、14则不能胡  
      return false;
  }
  // 排序方便胡牌判断  
  cards.sort(function (a, b) {
      return a - b;
  })
  // 依次删除一对牌做将，其余牌全部成扑则可胡  
  for (var i = 0; i < cards.length; i++) {
      if (i > 0 && cards[i] == cards[i - 1]) {
          // 和上一次是同样的牌，避免重复计算  
          continue;
      }
      if ((i + 1 < cards.length && cards[i] == cards[i + 1]) || laiziCount > 0) {
          // 找到对子、或是用一张癞子拼出的对子  
          var puCards = cards.slice();
          var puLaizi = laiziCount;
          puCards.splice(i, 1);
          if (puCards[i] == cards[i]) {
              puCards.splice(i, 1);
          } else {
              puLaizi--;
          }
          // 删去对子判断剩下的牌是否成扑  
          if (isShunKe(puCards, puLaizi)) {
              return true;
          }
      }
  }
  if (laiziCount >= 2 && isShunKe(cards, laiziCount - 2)) {
      // 两个癞子做将牌特殊判定处理  
      return true;
  }
  return false;
}
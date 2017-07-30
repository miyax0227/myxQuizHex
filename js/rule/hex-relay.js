'use strict';

var appName = "myxQuizMain";
var app = angular.module(appName);

/*******************************************************************************
 * rule - ラウンド特有のクイズのルール・画面操作の設定
 ******************************************************************************/
app.factory('rule', [ 'qCommon', function(qCommon) {

  var rule = {};
  var win = qCommon.win;
  var lose = qCommon.lose;
  var setMotion = qCommon.setMotion;
  var addQCount = qCommon.addQCount;

  rule.judgement = judgement;
  rule.calc = calc;

  /*****************************************************************************
   * header - ルール固有のヘッダ
   ****************************************************************************/
  rule.head = [ {
	key : "mode",
	value : "position",
	style : "string"
  }, {
	key : "nowLot",
	value : 1,
	style : "number"
  } ];

  /*****************************************************************************
   * items - ルール固有のアイテム
   ****************************************************************************/
  rule.items = [ {
	key : "o",
	value : 0,
	style : "number",
	css : "o",
	chance : true
  }, {
	key : "x",
	value : 0,
	style : "number",
	css : "x",
	invisibleWhenZeroOrNull : true,
	repeatChar : "×",
	pinch : true
  }, {
	key : "oo1",
	css : "oo oo1",
	repeatChar : "○"
  }, {
	key : "oo2",
	css : "oo oo2",
	repeatChar : "○"
  }, {
	key : "oo3",
	css : "oo oo3",
	repeatChar : "○"
  }, {
	key : "oo4",
	css : "oo oo4",
	repeatChar : "○"
  }, {
	key : "oo5",
	css : "oo oo5",
	repeatChar : "○"
  }, {
	key : "oo6",
	css : "oo oo6",
	repeatChar : "○"
  },

  {
	key : "sl1",
	css_img : "sl sl1",
	css_img_file : {
	  "1" : "select.png"
	}
  }, {
	key : "sl2",
	css_img : "sl sl2",
	css_img_file : {
	  "1" : "select.png"
	}
  }, {
	key : "sl3",
	css_img : "sl sl3",
	css_img_file : {
	  "1" : "select.png"
	}
  }, {
	key : "sl4",
	css_img : "sl sl4",
	css_img_file : {
	  "1" : "select.png"
	}
  }, {
	key : "sl5",
	css_img : "sl sl5",
	css_img_file : {
	  "1" : "select.png"
	}
  }, {
	key : "sl6",
	css_img : "sl sl6",
	css_img_file : {
	  "1" : "select.png"
	}
  }, {
	key : "winningPoint",
	css : "winningPoint",
	prefix : "/"
  }, {
	key : "priority",
	order : [ {
	  key : "status",
	  order : "desc",
	  alter : [ "win", 1, "lose", -1, 0 ]
	}, {
	  key : "o",
	  order : "desc"
	}, {
	  key : "x",
	  order : "asc"
	} ]
  } ];

  /*****************************************************************************
   * decor - 装飾用クラスリストの設定
   ****************************************************************************/
  rule.decor = [ "chance", "pinch", "up1", "up2", "up3", "up4", "up5", "up6" ];

  /*****************************************************************************
   * tweet - ルール固有のツイートのひな型
   ****************************************************************************/
  rule.tweet = {
	o : "${name}◯　→${o}◯ ${x}×",
	x : "${name}×　→${o}◯ ${x}× ${absent}休"
  };

  /*****************************************************************************
   * actions - プレイヤー毎に設定する操作の設定
   ****************************************************************************/
  rule.actions = [
  /*****************************************************************************
   * 正解時
   ****************************************************************************/
  {
	name : "○",
	css : "action_o",
	button_css : "btn btn-primary btn-lg",
	keyArray : "k1",
	enable0 : function(player, players, header, property) {
	  return (player.status == "normal" && !header.playoff);
	},
	action0 : function(player, players, header, property) {
	  setMotion(player, "o");
	  player.o++;
	  addQCount(players, header, property);
	},
	tweet : "o"
  },
  /*****************************************************************************
   * 誤答時
   ****************************************************************************/
  {
	name : "×",
	css : "action_x",
	button_css : "btn btn-danger btn-lg",
	keyArray : "k2",
	enable0 : function(player, players, header) {
	  return (player.status == "normal" && !header.playoff);
	},
	action0 : function(player, players, header, property) {
	  setMotion(player, "x");
	  // ユーティリティプレイヤーの判別
	  var now;
	  for (var i = 1; i <= 6; i++) {
		if (player["sl" + i] == 1) {
		  now = i;
		}
	  }
	  if (player["up" + now]) {
		player.x += 2;
	  } else {
		player.x += 1;
	  }

	  if (property.penalty > 0) {
		player.absent = property.penalty;
		player.status = "preabsent";
	  }
	  addQCount(players, header, property);
	},
	tweet : "x"
  } ];

  /*****************************************************************************
   * global_actions - 全体に対する操作の設定
   ****************************************************************************/
  rule.global_actions = [
  /*****************************************************************************
   * スルー
   ****************************************************************************/
  {
	name : "thru",
	button_css : "btn btn-default",
	group : "rule",
	keyboard : "Space",
	enable0 : function(players, header) {
	  return true;
	},
	action0 : function(players, header, property) {
	  addQCount(players, header, property);
	},
	tweet : "thru"
  } ];

  /*****************************************************************************
   * judgement - 操作終了時等の勝敗判定
   * 
   * @param {Array} players - players
   * @param {Object} header - header
   * @param {Object} property - property
   ****************************************************************************/
  function judgement(players, header, property) {
	angular.forEach(players.filter(function(item) {
	  /* rankがない人に限定 */
	  return (item.rank == 0);
	}), function(player, i) {
	  /* win条件 */
	  var winningPoint;
	  if (player.hasOwnProperty('winningPoint')) {
		winningPoint = player.winningPoint;
	  } else {
		winningPoint = property.winningPoint;
	  }

	  if (player.o >= winningPoint) {
		win(player, players, header, property);
		player.o = winningPoint;
	  }
	  /* lose条件 */
	  if (player.x >= property.losingPoint) {
		lose(player, players, header, property);
		player.x = property.losingPoint;
	  }
	});
  }

  /*****************************************************************************
   * calc - 従属変数の計算をする
   * 
   * @param {Array} players - players
   * @param {Object} items - items
   ****************************************************************************/
  function calc(players, header, items, property) {
	var pos = 0;
	angular.forEach(players, function(player, index) {
	  // 位置計算
	  /*
	   * if (player.lot == header.nowLot) { player.line = null; player.keyIndex =
	   * pos; player.position = (pos++); } else if (player.lot > header.nowLot) {
	   * player.line = "left"; player.keyIndex = -1; player.position = 0; } else {
	   * player.line = "right"; player.keyIndex = -1; player.position = 0; }
	   */
	  player.line = null;
	  player.keyIndex = pos;
	  player.position = (pos++);

	  // winningPointの移送
	  if (!player.hasOwnProperty('winningPoint')) {
		player.winningPoint = property.winningPoint;
	  }
	  
	  // ユーティリティプレイヤーの設定
	  var arr = [];
	  for (var i = 1; i <= 6; i++) {
		arr.push(player["name" + i]);
	  }
	  for (var i = 1; i <= 6; i++) {
		if (arr.filter(function(n) {
		  return n == player["name" + i];
		}).length >= 2) {
		  player["up" + i] = true;
		} else {
		  player["up" + i] = false;
		}
	  }

	  // chance・pinchの計算
	  player.chance = (player.winningPoint - player.o == 1);
	  player.pinch = (property.losingPoint - player.x == 1);

	  // キーボード入力時の配列の紐付け ローリング等の特殊形式でない場合はこのままでOK
	  // player.keyIndex = index;

	});

	angular.forEach(players, function(player, index) {
	  player.sl1 = 0;
	  player.sl2 = 0;
	  player.sl3 = 0;
	  player.sl4 = 0;
	  player.sl5 = 0;
	  player.sl6 = 0;

	  var o = player.o;
	  player.oo1 = Math.min(o, property.norma[0]);
	  o -= player.oo1;
	  player.oo2 = Math.min(o, property.norma[1]);
	  o -= player.oo2;
	  player.oo3 = Math.min(o, property.norma[2]);
	  o -= player.oo3;
	  player.oo4 = Math.min(o, property.norma[3]);
	  o -= player.oo4;
	  player.oo5 = Math.min(o, property.norma[4]);
	  o -= player.oo5;
	  player.oo6 = Math.min(o, property.norma[5]);

	  switch (true) {
	  case (property.norma[0] > player.oo1):
		player.sl1 = 1;
		break;
	  case (property.norma[1] > player.oo2):
		player.sl2 = 1;
		break;
	  case (property.norma[2] > player.oo3):
		player.sl3 = 1;
		break;
	  case (property.norma[3] > player.oo4):
		player.sl4 = 1;
		break;
	  case (property.norma[4] > player.oo5):
		player.sl5 = 1;
		break;
	  case (property.norma[5] > player.oo6):
		player.sl6 = 1;
		break;
	  }
	});

  }

  return rule;
} ]);

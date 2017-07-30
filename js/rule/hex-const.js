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
  }, {
	key : "nowStep",
	value : 1,
	style : "number"
  } ];

  /*****************************************************************************
   * items - ルール固有のアイテム
   ****************************************************************************/
  rule.items = [ {
	key : "pts",
	value : 0,
	style : "number",
	css : "o",
	chance : true
  }, {
	key : "sl1",
	css_img : "sl sl1",
	css_img_file : {
	  "1" : "select.png"
	},
	up1 : true
  }, {
	key : "sl2",
	value : 0,
	style : "number",
	css_img : "sl sl2",
	css_img_file : {
	  "1" : "select.png"
	},
	up2 : true
  }, {
	key : "sl3",
	value : 0,
	style : "number",
	css_img : "sl sl3",
	css_img_file : {
	  "1" : "select.png"
	},
	up3 : true
  }, {
	key : "sl4",
	value : 0,
	style : "number",
	css_img : "sl sl4",
	css_img_file : {
	  "1" : "select.png"
	},
	up4 : true
  }, {
	key : "sl5",
	value : 0,
	style : "number",
	css_img : "sl sl5",
	css_img_file : {
	  "1" : "select.png"
	},
	up5 : true
  }, {
	key : "sl6",
	value : 0,
	style : "number",
	css_img : "sl sl6",
	css_img_file : {
	  "1" : "select.png"
	},
	up6 : true
  }, {
	key : "priority",
	order : [ {
	  key : "status",
	  order : "desc",
	  alter : [ "win", 1, "lose", -1, 0 ]
	}, {
	  key : "pts",
	  order : "desc"
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
	  return player.status == "normal" && !header.playoff && player.sl > 0;
	},
	action0 : function(player, players, header, property) {
	  player.pts += header.o;
	  setMotion(player, "o");
	  addQCount(players, header, property);
	},
	tweet : "o"
  }
  /*****************************************************************************
   * 誤答時
   ****************************************************************************/
  /*
   * { name : "×", css : "action_x", button_css : "btn btn-danger btn-lg",
   * keyArray : "k2", enable0 : function(player, players, header) { return
   * player.status == "normal" && !header.playoff && player.sl > 0; }, action0 :
   * function(player, players, header, property) { setMotion(player, "x");
   * player.x++; if (property.penalty > 0) { player.absent = property.penalty;
   * player.status = "preabsent"; } addQCount(players, header, property); },
   * tweet : "x" }
   */
  ,
  /*****************************************************************************
   * プレイヤー個別誤答
   ****************************************************************************/
  {
	name : 1,
	css : "action_sl" + 1,
	button_css : "btn btn-danger",
	enable0 : function(player, players, header, property) {
	  return enable00(1, player, players, header, property);
	},
	action0 : function(player, players, header, property) {
	  action00(1, player, players, header, property);
	}
  }, {
	name : 2,
	css : "action_sl" + 2,
	button_css : "btn btn-danger",
	enable0 : function(player, players, header, property) {
	  return enable00(2, player, players, header, property);
	},
	action0 : function(player, players, header, property) {
	  action00(2, player, players, header, property);
	}
  }, {
	name : 3,
	css : "action_sl" + 3,
	button_css : "btn btn-danger",
	enable0 : function(player, players, header, property) {
	  return enable00(3, player, players, header, property);
	},
	action0 : function(player, players, header, property) {
	  action00(3, player, players, header, property);
	}
  }, {
	name : 4,
	css : "action_sl" + 4,
	button_css : "btn btn-danger",
	enable0 : function(player, players, header, property) {
	  return enable00(4, player, players, header, property);
	},
	action0 : function(player, players, header, property) {
	  action00(4, player, players, header, property);
	}
  }, {
	name : 5,
	css : "action_sl" + 5,
	button_css : "btn btn-danger",
	enable0 : function(player, players, header, property) {
	  return enable00(5, player, players, header, property);
	},
	action0 : function(player, players, header, property) {
	  action00(5, player, players, header, property);
	}
  }, {
	name : 6,
	css : "action_sl" + 6,
	button_css : "btn btn-danger",
	enable0 : function(player, players, header, property) {
	  return enable00(6, player, players, header, property);
	},
	action0 : function(player, players, header, property) {
	  action00(6, player, players, header, property);
	}
  } ];

  /* 個別誤答の有効判定共通関数 ****************************************************** */
  function enable00(index, player, players, header, property) {
	return player.status == "normal" && !header.playoff && player["sl" + index] == 1;
  }

  /* 個別誤答の処理共通関数 ****************************************************** */
  function action00(index, player, players, header, property) {
	// 解答権喪失
	player["sl" + index] = 0;

	// 解答権がある他チームにポイント配布
	angular.forEach(players, function(p) {
	  if (p != player && p.sl > 0) {
		p.pts += header.x;
	  }
	})

	setMotion(player, "x");
	addQCount(players, header, property);
  }

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
  }, {
	name : "",
	button_css : "btn btn-default",
	group : "rule",
	indexes0 : function(players, header, property) {
	  return property.steps;
	},
	enable1 : function(index, players, header) {
	  return true;
	},
	action1 : function(index, players, header, property) {
	  // ペア変更
	  header.nowStep = index;
	  // 解答権設定
	  angular.forEach(players, function(p) {
		for (var i = 1; i <= 6; i++) {
		  if (property.lotQCount[index].lot.indexOf(i) >= 0 && (i <= 3 || !p["up" + i])) {
			p["sl" + i] = 1;
		  } else {
			p["sl" + i] = 0;
		  }
		}
	  });
	  // 問目初期化
	  header.qCount = 1;
	}
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
	  /*
	   * var winningPoint; if (player.hasOwnProperty('winningPoint')) {
	   * winningPoint = player.winningPoint; } else { winningPoint =
	   * property.winningPoint; } if (player.o >= winningPoint) { win(player,
	   * players, header, property); }
	   */
	  /* lose条件 */
	  /*
	   * if (player.x >= property.losingPoint) { lose(player, players, header,
	   * property); }
	   */
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

	// 正解時・不正解時に入るポイントを設定
	header.o = property.lotQCount[header.nowStep].o;
	header.x = property.lotQCount[header.nowStep].x;

	// nowLot設定
	header.nowLot = players[0].lot;

	angular.forEach(players, function(player, index) {
	  // 位置計算
	  if (player.lot == header.nowLot) {
		player.line = null;
		player.keyIndex = pos;
		player.position = (pos++);
	  } else if (player.lot > header.nowLot) {
		player.line = "left";
		player.keyIndex = -1;
		player.position = 0;
	  } else {
		player.line = "right";
		player.keyIndex = -1;
		player.position = 0;
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

	  // 解答可能人数の算出
	  player.sl = 0;
	  for (var i = 1; i <= 6; i++) {
		player.sl += player["sl" + i];
	  }

	  // プレーオフ以外のとき、解答可能人数が0の場合は待機表示
	  if (!header.playoff && [ "wait", "normal" ].indexOf(player.status) >= 0) {
		if (player.sl == 0) {
		  player.status = "wait";
		} else {
		  player.status = "normal";
		}
	  }

	  // chance・pinchの計算

	  // キーボード入力時の配列の紐付け ローリング等の特殊形式でない場合はこのままでOK
	  // player.keyIndex = index;

	});
  }

  return rule;
} ]);

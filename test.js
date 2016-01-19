
// Code test
(function () {
  document.onreadystatechange = function () {
    if (document.readyState == "complete") {

    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');
    var paddleL = new Pong.Paddle ({ side: 0 })
    var paddleR = new Pong.Paddle ({ side: 1 })
    var ball = new Pong.Ball();
    var AIPlayer = new Pong.AIPlayer(paddleL, ball);
    var game = new Pong.Game([paddleL, paddleR], ball, AIPlayer);

    var view = new Pong.GameView(game, ctx);

    view.bindKeyHandlers();
    view.startGame();

    }
  }
})();

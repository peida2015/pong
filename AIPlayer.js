(function () {

  if (typeof Pong === "undefined") {
    window.Pong = {};
  }

  var AIPlayer = Pong.AIPlayer = function(paddle, ball) {
     this.paddle = paddle;
     this.ball = ball;
  }

  AIPlayer.prototype = {
     getMove: function () {
        return (this.paddle.centerPos[1] < this.ball.pos[1] ? 1 : -1)
     }
  }
})();

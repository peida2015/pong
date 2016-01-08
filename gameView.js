(function () {
  if (typeof Pong === "undefined") {
    window.Pong = {};
  }

  var GameView = Pong.GameView = function (game, ctx) {
   this.ctx = ctx;
   this.game = game;
   this.paddleL = this.game.paddles[0];
   this.paddleR = this.game.paddles[1];
  };

  GameView.MOVES = {
    "up": -1,
    "down": 1,
  };

  GameView.prototype = {
    bindKeyHandlers: function () {
      var paddle = this.paddleR;
      var that = this;
      key('up', function () {
        console.log('up pushed');
        paddle.changePosition(GameView.MOVES['up']*2);
        // that.game.draw(this.ctx);
      });
      key('down', function () {
        console.log('down pushed');
        paddle.changePosition(GameView.MOVES['down']*2);
        // that.game.draw(this.ctx);
      });
    },

    start: function () {
      this.bindKeyHandlers();
      this.lastTime = 0;

      requestAnimationFrame(this.animate.bind(this));
    },

    animate: function (time) {
      var timeDelta = time - this.lastTime;

      this.game.step(timeDelta);
      this.game.draw(this.ctx);

      if (this.game.checkMatchWinner() === 1) {
        this.game.showMatchResult(this.ctx, "You won!")
      } else if (this.game.checkMatchWinner() === 0) {
        this.game.showMatchResult(this.ctx, "You lost!")
      } else {
        this.lastTime = time;
        requestAnimationFrame(this.animate.bind(this));
      }
    }

  }
})();

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
      });
      key('down', function () {
        console.log('down pushed');
        paddle.changePosition(GameView.MOVES['down']*2);
      });
    },

    handleClick: function (event) {
      if ((event.offsetX >=canvas.width/2-100 && event.offsetX <= canvas.width/2+100) && (event.offsetY >= canvas.height/2 + 70 && event.offsetY <= canvas.height/2 + 110)) {
        this.game.resetGame();
        this.resetCanvas();
        this.startGame();
      } else if ((event.offsetX >=canvas.width/2-75 && event.offsetX <= canvas.width/2+75) && (event.offsetY >= canvas.height/2 + 150 && event.offsetY <= canvas.height/2 + 190)){
        canvas.width = canvas.width*0.9;
        this.resetCanvas();
        this.game.resetGame();
        this.startGame();
        console.log("clicked harder");
      } else {
        console.log('clicked outside');
        // canvas.removeEventListener('click', this.handleClick.bind(this), false);
      }
    },

    resetCanvas: function() {
      var old_canvas = document.getElementById("canvas");
      var new_canvas = old_canvas.cloneNode(true);
      old_canvas.parentNode.replaceChild(new_canvas, old_canvas);
      this.ctx = new_canvas.getContext('2d');
    },

    startGame: function () {
      this.lastTime = Date.now();
      requestAnimationFrame(this.animate.bind(this));
    },

    showRestart: function () {
      this.ctx.font="28px Courier New";
      this.ctx.fillStyle = "blue";
      this.ctx.textAlign = "center";
      this.ctx.fillText("Play Again", canvas.width/2, canvas.height/2 + 100);
      this.ctx.strokeRect(canvas.width/2-100, canvas.height/2 + 70, 200, 40);
    },

    showHarder: function () {
      this.ctx.font="28px Courier New";
      this.ctx.fillStyle = "green";
      this.ctx.textAlign = "center";
      this.ctx.fillText("Harder", canvas.width/2, canvas.height/2 + 180);
      this.ctx.strokeRect(canvas.width/2-75, canvas.height/2 + 150, 150, 40);
    },

    animate: function (time) {
      var timeDelta = time - this.lastTime;
      var canvas = document.getElementById('canvas');

      this.game.step(timeDelta);
      this.game.draw(this.ctx);

      if (this.game.checkMatchWinner() === 1) {
        this.game.showMatchResult(this.ctx, "You won!");
        this.showRestart();
        this.showHarder();

        this.listener = canvas.addEventListener('click', this.handleClick.bind(this), false);

      } else if (this.game.checkMatchWinner() === 0) {
        this.game.showMatchResult(this.ctx, "You lost!");
        this.showRestart();
        this.showHarder();

        this.listener = canvas.addEventListener('click', this.handleClick.bind(this), false);
      } else {
        this.lastTime = time;
        requestAnimationFrame(this.animate.bind(this));
      }
    }
  }
})();

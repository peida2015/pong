(function () {
  // debugger
  if (typeof Pong === "undefined") {
    window.Pong = {};
  }

  var Game = Pong.Game = function (paddles, ball, AIPlayer) {
    this.paddles = paddles;
    this.ball = ball;
    this.matchWins = [0,0];
    this.AIPlayer = AIPlayer;
  }

  Game.prototype = {

    draw: function (ctx) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
//Draw wall
      ctx.fillRect(0,0, canvas.width, 5);
      ctx.fillRect(0, canvas.height-5, canvas.width, 5);
//Draw paddles
      ctx.fillRect(0, this.paddles[0].centerPos[1]-this.paddles[0].length/2, 5, this.paddles[0].length);
      ctx.strokeRect(this.paddles[1].centerPos[0], this.paddles[1].centerPos[1]-this.paddles[0].length/2, 5, this.paddles[1].length);
//Draw ball
      ctx.beginPath();
      ctx.arc(this.ball.pos[0], this.ball.pos[1], this.ball.radius, 0, 2*Math.PI);
      ctx.stroke();
      ctx.fill();
    },

    checkWinner: function () {
      if (this.matchWins[0] === 10) {
        return 0;
      } else if (this.matchWins[1] === 10) {
        return 1;
      }
    },

    checkMatchWinner: function () {
      var baselineHit = this.ball.checkBaseline();
      if (typeof baselineHit !== 'undefined') {
        // debugger
        var loser = this.ball.collisionWithPaddle(this.paddles[baselineHit]) ? undefined :  baselineHit;

        if (loser === 1) {
          return 0
        } else if (loser !== undefined) {
          return 1
        }

      }
    },

    addMatchWin: function () {
      this.matchWins[matchWinner] += 1;
    },

    step: function (delta) {
      var baselineHit = this.ball.checkBaseline();

      // if (this.checkMatchWinner() === 0) {
      //   this.matchWins[0] += 1;
      //   this.showMatchResult("You lost!")
      // } else if (this.checkMatchWinner() === 1) {
      //   this.matchWins[1] += 1;
      //   this.showMatchResult("You won!")
      // } else {
        if (typeof baselineHit !== 'undefined') {
          // debugger
          if (this.ball.collisionWithPaddle(this.paddles[baselineHit])){

            this.ball.bounceOffPaddle(this.paddles[baselineHit].centerPos[1]);
          }
        } else if (this.ball.collionWithWall()) {
          this.ball.bounceOffWall();
        }
      // }
      this.ball.updatePos();

      if (Math.floor(Math.random()*100) % 2  ===0) {
        this.paddles[0].changePosition(this.AIPlayer.getMove());
      }

    },

    showMatchResult: function (ctx, result) {
      ctx.font="48px Courier New";
      ctx.fillStyle = "red";
      ctx.textAlign = "center";
      ctx.fillText(result, canvas.width/2, canvas.height/2);
    },

    resetGame: function () {
      this.ball.resetPosition();
      this.paddles[0].resetPosition();
      this.paddles[1].resetPosition();
    }
  }
    // debugger
})();

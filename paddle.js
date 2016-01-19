(function () {

  if (typeof Pong === "undefined") {
    window.Pong = {};
  }

    var Paddle = Pong.Paddle = function (options){
      this.length = 100;
      this.side = options.side;
      this.centerPos = options.pos ||
      [this.side === 0 ? 5 : canvas.width-5, canvas.height/2] ;
      this.velocity = 15;
      this.maxVelocity = 10;
    }

    Paddle.prototype = {
      resetPosition: function () {
        this.centerPos = [this.side === 0 ? 5 : canvas.width-5, canvas.height/2];
      },

      touchedWall: function () {
        var lowerBound = canvas.height;

        return ((this.centerPos[1] + this.length/2) >= lowerBound || (this.centerPos[1] - this.length/2) <= 0)
      },

      // Changes when up level
      increaseMaxVelocity: function (speedBump) {
        this.maxVelocity = this.maxVelocity + speedBump
      },

      // Changes position upon keystroke
      changePosition: function (move) {
        if (this.centerPos[1] + this.length >= canvas.height && move>0) {
          this.centerPos[1] = canvas.height - this.length/2;
        } else if(this.centerPos[1] <= this.length/2 && move < 0) {
          this.centerPos[1] = this.length/2;
        } else {
          this.centerPos[1] += move * this.velocity;
        }
      }
    }

})();

(function () {

  if (typeof Pong === "undefined") {
    window.Pong = {};
  }

  // document.onreadystatechange = function () {
  //   if (document.readyState == "complete") {

      var Paddle = Pong.Paddle = function (options){
        this.length = 100;
        this.side = options.side;
        this.centerPos = options.pos ||
        [this.side === 0 ? 5 : document.getElementById('canvas').width-5, document.getElementById('canvas').height/2] ;
        this.velocity = 15;
        this.maxVelocity = 10;
      }

      Paddle.prototype = {
        resetPosition: function () {
          this.centerPos[2] = document.getElementById('canvas').height/2;
        },

        touchedWall: function () {
          var lowerBound = document.getElementById('canvas').height;

          return ((this.centerPos[1] + this.length/2) >= lowerBound || (this.centerPos[1] - this.length/2) <= 0)
        },

        // Changes when up level
        increaseMaxVelocity: function (speedBump) {
          this.maxVelocity = this.maxVelocity + speedBump
        },

        // Changes position upon keystroke
        changePosition: function (move) {
          if (this.centerPos[1] + this.length >= document.getElementById('canvas').height && move>0) {
            this.centerPos[1] = document.getElementById('canvas').height - this.length/2;
          } else if(this.centerPos[1] <= this.length/2 && move < 0) {
            this.centerPos[1] = this.length/2;
          } else {
            this.centerPos[1] += move * this.velocity;
          }
        }
      }

      // debugger
  //   }
  // }

})();

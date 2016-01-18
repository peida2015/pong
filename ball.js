(function () {
  if (typeof Pong === "undefined") {
    window.Pong = {};
  }

  var Ball = Pong.Ball = function () {
    this.pos = [document.getElementById('canvas').width/2, Math.floor(Math.random()*(document.getElementById('canvas').height-20)+10)];

    this.velocity = [ 8+(Math.floor(Math.random()*3*(-1+Math.random()*2))), 5+Math.floor(Math.random()*3)];

    this.radius = 10;
    // this.game = game;
  }


  Ball.prototype = {
    resetPosition: function () {
      this.pos = [document.getElementById('canvas').width/2, Math.floor(Math.random()*document.getElementById('canvas').height+1)];
    },

    game: function (game) {
      this.game = game
    },

    collionWithWall: function () {
      var upperPoint =  this.pos[1] - this.radius;
      var lowerPoint = this.pos[1] + this.radius;

      return (upperPoint <= -5 || lowerPoint >= document.getElementById('canvas').height + 5)
    },

    collisionWithPaddle: function (paddle) {
      // debugger
      if ((this.pos[0] - paddle.centerPos[0]) <= this.radius) {
        return ( this.pos[1] < (paddle.centerPos[1] + 55) &&
        this.pos[1] > (paddle.centerPos[1] - 55) )
      } else {
        return false
      }
    },

    checkBaseline: function () {
      var leftPoint =  this.pos[0] - this.radius;
      var rightPoint = this.pos[0] + this.radius;
      if (leftPoint <= 5) {
        // debugger
        return 0;
      } else if (rightPoint >= document.getElementById('canvas').width - 5){
        return 1;
      }
    },


// Changes direction after bounce, passes in paddle's height (paddlePos)
    bounceOffPaddle: function (paddlePos) {
      var vel_x = this.velocity[0];
      var vel_y = this.velocity[1];

      this.velocity[0] = -vel_x;
      this.velocity[1] =  vel_y + Math.floor(Math.abs((this.pos[1] - paddlePos)/25));
    },

    bounceOffWall: function () {
      this.velocity[1] = - this.velocity[1];
    },

//
    updateVelocity: function (paddle) {
      if (this.collionWithWall()) {
        this.bounceOffWall();
      } else if (this.collisionWithPaddle(paddle)) {
        this.bounceOffPaddle(paddle.centerPos);
      }
    },

    updatePos: function () {

      this.pos[0] = this.pos[0] + this.velocity[0];
      this.pos[1] = this.pos[1] + this.velocity[1];
    }
  }

})();

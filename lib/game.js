(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }


var Game = Asteroids.Game = function () {
  this.NUM_ASTEROIDS = 50;
  this.asteroids = [];
  this.addAsteroids();
};
Game.prototype.DIM_X = 800;
Game.prototype.DIM_Y = 800;

Game.prototype.addAsteroids = function () {
  for (var i = 0; i < this.NUM_ASTEROIDS; i++) {
    var position = Asteroids.Util.randomEdgePos(this);
    this.asteroids.push(new Asteroids.Asteroid({pos: position, game: this, }));
  }
};

Game.prototype.randomPosition = function () {
  var x = Math.random() * Game.DIM_X;
  var y = Math.random() * Game.DIM_Y;
  return [x, y];
};

Game.prototype.draw = function (ctx) {
  ctx.clearRect(0,0, Game.DIM_X, Game.DIM_Y);
  this.asteroids.forEach( function (asteroid) {
    asteroid.draw(ctx);
  });
};

Game.prototype.moveObjects = function () {
  this.asteroids.forEach( function (asteroid) {
    // console.log(asteroid.radius + " " + asteroid.pos)
    asteroid.move();
  });
};

Game.prototype.remove = function (obj) {
  if (obj instanceof Asteroids.Asteroid) {
    var index = this.asteroids.indexOf(object);
    this.asertoids[index] = new Asteroids.Asteroid({game: this});
  }
};

Game.prototype.wrap = function (pos, max) {
  function wrap () {
    if (pos < 0) {
      return max - (pos % max);
    } else if (pos > max) {
      return pos % max;
    } else {
      return pos;
    }
  }
};

Game.prototype.outOfBounds = function (pos) {
  return (pos[0] >= 0 && pos[0] <= Game.DIM_X && pos[1] >= 0 && pos[1] <= Game.DIM_Y);
};


// this.asteroids.forEach(move.call);

// function forEach(cb) {
//   for (...) {
//     move.call(asteroid)
//   }
// }

})();

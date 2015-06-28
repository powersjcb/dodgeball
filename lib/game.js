(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }


var Game = Asteroids.Game = function () {
  this.difficulty = 1.0;
  this.NUM_ASTEROIDS = 10;
  this.asteroids = [];
  this.addShip();
  this.addAsteroids();
};
Game.prototype.DIM_X = 600;
Game.prototype.DIM_Y = 600;

Game.prototype.allOjbects = function () {
  return [].concat(this.asteroids, [this.ship]);
};

Game.prototype.addAsteroids = function () {
  for (var i = 0; i < this.NUM_ASTEROIDS; i++) {
    this.asteroids.push(this.generateAsteroid());
  }
};

Game.prototype.addShip = function () {
  this.ship = new Asteroids.Ship({
    game: this,
    pos: [this.DIM_X / 2.0, this.DIM_Y / 2.0]
  });
};

Game.prototype.generateAsteroid = function () {
  var collided = true, newAsteroid;
  while (collided) {
    var position = Asteroids.Util.randomEdgePos(this);
    newAsteroid = new Asteroids.Asteroid({game: this, pos: position});
    collided = this.checkCollisions(newAsteroid);
  }
  return newAsteroid;
};

Game.prototype.checkCollisions = function (object) {
  this.allOjbects().forEach( function (otherObject) {
    if (object != otherObject && object.isCollided(otherObject)) {
      return true;
    }
  });
  return false;
};

Game.prototype.randomPosition = function () {
  var x = Math.random() * Game.DIM_X;
  var y = Math.random() * Game.DIM_Y;
  return [x, y];
};

Game.prototype.draw = function (ctx) {
  ctx.clearRect(0,0, this.DIM_X, this.DIM_Y);
  this.allOjbects().forEach( function (object) {
    object.draw(ctx);
  });
};

Game.prototype.moveObjects = function () {
  this.increaseDifficulty();
  this.allOjbects().forEach( function (object) {
    // object.move();
  // });
  //
  // this.allOjbects().forEach( function (object) {
    this.allOjbects().forEach( function (otherObject) {
      if (object !== otherObject && object.isCollided(otherObject)) {
        object.color = '#F00';
        otherObject.color = '#F00';
        object.collide(otherObject);
      }
    });
    object.accelerate();
  }.bind(this));



};

Game.prototype.increaseDifficulty = function () {
  this.difficulty += 0.0001;
};

Game.prototype.remove = function (obj) {
  if (obj instanceof Asteroids.Asteroid) {
    var index = this.asteroids.indexOf(obj);
    this.asertoids[index] = this.generateAsteroid();
  }
};

Game.prototype.wrap = function (pos) {
  return [wrap(pos[0], this.DIM_X), wrap(pos[1], this.DIM_Y)];

  function wrap (pos, max) {
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
  return !(pos[0] >= 0 && pos[0] <= this.DIM_X && pos[1] >= 0 && pos[1] <= this.DIM_Y);
};

})();

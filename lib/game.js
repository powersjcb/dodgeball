(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }


var Game = Asteroids.Game = function () {
  this.difficulty = 1.0;
  this.NUM_ASTEROIDS = 10;
  this.asteroids = [];
  this.addAsteroids();
  this.addShip();
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
  var collided = true;
  var newAsteroid = {};
  while (true) {
    var position = this.randomPosition();
    newAsteroid = new Asteroids.Asteroid({game: this, pos: position});
    collided = this.checkCollisions(newAsteroid);
    if (!collided) {
      console.log('create asteroid');
      return newAsteroid;
    }
    console.log('trying again');
  }
};

Game.prototype.checkCollisions = function (object) {
  var asteroids = this.asteroids;
  if (asteroids.length > 0) {
    for (var i = 0; i < asteroids.length; i++) {
      if (object.isCollided(asteroids[i]) && object != asteroids[i]) {
        return true;
      }
    }
  }
  return object.hittingWall();
};

Game.prototype.randomPosition = function () {
  var x = Math.random() * this.DIM_X;
  var y = Math.random() * this.DIM_Y;
  return [x, y];
};

Game.prototype.draw = function (ctx) {
  ctx.clearRect(0,0, this.DIM_X, this.DIM_Y);
  this.allOjbects().forEach( function (object) {
    object.draw(ctx);
  });
};

Game.prototype.moveObjects = function () {
  this.allOjbects().forEach( function (object) {
    this.allOjbects().forEach( function (otherObject) {
      if (object !== otherObject && object.isCollided(otherObject)) {
        if (object != this.ship) {
          object.color = '#F00';
        }
        if (otherObject != this.ship) {
          otherObject.color = '#F00';
          object.collide(otherObject);
        }
      }
    }.bind(this));
  }.bind(this));
};

Game.prototype.remove = function (obj) {
  if (obj instanceof Asteroids.Asteroid) {
    var index = this.asteroids.indexOf(obj);
    this.asertoids[index] = this.generateAsteroid();
  }
};

Game.prototype.outOfBounds = function (pos) {
  return !(pos[0] >= 0 && pos[0] <= this.DIM_X && pos[1] >= 0 && pos[1] <= this.DIM_Y);
};

})();

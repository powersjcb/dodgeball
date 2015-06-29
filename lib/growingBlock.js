(function () {
  if (window.Asteroids === undefined) {
    window.Asteroids = {};
  }

  var GrowingBlock = Asteroids.GrowingBlock = function (options) {
    options.vel = [0,0];
    options.radius = 5;
    options.color = '#999999';
    Asteroids.MovingObject.call(this, options);
    this.growthRate = 1.0;
  };

Asteroids.Util.inherits(GrowingBlock, Asteroids.MovingObject);

GrowingBlock.prototype.collideWall = function () {
  // eventually push away from wall

  // for now, stop growing
  this.radius -= this.growthRate;  // one step back
  this.finishGrowing();
};

GrowingBlock.prototype.goToLast = function () {
};

GrowingBlock.prototype.move = function () {
  this.radius += this.growthRate;
};

GrowingBlock.prototype.mass = function () {
  return 0.000000001; // placeholder untill i rewrite collide method
};

GrowingBlock.prototype.accelerate = function () {
  // will eventually control acceleration to position
};

GrowingBlock.prototype.collide = function (object) {
  // maybe have the ship bounce, otherwise its has infinite mass
  if (object instanceof Asteroids.Asteroid) {
    this.game.loseLife();
    this.game.remove(this);
  } else {
    this.finishGrowing();
  }
};

GrowingBlock.prototype.finishGrowing = function () {
  this.game.blocks.push(
    new Asteroids.Block({
      pos: this.pos,
      radius: this.radius,
      game: this.game
    })
  );
  this.game.remove(this);
};


})();

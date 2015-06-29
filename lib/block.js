(function () {
  if (window.Asteroids === undefined) {
    window.Asteroids = {};
  }

  var Block = Asteroids.Block = function (options) {
    options.vel = [0,0];
    options.color = '#C1C1C1';
    Asteroids.MovingObject.call(this, options);
  };

Asteroids.Util.inherits(Block, Asteroids.MovingObject);

Block.prototype.goToLast = function () {
};

Block.prototype.move = function () {
  // this.pos = pos;
};

Block.prototype.mass = function () {
  return 1000000000;
};

Block.prototype.accelerate = function () {
  // will eventually control acceleration to position
};

Block.prototype.collide = function () {
 // maybe have the ship bounce, otherwise its has infinite mass
};


})();

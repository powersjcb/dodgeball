(function () {
  if (window.Asteroids === undefined) {
    window.Asteroids = {};
  }

  var Ship = Asteroids.Ship = function (options) {
    options.vel = [0,0];
    options.last_position = options.pos;
    options.color = '#156BEB';
    options.radius = 5; // ship size
    Asteroids.MovingObject.call(this, options);
  };

Asteroids.Util.inherits(Ship, Asteroids.MovingObject);

Ship.prototype.goToLast = function () {
};

Ship.prototype.move = function () {
  // this.pos = pos;
};

Ship.prototype.mass = function () {
  return 10000;
};

Ship.prototype.accelerate = function () {
  // will eventually control acceleration to position
};

Ship.prototype.collide = function () {
 // maybe have the ship bounce, otherwise its has infinite mass
};


})();

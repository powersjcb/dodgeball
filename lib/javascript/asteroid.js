(function () {
if (typeof Asteroids === "undefined") {
  window.Asteroids = {};
}

var Asteroid = Asteroids.Asteroid = function (obj) {
  obj.color = obj.color  || '#999999';
  obj.radius = obj.radius || Asteroids.Util.randomRadius();
  obj.vel = obj.vel || Asteroids.Util.randomVec(obj.game.difficulty);
  Asteroids.MovingObject.call(this, obj);
};

Asteroids.Util.inherits(Asteroid, Asteroids.MovingObject);

Asteroid.prototype.accelerate = function () {
  var oldSpeed = Asteroids.Util.vectorLength(this.vel);
  this.vel[0] *= this.game.difficulty / oldSpeed;
  this.vel[1] *= this.game.difficulty / oldSpeed;
};

})();

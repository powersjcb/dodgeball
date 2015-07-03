(function () {
if (typeof Dodgeball === "undefined") {
  window.Dodgeball = {};
}

var Ball = Dodgeball.Ball = function (obj) {
  obj.color = obj.color  || '#999999';
  obj.radius = obj.radius || Dodgeball.Util.randomRadius();
  obj.vel = obj.vel || Dodgeball.Util.randomVec(obj.game.difficulty);
  Dodgeball.MovingObject.call(this, obj);
};

Dodgeball.Util.inherits(Ball, Dodgeball.MovingObject);

Ball.prototype.accelerate = function () {
  var oldSpeed = Dodgeball.Util.vectorLength(this.vel);
  this.vel[0] *= this.game.difficulty / oldSpeed;
  this.vel[1] *= this.game.difficulty / oldSpeed;
};

})();

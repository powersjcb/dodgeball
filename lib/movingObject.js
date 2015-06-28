(function () {
if (typeof Asteroids === "undefined") {
  window.Asteroids = {};
}
var Util = Asteroids.Util;

// pos, vel, radius, color
var MovingObject = Asteroids.MovingObject = function (options) {
  this.pos = options.pos;
  this.last_position = options.pos;
  this.vel = options.vel;
  this.radius = options.radius;
  this.color = options.color;
  this.game = options.game;
};

MovingObject.prototype.wrappable = true;

MovingObject.prototype.isCollided = function (object) {
  var dist = Util.distanceBetween(this.pos, object.pos);
  if (dist < (this.radius * 1.0 + object.radius * 1.0)) {
    return true;
  } else {
    debugger;
    return false;
  }
};

MovingObject.prototype.wallCollision = function () {
  this.game.outOfBounds(this.pos);
  temp = this.vel[0];
  this.vel[0] = this.vel[1];
};

MovingObject.prototype.goToLast = function () {
  this.pos = this.last_position;
};

MovingObject.prototype.draw = function (ctx) {
  // ctx (context, should be '2d' env of canvas)
  //starts path of object outline
  ctx.fillStyle = this.color;
  ctx.beginPath();
  //draw outline
  ctx.arc(
    this.pos[0],
    this.pos[1],
    this.radius,
    0,
    2 * Math.PI,
    false
  );

  ctx.fill();
  ctx.strokeStyle = '#ffffff';
  ctx.stroke();
};

MovingObject.prototype.collide = function (object) {
  // assumes Coefficient of restitution of 1.0
  // mommentum vector, presuming mass per unit area
  var m1 = this.mass()/1000;
  var m2 = object.mass()/1000;

  var normalVector = Util.normalVector(this, object);
  var tangentVector = Util.tangetVector(this, object);

  if (normalVector < 0) {
    return;
  }

  var normalVelocity1 = Util.dotProduct(normalVector, this.vel);
  var normalVelocity2 = Util.dotProduct(normalVector, object.vel);

  var tangetVelocity1 = Util.dotProduct(tangentVector, this.vel);
  var tangetVelocity2 = Util.dotProduct(tangentVector, object.vel);

  var normalVelocityAfter1 = (normalVelocity1 * (m1 - m2) +
    2 * (m2 * normalVelocity2) / (m1 + m2));
  var normalVelocityAfter2 = (normalVelocity2 * (m2 - m1) +
    2 * (m1 * normalVelocity1) / (m1 + m2));

  var velNormalAfter1 = Util.vectorMultiply(normalVector, normalVelocityAfter1);
  var velNormalAfter2 = Util.vectorMultiply(normalVector, normalVelocityAfter2);

  var normalVector1 = Util.vectorMultiply(tangentVector, tangetVelocity1);
  var normalVector2 = Util.vectorMultiply(tangentVector, tangetVelocity2);

  var vel1 = Util.vectorAdd(velNormalAfter1, normalVector1);
  this.vel = vel1;
  object.vel = Util.vectorAdd(velNormalAfter2, normalVector2);

  this.goToLast();
  object.goToLast();

};

MovingObject.prototype.mass = function () {
  var density = 1.0;
  return this.radius * this.radius * density;
};

MovingObject.prototype.move = function() {
  this.last_position = this.pos;
  this.pos[0] += this.vel[0];
  this.pos[1] += this.vel[1];
  if (this.game.outOfBounds(this.pos)) {
    if (this.wrappable) {
      this.pos = this.game.wrap(this.pos);
    } else {
      this.game.remove(this);
    }
  }
};

})();

(function () {
if (typeof Asteroids === "undefined") {
  window.Asteroids = {};
}

// pos, vel, radius, color
var MovingObject = Asteroids.MovingObject = function (options) {
  this.pos = options.pos;
  this.vel = options.vel;
  this.radius = options.radius;
  this.color = options.color;
  this.game = options.game;
};

MovingObject.prototype.wrappable = true;

MovingObject.prototype.collide = function (object) {
  // destroy both objects

};

MovingObject.prototype.isCollided = function (object) {
  var dist = Asteroids.Util.distanceBetween(this.pos, object.pos);
  return dist <= (this.radius + object.radius);
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

MovingObject.prototype.rebound = function (object) {
  // assumes Coefficient of restitution of 1.0

  // mommentum vector, presuming mass per unit area
  var m1 = Math.pow(this.radius, 2);  // mass
  var m2 = Math.pow(object.radius, 2);
  var uy1 = this.vel[0];
  var uy2 = object.vel[0];
  var ux1 = this.vel[1];
  var ux2 = object.vel[1];

  // vertical components
  this.vel[0]   = (m1 - m2) / (m1 + m2) * uy1 + (2 * m2) / (m1 + m2) * uy2;
  object.vel[0] = (m2 - m1) / (m1 + m2) * uy2 + (2 * m1) / (m1 + m2) * uy1;
  // horizontal components
  this.vel[1]   = (m1 - m2) / (m1 + m2) * ux1 + (2 * m2) / (m1 + m2) * ux2;
  object.vel[1] = (m2 - m1) / (m1 + m2) * ux2 + (2 * m1) / (m1 + m2) * ux1;
  return this;
};

MovingObject.prototype.move = function() {
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

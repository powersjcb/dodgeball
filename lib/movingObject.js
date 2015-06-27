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

MovingObject.prototype.collide = function (object) {
  // assumes Coefficient of restitution of 1.0
  // mommentum vector, presuming mass per unit area
  var m1 = this.mass();
  var m2 = object.mass();
  // initial velocities
  var uy1 = this.vel[0];
  var uy2 = object.vel[0];
  var ux1 = this.vel[1];
  var ux2 = object.vel[1];

  var relativeVelocity = 

  // impulse direction
  // http://gamedevelopment.tutsplus.com/tutorials/how-to-create-a-custom-2d-physics-engine-the-basics-and-impulse-resolution--gamedev-6331




  // test engine, only works for head-on impacts
  // vertical components
  this.vel[0]   = (m1 - m2) / (m1 + m2) * uy1 + (2 * m2) / (m1 + m2) * uy2;
  object.vel[0] = (m2 - m1) / (m1 + m2) * uy2 + (2 * m1) / (m1 + m2) * uy1;
  // // horizontal components
  this.vel[1]   = (m1 - m2) / (m1 + m2) * ux1 + (2 * m2) / (m1 + m2) * ux2;
  object.vel[1] = (m2 - m1) / (m1 + m2) * ux2 + (2 * m1) / (m1 + m2) * ux1;
  return this;
};

MovingObject.prototype.mass = function () {
  var density = 1.0;
  return Math.pow(this.radius, 2) * density;
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

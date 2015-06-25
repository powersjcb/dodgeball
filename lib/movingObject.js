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
  this.wrappable = options.wrappable || true;
};

MovingObject.prototype.collide = function (object) {
  // destroy both objects
};

MovingObject.prototype.isCollided = function (object) {
  var dist = Asteroids.Util.dist(this.pos, object.pos);
  return centerDist < (this.radius + object.radius);
};

MovingObject.prototype.draw = function (ctx) {
  // ctx (context, should be '2d' env of canvas)
  //starts path of object outline
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

  ctx.fillStyle = this.color;
  ctx.fill();
  ctx.strokeStyle = '#ffffff';
  ctx.stroke();
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

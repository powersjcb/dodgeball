(function () {
  if (window.Asteroids === undefined) {
    window.Asteroids = {};
  }

  var Ship = Asteroids.Ship = function (options) {
    options.vel = [0,0];
    options.pos = [300,300];
    options.last_position = options.pos;
    options.color = '#156BEB';
    options.radius = 5; // ship size
    Asteroids.MovingObject.call(this, options);

    this.shield = true;
    setTimeout(function () {
      this.color = "#00FF00";
      this.shield = false;
    }.bind(this), 3000)
  };

Asteroids.Util.inherits(Ship, Asteroids.MovingObject);

Ship.prototype.collidable = false;

Ship.prototype.move = function () {
  // use for gravity based controlls
};

Ship.prototype.mass = function () {
  return 0.1;
};

Ship.prototype.accelerate = function () {
  // will eventually control acceleration to position
};

Ship.prototype.collide = function () {
  if (!this.shield) {
    this.game.loseLife();
    this.color = "#FF0000";
    this.shield = true;
    setTimeout(function () {
      this.color = "#156BEB";
    }.bind(this), 500);
    setTimeout(function () {
      this.shield = false;
      this.color = "#00FF00";
    }.bind(this), 3000);
  }
};


})();

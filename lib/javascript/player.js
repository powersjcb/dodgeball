(function () {
  if (window.Dodgeball === undefined) {
    window.Dodgeball = {};
  }

  var Player = Dodgeball.Player = function (options) {
    options.vel = [0,0];
    options.pos = [300,300];
    options.last_position = options.pos;
    options.color = '#156BEB';
    options.radius = 5; // player size
    Dodgeball.MovingObject.call(this, options);

    this.shield = true;
    setTimeout(function () {
      this.color = "#00FF00";
      this.shield = false;
    }.bind(this), 3000)
  };

Dodgeball.Util.inherits(Player, Dodgeball.MovingObject);

Player.prototype.collidable = false;

Player.prototype.move = function () {
  // use for gravity based controlls
};

Player.prototype.mass = function () {
  return 0.1;
};

Player.prototype.accelerate = function () {
  // will eventually control acceleration to position
};

Player.prototype.collide = function () {
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

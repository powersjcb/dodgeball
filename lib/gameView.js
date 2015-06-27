(function () {
  if (window.Asteroids === undefined) {
    window.Asteroids = {};
  }

var GameView = Asteroids.GameView = function (game, canvas) {
  this.cursor = [0, 0];
  this.canvas = canvas;
  this.ctx = canvas.getContext('2d');
  this.game = game;
  $('canvas').on('mousemove', this.getCursor.bind(this));
};

GameView.prototype.start = function () {
  var that = this;
  setInterval(
    function () {
      that.game.ship.vel = Asteroids.Util.vectorBetween(
        that.game.ship.pos,
        that.cursor
      );
      that.game.ship.pos = that.cursor;
      that.game.moveObjects();
      that.game.draw(that.ctx);
    }, 40);
  return this;
};

GameView.prototype.getCursor = function (event) {
  if (event) {
    // handle canvas offsets
    var bounds = event.currentTarget.getBoundingClientRect();
    var x = event.clientX - bounds.left;
    var y = event.clientY - bounds.top;

    if (x && y) {
      this.cursor[0] = x;
      this.cursor[1] = y;
    }
  }
};

})();

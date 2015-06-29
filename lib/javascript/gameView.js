(function () {
  if (window.Asteroids === undefined) {
    window.Asteroids = {};
  }

var GameView = Asteroids.GameView = function (game, canvas) {
  this.$score = $('#score');
  this.$lives = $('#lives');

  this.cursor = [0, 0];
  this.canvas = canvas;
  this.ctx = canvas.getContext('2d');
  this.game = game;

  this.gameOver = false;

  // performance measurement
  this.frameRate       = 0;
  this._frameCount     = 0;
  this._frameTimestamp = 0;
  this._frameRate      = 0;

  this.physicsRate       = 0; // averaged per 100 counts
  this._physicsCount     = 0; // physics engine updates
  this._physicsTimestamp = 0; // last measurement time
  this._physicsRate      = 0; // cumulative moving average

  $('canvas').on('mousemove', this.getCursor.bind(this));
};

GameView.prototype.addGrowingBlock = function (event) {
  event.preventDefault();
  this.game.addGrowingBlock(this.getCursor(event));
};

GameView.prototype.setupGame = function () {
  $('document').once('click', '#lets-play', this.start);
};

GameView.prototype.start = function () {
  this.framesLoop = setInterval(
    function () {
      this.game.ship.pos = this.cursor;
      this.game.draw(this.ctx);
      this.$lives.text(this.game.lives);
      this.framePerformance();
      // console.log(this.frameRate);
      // console.log(this.physicsRate);
      if (this.game.lives < 1) {
        this.gameOver = true;
        this.gameOverScreen();
        clearInterval(this.physicsLoop);
        clearInterval(this.framesLoop);
      }
    }.bind(this), 20);

  this.physicsLoop = setInterval(
    function () {
      this.game.moveObjects();
      this.physicsPerformance();
    }.bind(this), 1);
};

GameView.prototype.gameOverScreen = function () {
  // display game-over screen
  // has prompt for *new game*
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
      return [x,y];
    }

  }
};


// DRY this up by passing variables in options object
GameView.prototype.physicsPerformance = function () {
  this._physicsCount ++;
  var timestamp = window.performance.now();
  this._physicsRate = (this._physicsRate + timestamp -
    this._physicsTimestamp) / this._physicsCount;

  this._physicsTimestamp = timestamp;
  if (this._renderCount > 60) {
    this._physicsCount = 1;
    this.physicsRate = this._physicsRate;
    this._physicsRate = 0;
  }
};

GameView.prototype.framePerformance = function () {
  this._frameCount ++;
  var timestamp = window.performance.now();
  this._frameRate = (this._frameRate + timestamp -
    this._frameTimestamp) / this._frameCount;

  this._frameTimestamp = timestamp;
  if (this._frameCount > 10) {
    this._frameCount = 1;
    this.frameRate = this._frameRate;
    this._frameRate = 0;
  }
};

})();

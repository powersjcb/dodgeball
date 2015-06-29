(function () {
  if (window.Asteroids === undefined) {
    window.Asteroids = {};
  }

var GameView = Asteroids.GameView = function (game, canvas) {
  this.cursor = [0, 0];
  this.canvas = canvas;
  this.ctx = canvas.getContext('2d');
  this.game = game;

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

GameView.prototype.stopGrowingBlock = function (event) {
  event.preventDefault();
  console.log('stop growing');
  if (this.game.growingBlock) {
    this.game.growingBlock.finishGrowing();
  }
};

GameView.prototype.start = function () {
  var that = this;
  setInterval(
    function () {
      that.game.draw(that.ctx);
      that.framePerformance();
      // console.log(that.frameRate);
      // console.log(that.physicsRate);
    }, 20);

  setInterval(
    function () {
      that.game.moveObjects();
      that.physicsPerformance();
    }, 4);

  $('canvas').on('mousedown', this.addGrowingBlock.bind(this));
  $('canvas').on('mouseup', this.stopGrowingBlock.bind(this));
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

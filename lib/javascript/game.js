(function () {
  if (typeof Dodgeball === "undefined") {
    window.Dodgeball = {};
  }

var Game = Dodgeball.Game = function () {
  this.lives = 3;
  this.score = 0;
  this.difficulty = 0.4;
  this.NUM_BALLS = 35;
  this.balls = [];
  this.blocks = [];
  this.addDodgeball();
  this.addPlayer();
};
Game.prototype.DIM_X = 600;
Game.prototype.DIM_Y = 600;

Game.prototype.allOjbects = function () {
  if (this.player) {
    return [].concat(this.balls, [this.player]);
  } else {
    return this.balls;
  }
};

Game.prototype.addDodgeball = function () {
  for (var i = 0; i < this.NUM_BALLS; i++) {
    this.balls.push(this.generateBall());
  }
};

Game.prototype.addPlayer = function (pos) {
  this.player = new Dodgeball.Player({ pos: pos, game: this });
};

Game.prototype.checkCollisions = function (object) {
  var objects = this.allOjbects();
  if (objects.length > 0) {
    for (var i = 0; i < objects.length; i++) {
      if (object.isCollided(objects[i]) && object != objects[i]) {
        return true;
      }
    }
  }
  return object.hittingWall();
};

Game.prototype.draw = function (ctx) {
  ctx.clearRect(0,0, this.DIM_X, this.DIM_Y);
  this.allOjbects().forEach( function (object) {
    object.draw(ctx);
  });
  if (this.growingBlock) {
    this.growingBlock.draw(ctx);
  }
};

Game.prototype.loseLife = function () {
  this.lives --;
};

Game.prototype.generateBall = function () {
  var collided = true;
  var newBall = {};
  while (collided) {
    var position = this.randomPosition();
    newBall = new Dodgeball.Ball({game: this, pos: position});
    collided = this.checkCollisions(newBall);
 }
  return newBall;
};

Game.prototype.moveObjects = function () {
  var objects = this.allOjbects();
  var bounds = {
    x:0,
    y:0,
    width: this.DIM_X,
    height: this.DIM_Y
  };
  // intit quadtree
  var quad = new QuadTree(bounds, false, 7);
  // insert objects into tree
  quad.insert(objects);

  this.scoreTick();

  for (var i = 0; i < objects.length; i++) {
    var c = objects[i];
    // move each object
    c.move();
    if (c.hittingWall()) {
      c.collideWall();
    }

    // get all the adjacent objects from quad
    var items = quad.retrieve(c);
    var len = items.length;
    for (var j = 0; j < len; j++ ) {
      var item = items[j];
      // check if any nearby objects are collided
      if (c !== item && c.isCollided(item)) {
        item.collide(c);
      }
    }
  }

};

Game.prototype.outOfBounds = function (pos) {
  return !(pos[0] >= 0 && pos[0] <= this.DIM_X && pos[1] >= 0 && pos[1] <= this.DIM_Y);
};

Game.prototype.randomPosition = function () {
  var x = Math.random() * this.DIM_X;
  var y = Math.random() * this.DIM_Y;
  return [x, y];
};

Game.prototype.remove = function (obj) {
  if (obj instanceof Dodgeball.Ball) {
    var index = this.balls.indexOf(obj);
    this.asertoids[index] = this.generateBall();
  } else if (obj instanceof Dodgeball.GrowingBlock) {
    this.growingBlock = null;
  }
};

Game.prototype.scoreTick = function () {
  this.score += this.difficulty * this.NUM_BALLS / 100;
};

})();

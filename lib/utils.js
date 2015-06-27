(function () {
if (typeof Asteroids === "undefined") {
  window.Asteroids = {};
}

var Util = Asteroids.Util = {};

var inherits = Util.inherits = function (ChildClass, BaseClass) {
  function Surrogate () { this.constructor = ChildClass; }
  Surrogate.prototype = BaseClass.prototype;
  ChildClass.prototype = new Surrogate();
};

Util.vectorLength = function (vector) {
  return Math.sqrt(Math.pow(vector[0], 2) + Math.pow(vector[1], 2));
};

Util.vectorBetween = function (pos1, pos2) {
  return [pos2[0] - pos1[0], pos2[0] - pos1[0]];
};

Util.relativeVelocity = function (obj1, obj2) {
  return [obj2.pos[0] - obj1.pos[0], obj2.pos[1] - obj1.pos[1]];
};

Util.normalVector = function (obj1, obj2) {
  var v12 = Util.vectorBetween(obj1, obj2);
  var magnitude = Util.distanceBetween(obj1.pos, obj2.pos);
  return [v12[0] / magnitude, v12[1] / magnitude];
};

Util.dotProduct = function (vector1, vector2) {
  var result = 0;
  for (var i = 0; i < vectors.length; i++) {

  }
  return result;
};

Util.randomVec = function (length) {
  var angle = Math.random() * Math.PI * 2;
  var x = (Math.sin(angle) * length);
  var y = (Math.cos(angle) * length);
  return [x,y];
};

Util.randomRadius = function () {
  return this.getRandomInt(15, 30);
};

Util.distanceBetween = function (pos1, pos2) {
  var x1 = pos1[0];
  var x2 = pos2[0];
  var y1 = pos1[1];
  var y2 = pos2[1];
  return Math.sqrt(Math.pow((x1-x2),2) + Math.pow((y1-y2), 2));
};

// generic helper function, random from min to max
Util.getRandomInt = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};


// starting on edges only
//  0 ___ 1
//   |   |
//   |   |
//  3 --- 2
Util.randomEdgePos = function (game) {
  var width = game.DIM_X;
  var height = game.DIM_Y;
  var perimeter = 2 * (width + height);
  var edgePos = Math.random() * perimeter;
    // 0-1
  if (edgePos < width) {
    return [1, edgePos];
    // 1-2
  } else if (edgePos < width + height) {
    return [(edgePos - width), width - 1];
    // 2-3
  } else if (edgePos < (2 * width + height)) {
    return [height - 1, (edgePos - width - height)];
    // 3-0
  } else {
    return [(edgePos - 2 * width - height), 1];
  }
};

})();

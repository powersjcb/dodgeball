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
  return Math.sqrt((vector[0] * vector[0]) + (vector[1] * vector[1]));
};

Util.vectorBetween = function (pos1, pos2) {
  return [pos2[0] - pos1[0], pos2[1] - pos1[1]];
};

Util.relativeVelocity = function (obj1, obj2) {
  return [obj2.vel[0] - obj1.vel[0], obj2.vel[1] - obj1.vel[1]];
};

Util.normalVector = function (obj1, obj2) {
  if (obj1.pos === obj2.pos) {
    throw 'whoops, two objects overlapped';
  }
  var v12 = Util.vectorBetween(obj1.pos, obj2.pos);
  var magnitude = Util.distanceBetween(obj1.pos, obj2.pos);
  // console.log((obj1.radius + obj2.radius - magnitude) / (obj2.radius + obj2.radius) * 100  + "% interference");
  return [v12[0] / magnitude, v12[1] / magnitude];
};

Util.vectorMultiply = function (vector1, vector2) {
  return vector1.map(function (component, idx) {
    if (typeof vector2 === "number") {
      return component * vector2;
    }
    return component * vector2[idx];
  });
};

Util.vectorAdd = function (vector1, vector2) {
  if (vector1.length != vector2.length) {
    throw "vectors not equal dimmensions";
  }
  return vector1.map(function (component, idx) {
    return component + vector2[idx];
  });
};

Util.tangetVector = function (obj1, obj2) {
  var normV = Util.normalVector(obj1, obj2);
  return [-1 * normV[1], normV[0]];
};

Util.dotProduct = function (vector1, vector2) {
  if (vector1.length != vector2.length) {
    throw "vectors not equal dimmensions";
  }
  var result = 0;
  for (var i = 0; i < vector1.length; i++) {
    result += vector1[i] * vector2[i];
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
  return this.getRandomInt(20, 40);
};

Util.distanceBetween = function (pos1, pos2) {
  var x1 = pos1[0];
  var x2 = pos2[0];
  var y1 = pos1[1];
  var y2 = pos2[1];
  return Math.sqrt(((x2 - x1)*(x2 - x1)) + ((y2 - y1)*(y2 - y1)));
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

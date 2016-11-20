import { Direction } from './direction';
import { ENTRY_COORDINATE } from '../entry_coordinate';

var INITIAL_SNAKE_LENGTH = 2;

export function Snake () {
  this._coordinates = [
    {
      x: ENTRY_COORDINATE.x,
      y: ENTRY_COORDINATE.y - INITIAL_SNAKE_LENGTH
    },
    {
      x: ENTRY_COORDINATE.x,
      y: ENTRY_COORDINATE.y
    }
  ];
}
Snake.prototype.isCollisioning = function(coordinate) {
  for (var i=0; i < this._coordinates.length - 2; i++) {
    var a = this._coordinates[i];
    var b = this._coordinates[i + 1];

    var bigger, smaller;

    if (coordinate.x === a.x) {
      bigger = a.y > b.y ? a.y : b.y;
      smaller = a.y > b.y ? a.y : b.y;

      return (smaller <= coordinate.y) && (coordinate.y >= bigger);
    }
    if (coordinate.y === a.y) {
      bigger = a.x > b.x ? a.x : b.x;
      smaller = a.x > b.x ? a.x : b.x;

      return (smaller <= coordinate.x) && (coordinate.x >= bigger);
    }
  }
  return false;
};

Snake.prototype.getPath = function() {
  var first = this._coordinates[0];
  var nextOnes = this._coordinates.slice(1, this._coordinates.length);
  return 'M' + first.x + ' ' + first.y +
    nextOnes.map(function(coordinate) {
      return ' L' + coordinate.x + ' ' + coordinate.y
    }).join(' ');
};
Snake.prototype.removeFromEnd = function() {
  var first = this._coordinates[0];
  var second = this._coordinates[1];

  if (_areCoordsDifferentByOne(first, second)) {
    this._coordinates = this._coordinates.slice(1, this._coordinates.length);
    return;
  }

  first.x += _getChange(first.x, second.x);
  first.y += _getChange(first.y, second.y);
}


Snake.prototype.moveForward = function() {
  var head = this.getHeadCoordinate();

  switch (true) {
    case _isHeadingLeft.call(this):
      head.x = head.x - 1;
      break;
    case _isHeadingTop.call(this):
      head.y = head.y - 1;
      break;
    case _isHeadingRight.call(this):
      head.x = head.x + 1;
      break;
    case _isHeadingBottom.call(this):
      head.y = head.y + 1;
      break;
  }
};

Snake.prototype.moveLeft = function() {
  var headCoordinate = this.getHeadCoordinate();
  if (_isHeadingHorizontally.call(this)) {
    var offset = _isHeadingLeft.call(this) ? -1 : 1;
    headCoordinate.x += offset;
    return;
  }

  var newHeadCoordinate = {
    y: headCoordinate.y,
    x: headCoordinate.x - 1
  };
  this._coordinates.push(newHeadCoordinate);
};
Snake.prototype.moveUp = function() {
  var headCoordinate = this.getHeadCoordinate();
  if (!_isHeadingHorizontally.call(this)) {
    var offset = _isHeadingTop.call(this) ? -1 : 1;
    headCoordinate.y += offset;
    return;
  }

  var newHeadCoordinate = {
    x: headCoordinate.x,
    y: headCoordinate.y - 1
  };
  this._coordinates.push(newHeadCoordinate);
};
Snake.prototype.moveRight = function() {
  var headCoordinate = this.getHeadCoordinate();
  if (_isHeadingHorizontally.call(this)) {
    var offset = _isHeadingRight.call(this) ? 1 : -1;
    headCoordinate.x += offset;
    return;
  }

  var newHeadCoordinate = {
    y: headCoordinate.y,
    x: headCoordinate.x + 1
  };
  this._coordinates.push(newHeadCoordinate);
};
Snake.prototype.moveDown = function() {
  var headCoordinate = this.getHeadCoordinate();
  if (!_isHeadingHorizontally.call(this)) {
    var offset = _isHeadingBottom.call(this) ? 1 : +1;
    headCoordinate.y += offset;
    return;
  }

  var newHeadCoordinate = {
    x: headCoordinate.x,
    y: headCoordinate.y + 1
  };
  this._coordinates.push(newHeadCoordinate);
}
Snake.prototype.getHeadCoordinate = function() {
  return this._coordinates[this._coordinates.length - 1];
};
Snake.prototype.getSecondToHeadCoordinate = function() {
  return this._coordinates[this._coordinates.length - 2];
};

function _isHeadingLeft() {
  return _getDirection.call(this).isHeadingLeft();
}
function _isHeadingTop() {
  return _getDirection.call(this).isHeadingTop();
}
function _isHeadingRight() {
  return _getDirection.call(this).isHeadingRight();
}
function _isHeadingBottom() {
  return _getDirection.call(this).isHeadingBottom();
}
function _isHeadingHorizontally() {
  return _getDirection.call(this).isHeadingHorizontally();
}


function _getDirection() {
  var head = this.getHeadCoordinate();
  var secondToHead = this.getSecondToHeadCoordinate();
  return new Direction(head, secondToHead);
}

function _areCoordsDifferentByOne(coordinate1, coordinate2) {
  var xDiff = Math.abs(coordinate1.x - coordinate2.x);
  var yDiff = Math.abs(coordinate1.y - coordinate2.y);

  return (xDiff === 0 && yDiff <= 1) || (yDiff === 0 && xDiff <= 1)
}
function _getChange(source, target) {
  if (target === source) {
    return 0;
  } else if (target < source) {
    return -1;
  } else {
    return 1;
  }
}

var snakeInstance = new Snake();

Snake.getInstance = function() {
  return snakeInstance;
};

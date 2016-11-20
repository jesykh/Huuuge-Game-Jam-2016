import { CONTENT_SIZE } from './content_size';
import { ENTRY_COORDINATE } from './entry_coordinate';
import { VerticalWall } from './components/vertical_wall';
import { HorizontalWall } from './components/horizontal_wall';

var leftTop = {x: 0, y: 0};
var leftBottom = {x: 0, y: CONTENT_SIZE.height};
var rightTop = {x: CONTENT_SIZE.width, y: 0};
var rightBottom = {x: CONTENT_SIZE.width, y: CONTENT_SIZE.height};

var leftWall = new VerticalWall(leftTop, CONTENT_SIZE.height);
var rightWall = new VerticalWall(rightTop, CONTENT_SIZE.height);
var upWallLeft = new HorizontalWall(leftTop, ENTRY_COORDINATE.x - 1);
var upWallRight = new HorizontalWall({
    x: ENTRY_COORDINATE.x + 1, y: 0
}, CONTENT_SIZE.width - ENTRY_COORDINATE.x - 1);
var bottomWall = new HorizontalWall(leftBottom, CONTENT_SIZE.width);

export var InitialWallsProvider = {
  getInitialWalls: function() {
    return [
      leftWall,
      rightWall,
      upWallLeft,
      upWallRight,
      bottomWall
    ];
  }
};

export var VerticalWall = function(startCoordinate, length) {
  this.startCoordinate = startCoordinate;
  this.length = length;
}
VerticalWall.prototype.getPath = function functionName() {
  var x = this.startCoordinate.x;
  var y1 = this.startCoordinate.y;
  var y2 = y1 + this.length;
  return 'M' + x + ' ' + y1 + ' ' + 'L' + x + ' ' + y2;;
}
VerticalWall.prototype.isCollisioning = function(coordinate) {
  if (coordinate.x != this.startCoordinate.x) { return false; }
  return (coordinate.y >= this.startCoordinate.y) && (coordinate.y <= (this.startCoordinate.y + this.length));
}

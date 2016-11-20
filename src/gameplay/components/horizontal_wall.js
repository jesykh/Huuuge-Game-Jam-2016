export var HorizontalWall = function(startCoordinate, length) {
  this.startCoordinate = startCoordinate;
  this.length = length;
}
HorizontalWall.prototype.getPath = function functionName() {
  var x1 = this.startCoordinate.x;
  var x2 = x1 + this.length;
  var y = this.startCoordinate.y;
  return 'M' + x1 + ' ' + y + ' L' + x2 + ' ' + y;
}
HorizontalWall.prototype.isCollisioning = function(coordinate) {
  if (coordinate.y != this.startCoordinate.y) { return false; }
  return (coordinate.x >= this.startCoordinate.x) && (coordinate.x <= (this.startCoordinate.x + this.length));
}

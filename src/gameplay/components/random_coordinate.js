export var RandomCoordinate = {
  getRandomIn: function(size) {
    return {
      x: _randomBetween(2, size.width - 2),
      y: _randomBetween(2, size.height - 2)
    };
  }
}
function _randomBetween(a, b) {
  return Math.floor((Math.random() * b) + a);
}

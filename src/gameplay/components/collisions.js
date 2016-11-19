export function Collisions() {
  this._collisions = [];
}
Collisions.prototype.add = function(collision) {
  this._collisions.push(collision);
};
Collisions.prototype.addAll = function(collisions) {
  var self = this;
  _(collisions).each(function(collision) {
    self.add(collision);
  });
};
Collisions.prototype.isCollisioning = function(coordinate) {
  return _(this._collisions).any(function(collision) {
    return collision.isCollisioning(coordinate);
  });
};

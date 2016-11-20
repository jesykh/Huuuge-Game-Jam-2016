export function Stars(size, circle) {
  this._stars = [];
}
Stars.prototype.addAt = function(coordinate) {
  if (!coordinate) {return;}
  this._stars.push(_(coordinate).clone());
};
Stars.prototype.removeFrom = function(coordinate) {
  var toRemove = _(this._stars).find(coordinate);
  this._stars = _(this._stars).without(toRemove);
};
Stars.prototype.getIndex = function(coordinate) {
  var found = _(this._stars).find(coordinate);
  return this._stars.indexOf(found);
};
Stars.prototype.isCollisioning = function(coordinate) {
  return _(this._stars).any(coordinate);
}

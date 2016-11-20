export function Direction(head, tail) {
  this._head = head;
  this._tail = tail;
}

Direction.prototype.isHeadingLeft = function() {
  return this.isHeadingVertically() && (this._head.x < this._tail.x);
};
Direction.prototype.isHeadingTop = function() {
  return this.isHeadingVertically() && (this._head.y < this._tail.y);
};
Direction.prototype.isHeadingRight = function() {
  return this.isHeadingHorizontally() && !this.isHeadingLeft();
};
Direction.prototype.isHeadingBottom = function () {
  return this.isHeadingVertically() && !this.isHeadingTop();
};

Direction.prototype.isHeadingVertically = function() {
  return !this.isHeadingHorizontally();
};
Direction.prototype.isHeadingHorizontally = function() {
  return this._head.y === this._tail.y;
};

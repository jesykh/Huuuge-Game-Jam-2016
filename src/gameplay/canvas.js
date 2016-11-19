var paper;
var instance;

function _getInstance() {
  if (!instance) {
    instance = _createInstance();
  }

  return instance;
}

function _createInstance() {
  paper = Raphael('game-box__content', '100%', '100%');
  return {};
}

export var Canvas = {
  getInstance: _getInstance
};

import { Unit } from './unit';
import { CONTENT_SIZE } from './content_size';

var SIZE = CONTENT_SIZE;

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
  paper.setViewBox(0, 0, SIZE.width, SIZE.height, true);
  return {
    getPaper: function() {
      return paper;
    }
  };
}

export var Canvas = {
  getInstance: _getInstance
};

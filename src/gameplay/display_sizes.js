var DISPLAY_RATIO = 16.0/9.0;
var SIDEBAR_RATIO = 0.25;
var BOX_RATIO = 1.0 - SIDEBAR_RATIO;

function _getWidth() {
  return _getDisplaySize().width;
}

function _getHeight() {
  return _getDisplaySize().height;
}

function _getSidebarWidth() {
  return SIDEBAR_RATIO * _getDisplaySize().width;
}
function _getContentWidth() {
  return BOX_RATIO * _getDisplaySize().width;
}

function _getDisplaySize() {
  var width, height
  if (_isWindowWiderThanDisplay()) {
    height = $(window).height();
    width = height * DISPLAY_RATIO;
  } else {
    width = $(window).width();
    height = width / DISPLAY_RATIO;
  }

  return {width: width, height: height};
}

function _isWindowWiderThanDisplay() {
  var windowWidth = $(window).width();
  var windowHeight = $(window).height();
  var windowRatio = windowWidth / windowHeight;

  return windowRatio > DISPLAY_RATIO;
}

export var DisplaySizes = {
  getContentWidth: _getContentWidth,
  getSidebarWidth: _getSidebarWidth,
  getWidth: _getWidth,
  getHeight: _getHeight
};

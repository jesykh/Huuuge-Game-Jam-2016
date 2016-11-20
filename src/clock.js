var SECOND = 500;

setInterval(function() {
  $('body').trigger('clock:tick');
}, 1 * SECOND)

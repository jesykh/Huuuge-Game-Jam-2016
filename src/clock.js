var SECOND = 1000;

setInterval(function() {
  $('body').trigger('clock:tick');
}, 1 * SECOND)

export var Status = {
  setSucceded: function() {
    $('body').trigger('game:winner');
  },
  setFailed: function() {
    $('body').trigger('game:over');
  },
  started: false,
  ended: false,
  points: 0
}

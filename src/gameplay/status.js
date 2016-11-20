export var Status = {
  setSucceded: function() {
    $('body').trigger('game:winner');
  },
  setFailed: function() {
    console.info('you failed');
    alert('you failed');
    $('body').trigger('game:over');
  },
  started: false,
  ended: false,
  points: 0
}

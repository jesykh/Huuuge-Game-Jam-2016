import { Status } from './status';
var MAX_COMMANDS_COUNT = 3;


export var Commands = {
  _commands: [],
  addCommand: function(commandName) {
    if (this.hasFreeSlots()) {
      this._commands.push(commandName);
    }
  },
  popCommand: function() {
    return this._commands.shift();
  },
  hasCommands: function() {
    return this._commands.length > 0;
  },
  hasFreeSlots: function() {
    return this._commands.length < MAX_COMMANDS_COUNT;
  }
}

var KEY_BINDINGS = {
  ArrowLeft: 'left',
  ArrowUp: 'up',
  ArrowRight: 'right',
  ArrowDown: 'down'
}

$('body').keydown(function(event) {
  var command = KEY_BINDINGS[event.key];
  if (command) {
    Commands.addCommand(command);
  }
});

annyang.addCommands({
  left: function() {Commands.addCommand('left')},
  up: function() {Commands.addCommand('up')},
  right: function() {Commands.addCommand('right')},
  down: function() {Commands.addCommand('down')},
});
annyang.start();

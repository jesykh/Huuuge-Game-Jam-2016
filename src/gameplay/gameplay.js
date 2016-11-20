import { DisplaySizes } from './display_sizes';
import { Canvas } from './canvas';
import { Collisions } from './components/collisions';
import { Snake } from './components/snake';
import { Status } from './status';
import { Commands } from './commands';
import { InitialWallsProvider } from './initial_walls_provider';


function _applySizes() {
    var $gameBox = $('.game-box');
    $gameBox.width(DisplaySizes.getWidth())
    $gameBox.height(DisplaySizes.getHeight())
}

_applySizes();

var wallCollisions = new Collisions();
var walls = InitialWallsProvider.getInitialWalls();
wallCollisions.addAll(walls);

var snake = Snake.getInstance();

var canvas = Canvas.getInstance();
var snakePaths = ['snake--main', 'snake--light'].map(function(snakeClass) {
    return canvas.getPaper()
        .path(snake.getPath())
        .attr('stroke-linecap', 'round')
        .attr('stroke-linejoin', 'round')
        .attr('class', snakeClass);
});
_(walls).each(function(wall) {
    ['wall--main', 'wall--light', 'wall--superlight'].map(function(wallClass) {
        canvas.getPaper()
            .path(wall.getPath())
            .attr('stroke-linecap', 'square')
            .attr('class', wallClass);
    });
});

function handleTick() {
    if (Commands.hasCommands()) {
        var command = Commands.popCommand();
        switch (command) {
            case 'left':
                snake.moveLeft();
                break;
            case 'up':
                snake.moveUp();
                break;
            case 'right':
                snake.moveRight();
                break;
            case 'down':
                snake.moveDown();
                break;
            default:
        }
    } else {
        snake.moveForward();
    }
    snake.removeFromEnd();
    var head = snake.getHeadCoordinate();
    if (wallCollisions.isCollisioning(head) || snake.isCollisioning(head)) {
        Status.setFailed();
        $('body').off('clock:tick', handleTick);
        return;
    }

    _(snakePaths).each(function(snakePath) {
        snakePath
            .animate({'path': snake.getPath()}, 500);
    });
}

$('body').on('clock:tick', handleTick);

export var Gameplay = {
    run: function() {
    }
};

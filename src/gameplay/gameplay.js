import { DisplaySizes } from './display_sizes';
import { Canvas } from './canvas';
import { Collisions } from './components/collisions';
import { Snake } from './components/snake';
import { Status } from './status';
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
var snakePath = canvas.getPaper()
    .path(snake.getPath())
    .attr('stroke-linecap', 'round');
_(walls).each(function(wall) {
    canvas.getPaper()
        .path(wall.getPath())
        .attr('stroke-linecap', 'square');
});

$('body').on('clock:tick', function() {
    snake.moveForward();
    snake.removeFromEnd();
    var head = snake.getHeadCoordinate();
    console.info(wallCollisions.isCollisioning(head));
    if (wallCollisions.isCollisioning(head)) {
        Status.setFailed();
        return;
    }

    snakePath
        .animate({'path': snake.getPath()}, 1000);
});

export var Gameplay = {
    run: function() {
    }
};

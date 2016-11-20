import { app } from 'electron';
import { DisplaySizes } from './display_sizes';
import { CONTENT_SIZE } from './content_size';
import { Canvas } from './canvas';
import { Collisions } from './components/collisions';
import { Snake } from './components/snake';
import { Status } from './status';
import { Commands } from './commands';
import { InitialWallsProvider } from './initial_walls_provider';

import { Stars } from './components/stars';
import { RandomCoordinate } from './components/random_coordinate';

function start() {
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

    var stars = new Stars();
    var starCircles = [];
    for (var i=0; i<20; i++) {
        var coordinate = _getRandomFreeCoordinate();
        if (coordinate) {
            var circle = canvas.getPaper()
                .circle(coordinate.x, coordinate.y, 0.75)
                .attr('class', 'star');
            stars.addAt(coordinate);
            starCircles.push(circle);
        }
    }
    console.info(stars._stars.length, starCircles.length);

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
        var head = snake.getHeadCoordinate();
        if (_isCoordinateConCollisioning(head)) {
            Status.setFailed();
            $('body').off('clock:tick', handleTick);
            return;
        }
        var starIndex = stars.getIndex(head);
        if (starIndex >= 0) {
            $('body').trigger('score:up');
            var starCircle = starCircles[starIndex];
            starCircles.splice(starIndex, 1);
            starCircle.remove();
            stars.removeFrom(head);
        } else {
            snake.removeFromEnd();
        }

        _(snakePaths).each(function(snakePath) {
            snakePath
                .animate({'path': snake.getPath()}, 500);
        });
    }

    function _getRandomFreeCoordinate() {
        var coordinate;
        for (var i=0; i<1000; i++) {
            coordinate = RandomCoordinate.getRandomIn(CONTENT_SIZE);
            if (!_isCoordinateConCollisioning(coordinate) && !(_isCoordinateProCollisioning(coordinate))) {
                return coordinate;
            }
        }
    }
    function _isCoordinateConCollisioning(coordinate) {
        return wallCollisions.isCollisioning(coordinate) || snake.isCollisioning(coordinate);
    }
    function _isCoordinateProCollisioning(coordinate) {
        return stars.isCollisioning(coordinate);
    }

    $('body').on('clock:tick', handleTick);
}

function run() {
    var $endMenu = $('.end-menu');
    $endMenu.hide();
    var $gameBox = $('.game-box');
    console.info($endMenu);
    $('body').on('game:over', function() {
        $gameBox.hide();
        $endMenu.show();
        $endMenu.find('.replay').click(function() {
            window.location.reload();
        });
        $endMenu.find('.exit').click(function() {
            require("electron").remote.app.quit();
        });
    });
    start();
}

export var Gameplay = {
    run: run
};

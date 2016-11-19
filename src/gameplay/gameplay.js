import { DisplaySizes } from './display_sizes';
import { Canvas } from './canvas';
import { Collisions } from './components/collisions';
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

var canvas = Canvas.getInstance();
_(walls).each(function(wall) {
    canvas.getPaper().path(wall.getPath());
});

export var Gameplay = {
    run: function() {
    }
};

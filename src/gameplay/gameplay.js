import { DisplaySizes } from './display_sizes';
import { Canvas } from './canvas';

function _applySizes() {
    var $gameBox = $('.game-box');
    $gameBox.width(DisplaySizes.getWidth())
    $gameBox.height(DisplaySizes.getHeight())
}

_applySizes();
var canvas = Canvas.getInstance();

export var Gameplay = {
    run: function() {
    }
};

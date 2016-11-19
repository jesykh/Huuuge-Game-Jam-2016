import { DisplaySizes } from './display_sizes';

var height = DisplaySizes.getHeight();
// this has to do with game content proportions.
// because it's 16x9, it's recommended to have 9n units a column
// and 16n units a row.
var unitsInColumn = 48;
var unitSize = height / 48.0;
var unitsInRow = DisplaySizes.getContentWidth() / unitSize;

if (Math.round(unitsInRow * 100) % 100) {
  throw 'invalid content size proportions';
}

export var Unit = {
  unitsToPxs: unitSize
};

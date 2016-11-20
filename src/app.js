// Here is the starting point for your application code.
// All stuff below is just to show you how it works. You can delete all of it.

// Use new ES6 modules syntax for everything.
import { remote } from 'electron'; // native electron module
import { Gameplay } from './gameplay/gameplay';
import { Clock } from './clock';

document.addEventListener('DOMContentLoaded', function () {
    Gameplay.run();
});

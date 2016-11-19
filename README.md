Super Space Snake
=================

# Quick start
The only development dependency of this project is [Node.js](https://nodejs.org). So just make sure you have it installed.

To run in development mode, type:

```
git clone https://github.com/jesykh/huuuge-game-jam-2016
cd huuuge-game-jam-2016
npm install
bower install
npm start
```

# Development

### Installation

```
npm install
```
It will also download Electron runtime and install dependencies for the second `package.json` file inside the `app` folder.

### Starting the app

```
npm start
```

### Adding npm modules to your app

Remember to add your dependencies to `app/package.json` file:
```
cd app
npm install name_of_npm_module --save
```

### Working with modules

Thanks to [rollup](https://github.com/rollup/rollup) you can (and should) use ES6 modules for all code in `src` folder. But because ES6 modules still aren't natively supported you can't use them in the `app` folder.

Use ES6 syntax in the `src` folder like this:
```js
import myStuff from './my_lib/my_stuff';
```

But use CommonJS syntax in `app` folder. So the code from above should look as follows:
```js
var myStuff = require('./my_lib/my_stuff');
```

# Testing

### Unit tests

Using [electron-mocha](https://github.com/jprichardson/electron-mocha) test runner with the [chai](http://chaijs.com/api/assert/) assertion library. To run the tests go with standard and use the npm test script:
```
npm test
```
This task searches for all files in `src` directory which respect pattern `*.spec.js`.

### End to end tests

Using [mocha](https://mochajs.org/) test runner and [spectron](http://electron.atom.io/spectron/). Run with command:
```
npm run e2e
```
This task searches for all files in `e2e` directory which respect pattern `*.e2e.js`.

### Code coverage

Using [istanbul](http://gotwarlost.github.io/istanbul/) code coverage tool. Run with command:
```
npm run coverage
```
You can set the reporter(s) by setting `ISTANBUL_REPORTERS` environment variable (defaults to `text-summary` and `html`). The report directory can be set with `ISTANBUL_REPORT_DIR` (defaults to `coverage`).

### Continuous integration

Electron [can be plugged](https://github.com/atom/electron/blob/master/docs/tutorial/testing-on-headless-ci.md) into CI systems. Here two CIs are preconfigured for you. [Travis CI](https://travis-ci.org/) covers testing on OSX and Linux and [App Veyor](https://www.appveyor.com) on Windows.

# Making a release

To package your app into an installer use command:
```
npm install
bower install
npm run release
```
It will start the packaging process for operating system you are running this command on. Ready for distribution file will be outputted to `dist` directory.

You can create Windows installer only when running on Windows, the same is true for Linux and OSX. So to generate all three installers you need all three operating systems.

# License

Released under the MIT license.

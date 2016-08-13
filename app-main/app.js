'use strict';

require('babel-polyfill');
require('./thirdParty/bbplayer');

const angular = require('angular');

const appName = 'From, With, In Records';
const appVersion = '1.5.2';

let app = angular.module(appName, [
    require('./modules/main')
]);

// Constants
app.constant('appTitle', appName);

angular.bootstrap(document, [appName]);

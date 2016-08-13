'use strict';

const moduleName = 'main';
const angular = require('angular');

let mod = angular.module(moduleName, [
    // Angular
    require('angular-animate'),
    require('angular-ui-router'),
    require('angular-sanitize'),
    require('angular-utils-pagination'),
    require('angular-scroll')
]);

// Run
mod.run(require('./run'));

// Config
mod.config(require('./config'));

// Constants
mod.constant('discographySchema', require('./schema/discographySchema'));
mod.constant('artistsSchema', require('./schema/artistsSchema'));
mod.constant('playlistSchema', require('./schema/playlistSchema'));

// Controllers
mod.controller('LandingPageController', require('./controllers/LandingPageController'));
mod.controller('ArtistProfileController', require('./controllers/ArtistProfileController'));
mod.controller('ArtistsController', require('./controllers/ArtistsController'));
mod.controller('DiscographyController', require('./controllers/DiscographyController'));
mod.controller('MapController', require('./controllers/MapController'));
mod.controller('HomePageController', require('./controllers/HomePageController'));
mod.controller('HeaderController', require('./controllers/HeaderController'));
mod.controller('SideNavController', require('./controllers/SideNavController'));
mod.controller('SearchController', require('./controllers/SearchController'));

// Direcitves
mod.directive('header', require('./directives/Header'));
mod.directive('sideNav', require('./directives/SideNav'));
mod.directive('sideBar', require('./directives/SideBar'));
mod.directive('artistSideBar', require('./directives/ArtistSideBar'));
mod.directive('artistDiscography', require('./directives/ArtistDiscography'));
mod.directive('footer', require('./directives/Footer'));
mod.directive('scrollTop', require('./directives/ScrollTop'));

module.exports = moduleName;

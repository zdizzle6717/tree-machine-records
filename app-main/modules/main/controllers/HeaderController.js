'use strict';

HeaderController.$inject = ['$state', '$rootScope', 'playlistSchema'];

function HeaderController($state, $rootScope, playlistSchema) {
    let controller = this;
    controller.scrolled = false;

    controller.playlist = playlistSchema;

    ////////////////////////////////////////////////////


}

module.exports = HeaderController;

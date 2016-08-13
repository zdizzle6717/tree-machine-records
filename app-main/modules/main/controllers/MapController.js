'use strict';

MapController.$inject = ['$state', '$stateParams', 'artistsSchema', '$filter'];
function MapController($state, $stateParams, artistsSchema, $filter) {
    let controller = this;

    controller.artists = artistsSchema;
    controller.locationArtists = $filter('filter')(controller.artists, {countryCode:$stateParams.countryParam});

    ////////////////////////////////////////
}

module.exports = MapController;

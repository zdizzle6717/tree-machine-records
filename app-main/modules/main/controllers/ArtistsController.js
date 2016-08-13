'use strict';

ArtistsController.$inject = ['$state', '$stateParams', 'artistsSchema', '$filter', '$sce'];
function ArtistsController($state, $stateParams, artistsSchema, $filter, $sce) {
    let controller = this;
    controller.sanitizeIframe = sanitizeIframe;

    controller.artists = artistsSchema;
    let artist = $filter('filter')(controller.artists, {artistParam:$stateParams.artistParam});
    controller.currentArtist = artist[0];

    ////////////////////////////////////////

    function sanitizeIframe(html) {
        return $sce.trustAsHtml(html);
    }

}

module.exports = ArtistsController;

'use strict';

ArtistProfileController.$inject = ['$rootScope', '$state', '$stateParams', 'artistsSchema', '$filter', '$sce'];
function ArtistProfileController($rootScope, $state, $stateParams, artistsSchema, $filter, $sce) {
    let controller = this;
    controller.artists = artistsSchema;
    controller.sanitizeIframe = sanitizeIframe;

    let artist = $filter('filter')(controller.artists, {artistParam:$stateParams.artistParam});
    controller.currentArtist = artist[0];
    ////////////////////////////////////////

    $rootScope.$on('stateChangeStart', function() {
        if (controller.currentArtist.length === 0) {
            $state.go('home');
        }
    });

    function sanitizeIframe(html) {
        return $sce.trustAsHtml(html);
    }

}

module.exports = ArtistProfileController;

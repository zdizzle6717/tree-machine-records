'use strict';

DiscographyController.$inject = ['$state', '$stateParams', '$anchorScroll', 'discographySchema', '$filter'];
function DiscographyController($state, $stateParams, $anchorScroll, discographySchema, $filter) {
    let controller = this;

    controller.discography = discographySchema;
    let filtered = $filter('filter')(controller.discography, {discParam:$stateParams.discParam});
    controller.currentDiscography = filtered[0];

    controller.artistDiscography = $filter('filter')(controller.discography, {artistParam:$stateParams.artistParam});

    ////////////////////////////////////////

    controller.scrollTop = function() {
            $anchorScroll();
    };
}

module.exports = DiscographyController;

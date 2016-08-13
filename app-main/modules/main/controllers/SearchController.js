'use strict';

HomePageController.$inject = ['$anchorScroll', 'discographySchema', '$filter', 'playlistSchema'];
function HomePageController($anchorScroll, discographySchema, $filter, playlistSchema) {
    let controller = this;
    controller.playlist = playlistSchema;
    controller.goTop = goTop;

    controller.discography = [];
    var filtered = $filter('filter')(controller.discography, {spotlight:true});
    filtered = $filter('limitTo')(filtered, 5);
    controller.discographySpotlight = filtered;

    function goTop() {
        $anchorScroll();
    }

}

module.exports = HomePageController;

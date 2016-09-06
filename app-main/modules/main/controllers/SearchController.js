'use strict';

HomePageController.$inject = ['$anchorScroll', 'discographySchema', '$filter'];
function HomePageController($anchorScroll, discographySchema, $filter) {
    let controller = this;
    controller.goTop = goTop;
    controller.searchParams = '';
    controller.discography = discographySchema;
    controller.results = [];

    controller.updateResults = function(searchParams) {
        if (searchParams === '') {
            controller.results = [];
        }
        else {
            var filtered = $filter('filter')(discographySchema, searchParams);
            controller.results = filtered;
        }
    };


    function goTop() {
        $anchorScroll();
    }

}

module.exports = HomePageController;

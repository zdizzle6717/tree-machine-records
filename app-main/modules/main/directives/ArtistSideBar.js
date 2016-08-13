'user strict';

artistSideBar.$inject = [];
function artistSideBar() {
    return {
        name: 'artistSideBar',
        replace: true,
        restrict: 'A',
        controller: 'ArtistProfileController as Artist',
        template: require('./templates/artistSideBar.html')
    };
}

module.exports = artistSideBar;

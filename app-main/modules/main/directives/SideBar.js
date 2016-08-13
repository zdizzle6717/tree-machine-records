'user strict';

sideBar.$inject = [];
function sideBar() {
    return {
        name: 'sideBar',
        replace: true,
        restrict: 'A',
        controller: 'HomePageController as Home',
        template: require('./templates/sideBar.html')
    };
}

module.exports = sideBar;

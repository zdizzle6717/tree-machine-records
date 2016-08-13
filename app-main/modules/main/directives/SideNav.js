'user strict';

sideNav.$inject = [];
function sideNav() {
    return {
        name: 'sideNav',
        controller: 'SideNavController as Side',
        replace: true,
        restrict: 'A',
        template: require('./templates/sideNav.html')
    };
}

module.exports = sideNav;

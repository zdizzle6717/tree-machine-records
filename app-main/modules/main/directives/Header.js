'user strict';

header.$inject = ['$window'];
function header($window) {
    return {
        name: 'header',
        controller: 'HeaderController as Header',
        restrict: 'A',
        template: require('./templates/header.html'),
        link: link
    };

    function link(scope, element, attrs, ctrl) {
        let headerWidth = element[0].clientWidth;
        let small = headerWidth < 640 ? true : false;
        let medium = headerWidth <= 774 && headerWidth >= 640 ? true : false;
        let large = headerWidth > 774 ? true : false;

        angular.element($window).bind("scroll", function() {
            if (this.pageYOffset >= 64 && large) {
                ctrl.scrolled = true;
                ctrl.logoStyle = '/images/logo-mini.png';
            } else if (this.pageYOffset >= 85 && medium) {
                ctrl.scrolled = true;
                ctrl.logoStyle = '/images/logo-mini.png';
            } else if (this.pageYOffset >= 185 && small) {
                ctrl.scrolled = true;
                ctrl.logoStyle = '/images/logo-mini.png';
            } else {
                ctrl.scrolled = false;
                ctrl.logoStyle = '/images/logo-mini-alt.png';
            }
           scope.$apply();
       });
   }
}

module.exports = header;

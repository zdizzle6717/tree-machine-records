'use strict';

run.$inject = ['$rootScope', '$anchorScroll', '$location'];
function run($rootScope, $anchorScroll, $location) {
    $rootScope.$on('$stateChangeSuccess', function() {
       $anchorScroll();
    });
}

module.exports = run;

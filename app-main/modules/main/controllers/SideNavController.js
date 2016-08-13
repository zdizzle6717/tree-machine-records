'use strict';

SideNavController.$inject = ['$state', '$rootScope'];
function SideNavController($state, $rootScope) {
    let controller = this;
    controller.toggled = false;

    $rootScope.$on('$stateChangeStart',
      function(event, toState, toParams, fromState, fromParams) {
        controller.currentState = toState.name;
      }
  );

    ////////////////////////////////////////////////////

    controller.toggleSide = function() {
        controller.toggled = !controller.toggled;
        console.log(controller.toggled);
    };

}

module.exports = SideNavController;

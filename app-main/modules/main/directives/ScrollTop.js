'user strict';

scrollTop.$inject = ['$document'];
function scrollTop($document) {
    return {
        name: 'scrollTop',
        restrict: 'A',
        replace: true,
        template: require('./templates/scrollTop.html'),
        controller: function() {
            this.scrollTop = function() {
                    $document.scrollTop(0, 500);
            };
        },
        controllerAs: 'Scroll'
    };

}

module.exports = scrollTop;

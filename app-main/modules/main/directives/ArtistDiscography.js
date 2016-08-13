'user strict';

artistDiscography.$inject = [];
function artistDiscography() {
    return {
        name: 'artistDiscography',
        controller: 'DiscographyController as Disc',
        restrict: 'A',
        template: require('./templates/artistDiscography.html')
    };

}

module.exports = artistDiscography;

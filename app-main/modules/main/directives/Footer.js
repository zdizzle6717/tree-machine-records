'user strict';

footer.$inject = [];
function footer() {
    return {
        name: 'footer',
        restrict: 'A',
        replace: true,
        template: require('./templates/footer.html')
    };

}

module.exports = footer;

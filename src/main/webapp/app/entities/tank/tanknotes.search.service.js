(function() {
    'use strict';

    angular
        .module('natmobApp')
        .factory('TankSearch', TankSearch);

    TankSearch.$inject = ['$resource'];

    function TankSearch($resource) {
        var resourceUrl =  'pondnotes/' + 'api/_search/tanks/:id';

        return $resource(resourceUrl, {}, {
            'query': { method: 'GET', isArray: true}
        });
    }
})();

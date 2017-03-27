(function() {
    'use strict';

    angular
        .module('natmobApp')
        .factory('LocationSearch', LocationSearch);

    LocationSearch.$inject = ['$resource'];

    function LocationSearch($resource) {
        var resourceUrl =  'pondnotes/' + 'api/_search/locations/:id';

        return $resource(resourceUrl, {}, {
            'query': { method: 'GET', isArray: true}
        });
    }
})();

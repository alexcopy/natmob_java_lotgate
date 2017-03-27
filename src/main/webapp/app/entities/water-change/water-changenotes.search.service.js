(function() {
    'use strict';

    angular
        .module('natmobApp')
        .factory('WaterChangeSearch', WaterChangeSearch);

    WaterChangeSearch.$inject = ['$resource'];

    function WaterChangeSearch($resource) {
        var resourceUrl =  'pondnotes/' + 'api/_search/water-changes/:id';

        return $resource(resourceUrl, {}, {
            'query': { method: 'GET', isArray: true}
        });
    }
})();

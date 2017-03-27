(function() {
    'use strict';

    angular
        .module('natmobApp')
        .factory('DeviceSearch', DeviceSearch);

    DeviceSearch.$inject = ['$resource'];

    function DeviceSearch($resource) {
        var resourceUrl =  'pondnotes/' + 'api/_search/devices/:id';

        return $resource(resourceUrl, {}, {
            'query': { method: 'GET', isArray: true}
        });
    }
})();

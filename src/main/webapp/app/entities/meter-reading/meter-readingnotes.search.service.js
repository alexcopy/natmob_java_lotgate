(function() {
    'use strict';

    angular
        .module('natmobApp')
        .factory('MeterReadingSearch', MeterReadingSearch);

    MeterReadingSearch.$inject = ['$resource'];

    function MeterReadingSearch($resource) {
        var resourceUrl =  'pondnotes/' + 'api/_search/meter-readings/:id';

        return $resource(resourceUrl, {}, {
            'query': { method: 'GET', isArray: true}
        });
    }
})();

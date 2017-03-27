(function() {
    'use strict';

    angular
        .module('natmobApp')
        .factory('TempMeterSearch', TempMeterSearch);

    TempMeterSearch.$inject = ['$resource'];

    function TempMeterSearch($resource) {
        var resourceUrl =  'pondnotes/' + 'api/_search/temp-meters/:id';

        return $resource(resourceUrl, {}, {
            'query': { method: 'GET', isArray: true}
        });
    }
})();

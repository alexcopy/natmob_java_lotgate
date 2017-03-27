(function() {
    'use strict';

    angular
        .module('natmobApp')
        .factory('FilterPumpCleaningSearch', FilterPumpCleaningSearch);

    FilterPumpCleaningSearch.$inject = ['$resource'];

    function FilterPumpCleaningSearch($resource) {
        var resourceUrl =  'pondnotes/' + 'api/_search/filter-pump-cleanings/:id';

        return $resource(resourceUrl, {}, {
            'query': { method: 'GET', isArray: true}
        });
    }
})();

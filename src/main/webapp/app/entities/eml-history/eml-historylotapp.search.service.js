(function() {
    'use strict';

    angular
        .module('natmobApp')
        .factory('EmlHistorySearch', EmlHistorySearch);

    EmlHistorySearch.$inject = ['$resource'];

    function EmlHistorySearch($resource) {
        var resourceUrl =  'lotapp/' + 'api/_search/eml-histories/:id';

        return $resource(resourceUrl, {}, {
            'query': { method: 'GET', isArray: true}
        });
    }
})();

(function() {
    'use strict';

    angular
        .module('natmobApp')
        .factory('NatHistorySearch', NatHistorySearch);

    NatHistorySearch.$inject = ['$resource'];

    function NatHistorySearch($resource) {
        var resourceUrl =  'lotapp/' + 'api/_search/nat-histories/:id';

        return $resource(resourceUrl, {}, {
            'query': { method: 'GET', isArray: true}
        });
    }
})();

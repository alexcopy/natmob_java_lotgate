(function() {
    'use strict';

    angular
        .module('natmobApp')
        .factory('Nat_historySearch', Nat_historySearch);

    Nat_historySearch.$inject = ['$resource'];

    function Nat_historySearch($resource) {
        var resourceUrl =  'lotapp/' + 'api/_search/nat-histories/:id';

        return $resource(resourceUrl, {}, {
            'query': { method: 'GET', isArray: true}
        });
    }
})();

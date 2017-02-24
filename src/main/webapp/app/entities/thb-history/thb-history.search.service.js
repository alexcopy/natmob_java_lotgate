(function() {
    'use strict';

    angular
        .module('natmobApp')
        .factory('Thb_historySearch', Thb_historySearch);

    Thb_historySearch.$inject = ['$resource'];

    function Thb_historySearch($resource) {
        var resourceUrl =  'lotapp/' + 'api/_search/thb-histories/:id';

        return $resource(resourceUrl, {}, {
            'query': { method: 'GET', isArray: true}
        });
    }
})();

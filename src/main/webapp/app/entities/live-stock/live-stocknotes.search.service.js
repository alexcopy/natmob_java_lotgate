(function() {
    'use strict';

    angular
        .module('natmobApp')
        .factory('LiveStockSearch', LiveStockSearch);

    LiveStockSearch.$inject = ['$resource'];

    function LiveStockSearch($resource) {
        var resourceUrl =  'pondnotes/' + 'api/_search/live-stocks/:id';

        return $resource(resourceUrl, {}, {
            'query': { method: 'GET', isArray: true}
        });
    }
})();

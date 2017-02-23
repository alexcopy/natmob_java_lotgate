(function() {
    'use strict';

    angular
        .module('natmobApp')
        .factory('Eml_historySearch', Eml_historySearch);

    Eml_historySearch.$inject = ['$resource'];

    function Eml_historySearch($resource) {
        var resourceUrl =  'lotapp/' + 'api/_search/eml-histories/:id';

        return $resource(resourceUrl, {}, {
            'query': { method: 'GET', isArray: true}
        });
    }
})();

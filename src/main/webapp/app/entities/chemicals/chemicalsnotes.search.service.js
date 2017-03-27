(function() {
    'use strict';

    angular
        .module('natmobApp')
        .factory('ChemicalsSearch', ChemicalsSearch);

    ChemicalsSearch.$inject = ['$resource'];

    function ChemicalsSearch($resource) {
        var resourceUrl =  'pondnotes/' + 'api/_search/chemicals/:id';

        return $resource(resourceUrl, {}, {
            'query': { method: 'GET', isArray: true}
        });
    }
})();

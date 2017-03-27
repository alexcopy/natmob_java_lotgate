(function() {
    'use strict';

    angular
        .module('natmobApp')
        .factory('ChemicalAnalysisSearch', ChemicalAnalysisSearch);

    ChemicalAnalysisSearch.$inject = ['$resource'];

    function ChemicalAnalysisSearch($resource) {
        var resourceUrl =  'pondnotes/' + 'api/_search/chemical-analyses/:id';

        return $resource(resourceUrl, {}, {
            'query': { method: 'GET', isArray: true}
        });
    }
})();

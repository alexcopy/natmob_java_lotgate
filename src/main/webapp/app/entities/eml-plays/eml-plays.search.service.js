(function() {
    'use strict';

    angular
        .module('natmobApp')
        .factory('Eml_playsSearch', Eml_playsSearch);

    Eml_playsSearch.$inject = ['$resource'];

    function Eml_playsSearch($resource) {
        var resourceUrl =  'lotapp/' + 'api/_search/eml-plays/:id';

        return $resource(resourceUrl, {}, {
            'query': { method: 'GET', isArray: true}
        });
    }
})();

(function() {
    'use strict';

    angular
        .module('natmobApp')
        .factory('Nat_playsSearch', Nat_playsSearch);

    Nat_playsSearch.$inject = ['$resource'];

    function Nat_playsSearch($resource) {
        var resourceUrl =  'lotapp/' + 'api/_search/nat-plays/:id';

        return $resource(resourceUrl, {}, {
            'query': { method: 'GET', isArray: true}
        });
    }
})();

(function() {
    'use strict';

    angular
        .module('natmobApp')
        .factory('Thb_playsSearch', Thb_playsSearch);

    Thb_playsSearch.$inject = ['$resource'];

    function Thb_playsSearch($resource) {
        var resourceUrl =  'lotapp/' + 'api/_search/thb-plays/:id';

        return $resource(resourceUrl, {}, {
            'query': { method: 'GET', isArray: true}
        });
    }
})();

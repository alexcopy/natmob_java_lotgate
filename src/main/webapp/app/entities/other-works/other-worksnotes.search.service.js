(function() {
    'use strict';

    angular
        .module('natmobApp')
        .factory('OtherWorksSearch', OtherWorksSearch);

    OtherWorksSearch.$inject = ['$resource'];

    function OtherWorksSearch($resource) {
        var resourceUrl =  'pondnotes/' + 'api/_search/other-works/:id';

        return $resource(resourceUrl, {}, {
            'query': { method: 'GET', isArray: true}
        });
    }
})();

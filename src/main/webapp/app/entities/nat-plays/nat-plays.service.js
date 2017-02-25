(function() {
    'use strict';
    angular
        .module('natmobApp')
        .factory('Nat_plays', Nat_plays);

    Nat_plays.$inject = ['$resource'];

    function Nat_plays ($resource) {
        var resourceUrl =  'lotapp/' + 'api/nat-plays/:id';

        return $resource(resourceUrl, {}, {
            'query': { method: 'GET', isArray: true},
            'get': {
                method: 'GET',
                transformResponse: function (data) {
                    if (data) {
                        data = angular.fromJson(data);
                    }
                    return data;
                }
            },
            'update': { method:'PUT' }
        });
    }
})();

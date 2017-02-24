(function() {
    'use strict';
    angular
        .module('natmobApp')
        .factory('Nat_history', Nat_history);

    Nat_history.$inject = ['$resource'];

    function Nat_history ($resource) {
        var resourceUrl =  'lotapp/' + 'api/nat-histories/:id';

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

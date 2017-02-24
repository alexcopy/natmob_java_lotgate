(function() {
    'use strict';
    angular
        .module('natmobApp')
        .factory('Thb_history', Thb_history);

    Thb_history.$inject = ['$resource'];

    function Thb_history ($resource) {
        var resourceUrl =  'lotapp/' + 'api/thb-histories/:id';

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

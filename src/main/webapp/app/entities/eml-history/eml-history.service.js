(function() {
    'use strict';
    angular
        .module('natmobApp')
        .factory('Eml_history', Eml_history);

    Eml_history.$inject = ['$resource'];

    function Eml_history ($resource) {
        var resourceUrl =  'lotapp/' + 'api/eml-histories/:id';

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

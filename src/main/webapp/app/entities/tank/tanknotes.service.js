(function() {
    'use strict';
    angular
        .module('natmobApp')
        .factory('Tank', Tank);

    Tank.$inject = ['$resource'];

    function Tank ($resource) {
        var resourceUrl =  'pondnotes/' + 'api/tanks/:id';

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

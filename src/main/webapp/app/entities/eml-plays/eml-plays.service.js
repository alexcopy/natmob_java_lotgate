(function() {
    'use strict';
    angular
        .module('natmobApp')
        .factory('Eml_plays', Eml_plays);

    Eml_plays.$inject = ['$resource'];

    function Eml_plays ($resource) {
        var resourceUrl =  'lotapp/' + 'api/eml-plays/:id';

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

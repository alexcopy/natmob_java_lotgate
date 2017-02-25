(function() {
    'use strict';
    angular
        .module('natmobApp')
        .factory('Thb_plays', Thb_plays);

    Thb_plays.$inject = ['$resource'];

    function Thb_plays ($resource) {
        var resourceUrl =  'lotapp/' + 'api/thb-plays/:id';

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

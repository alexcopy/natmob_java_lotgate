(function() {
    'use strict';
    angular
        .module('natmobApp')
        .factory('Chemicals', Chemicals);

    Chemicals.$inject = ['$resource', 'DateUtils'];

    function Chemicals ($resource, DateUtils) {
        var resourceUrl =  'pondnotes/' + 'api/chemicals/:id';

        return $resource(resourceUrl, {}, {
            'query': { method: 'GET', isArray: true},
            'get': {
                method: 'GET',
                transformResponse: function (data) {
                    if (data) {
                        data = angular.fromJson(data);
                        data.date = DateUtils.convertDateTimeFromServer(data.date);
                    }
                    return data;
                }
            },
            'update': { method:'PUT' }
        });
    }
})();

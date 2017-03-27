(function() {
    'use strict';
    angular
        .module('natmobApp')
        .factory('ChemicalAnalysis', ChemicalAnalysis);

    ChemicalAnalysis.$inject = ['$resource', 'DateUtils'];

    function ChemicalAnalysis ($resource, DateUtils) {
        var resourceUrl =  'pondnotes/' + 'api/chemical-analyses/:id';

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

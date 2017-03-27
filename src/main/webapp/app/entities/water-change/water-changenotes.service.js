(function() {
    'use strict';
    angular
        .module('natmobApp')
        .factory('WaterChange', WaterChange);

    WaterChange.$inject = ['$resource', 'DateUtils'];

    function WaterChange ($resource, DateUtils) {
        var resourceUrl =  'pondnotes/' + 'api/water-changes/:id';

        return $resource(resourceUrl, {}, {
            'query': { method: 'GET', isArray: true},
            'get': {
                method: 'GET',
                transformResponse: function (data) {
                    if (data) {
                        data = angular.fromJson(data);
                        data.changeDate = DateUtils.convertDateTimeFromServer(data.changeDate);
                    }
                    return data;
                }
            },
            'update': { method:'PUT' }
        });
    }
})();

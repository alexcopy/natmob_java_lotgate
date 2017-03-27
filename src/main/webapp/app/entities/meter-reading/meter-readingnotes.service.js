(function() {
    'use strict';
    angular
        .module('natmobApp')
        .factory('MeterReading', MeterReading);

    MeterReading.$inject = ['$resource', 'DateUtils'];

    function MeterReading ($resource, DateUtils) {
        var resourceUrl =  'pondnotes/' + 'api/meter-readings/:id';

        return $resource(resourceUrl, {}, {
            'query': { method: 'GET', isArray: true},
            'get': {
                method: 'GET',
                transformResponse: function (data) {
                    if (data) {
                        data = angular.fromJson(data);
                        data.readingDate = DateUtils.convertDateTimeFromServer(data.readingDate);
                    }
                    return data;
                }
            },
            'update': { method:'PUT' }
        });
    }
})();

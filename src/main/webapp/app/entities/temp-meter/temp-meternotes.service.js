(function() {
    'use strict';
    angular
        .module('natmobApp')
        .factory('TempMeter', TempMeter);

    TempMeter.$inject = ['$resource', 'DateUtils'];

    function TempMeter ($resource, DateUtils) {
        var resourceUrl =  'pondnotes/' + 'api/temp-meters/:id';

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

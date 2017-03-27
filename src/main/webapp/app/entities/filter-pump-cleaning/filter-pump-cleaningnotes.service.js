(function() {
    'use strict';
    angular
        .module('natmobApp')
        .factory('FilterPumpCleaning', FilterPumpCleaning);

    FilterPumpCleaning.$inject = ['$resource', 'DateUtils'];

    function FilterPumpCleaning ($resource, DateUtils) {
        var resourceUrl =  'pondnotes/' + 'api/filter-pump-cleanings/:id';

        return $resource(resourceUrl, {}, {
            'query': { method: 'GET', isArray: true},
            'get': {
                method: 'GET',
                transformResponse: function (data) {
                    if (data) {
                        data = angular.fromJson(data);
                        data.cleaningDate = DateUtils.convertDateTimeFromServer(data.cleaningDate);
                    }
                    return data;
                }
            },
            'update': { method:'PUT' }
        });
    }
})();

(function() {
    'use strict';
    angular
        .module('natmobApp')
        .factory('LiveStock', LiveStock);

    LiveStock.$inject = ['$resource', 'DateUtils'];

    function LiveStock ($resource, DateUtils) {
        var resourceUrl =  'pondnotes/' + 'api/live-stocks/:id';

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

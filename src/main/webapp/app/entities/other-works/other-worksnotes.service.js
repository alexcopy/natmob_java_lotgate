(function() {
    'use strict';
    angular
        .module('natmobApp')
        .factory('OtherWorks', OtherWorks);

    OtherWorks.$inject = ['$resource', 'DateUtils'];

    function OtherWorks ($resource, DateUtils) {
        var resourceUrl =  'pondnotes/' + 'api/other-works/:id';

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

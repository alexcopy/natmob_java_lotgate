(function() {
    'use strict';
    angular
        .module('natmobApp')
        .factory('EmlHistory', EmlHistory);

    EmlHistory.$inject = ['$resource', 'DateUtils'];

    function EmlHistory ($resource, DateUtils) {
        var resourceUrl =  'lotapp/' + 'api/eml-histories/:id';

        return $resource(resourceUrl, {}, {
            'query': { method: 'GET', isArray: true},
            'get': {
                method: 'GET',
                transformResponse: function (data) {
                    if (data) {
                        data = angular.fromJson(data);
                        data.drawDate = DateUtils.convertLocalDateFromServer(data.drawDate);
                    }
                    return data;
                }
            },
            'update': {
                method: 'PUT',
                transformRequest: function (data) {
                    var copy = angular.copy(data);
                    copy.drawDate = DateUtils.convertLocalDateToServer(copy.drawDate);
                    return angular.toJson(copy);
                }
            },
            'save': {
                method: 'POST',
                transformRequest: function (data) {
                    var copy = angular.copy(data);
                    copy.drawDate = DateUtils.convertLocalDateToServer(copy.drawDate);
                    return angular.toJson(copy);
                }
            }
        });
    }
})();

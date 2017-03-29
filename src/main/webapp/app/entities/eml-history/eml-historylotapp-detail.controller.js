(function() {
    'use strict';

    angular
        .module('natmobApp')
        .controller('EmlHistoryLotappDetailController', EmlHistoryLotappDetailController);

    EmlHistoryLotappDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'previousState', 'entity', 'EmlHistory'];

    function EmlHistoryLotappDetailController($scope, $rootScope, $stateParams, previousState, entity, EmlHistory) {
        var vm = this;

        vm.emlHistory = entity;
        vm.previousState = previousState.name;

        var unsubscribe = $rootScope.$on('natmobApp:emlHistoryUpdate', function(event, result) {
            vm.emlHistory = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();

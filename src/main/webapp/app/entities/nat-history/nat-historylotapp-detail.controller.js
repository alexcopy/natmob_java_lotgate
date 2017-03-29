(function() {
    'use strict';

    angular
        .module('natmobApp')
        .controller('NatHistoryLotappDetailController', NatHistoryLotappDetailController);

    NatHistoryLotappDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'previousState', 'entity', 'NatHistory'];

    function NatHistoryLotappDetailController($scope, $rootScope, $stateParams, previousState, entity, NatHistory) {
        var vm = this;

        vm.natHistory = entity;
        vm.previousState = previousState.name;

        var unsubscribe = $rootScope.$on('natmobApp:natHistoryUpdate', function(event, result) {
            vm.natHistory = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();

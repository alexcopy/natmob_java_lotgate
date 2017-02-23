(function() {
    'use strict';

    angular
        .module('natmobApp')
        .controller('Nat_historyDetailController', Nat_historyDetailController);

    Nat_historyDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'previousState', 'entity', 'Nat_history'];

    function Nat_historyDetailController($scope, $rootScope, $stateParams, previousState, entity, Nat_history) {
        var vm = this;

        vm.nat_history = entity;
        vm.previousState = previousState.name;

        var unsubscribe = $rootScope.$on('natmobApp:nat_historyUpdate', function(event, result) {
            vm.nat_history = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();

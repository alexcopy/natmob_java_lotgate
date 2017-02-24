(function() {
    'use strict';

    angular
        .module('natmobApp')
        .controller('Thb_historyDetailController', Thb_historyDetailController);

    Thb_historyDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'previousState', 'entity', 'Thb_history'];

    function Thb_historyDetailController($scope, $rootScope, $stateParams, previousState, entity, Thb_history) {
        var vm = this;

        vm.thb_history = entity;
        vm.previousState = previousState.name;

        var unsubscribe = $rootScope.$on('natmobApp:thb_historyUpdate', function(event, result) {
            vm.thb_history = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();

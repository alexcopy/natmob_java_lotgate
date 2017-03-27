(function() {
    'use strict';

    angular
        .module('natmobApp')
        .controller('TankNotesDetailController', TankNotesDetailController);

    TankNotesDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'previousState', 'entity', 'Tank', 'Location'];

    function TankNotesDetailController($scope, $rootScope, $stateParams, previousState, entity, Tank, Location) {
        var vm = this;

        vm.tank = entity;
        vm.previousState = previousState.name;

        var unsubscribe = $rootScope.$on('natmobApp:tankUpdate', function(event, result) {
            vm.tank = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();

(function() {
    'use strict';

    angular
        .module('natmobApp')
        .controller('DeviceNotesDetailController', DeviceNotesDetailController);

    DeviceNotesDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'previousState', 'entity', 'Device', 'Tank'];

    function DeviceNotesDetailController($scope, $rootScope, $stateParams, previousState, entity, Device, Tank) {
        var vm = this;

        vm.device = entity;
        vm.previousState = previousState.name;

        var unsubscribe = $rootScope.$on('natmobApp:deviceUpdate', function(event, result) {
            vm.device = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();

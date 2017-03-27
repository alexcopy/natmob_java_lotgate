(function() {
    'use strict';

    angular
        .module('natmobApp')
        .controller('TempMeterNotesDetailController', TempMeterNotesDetailController);

    TempMeterNotesDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'previousState', 'entity', 'TempMeter', 'Tank'];

    function TempMeterNotesDetailController($scope, $rootScope, $stateParams, previousState, entity, TempMeter, Tank) {
        var vm = this;

        vm.tempMeter = entity;
        vm.previousState = previousState.name;

        var unsubscribe = $rootScope.$on('natmobApp:tempMeterUpdate', function(event, result) {
            vm.tempMeter = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();

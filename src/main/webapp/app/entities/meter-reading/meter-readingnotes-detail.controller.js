(function() {
    'use strict';

    angular
        .module('natmobApp')
        .controller('MeterReadingNotesDetailController', MeterReadingNotesDetailController);

    MeterReadingNotesDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'previousState', 'entity', 'MeterReading'];

    function MeterReadingNotesDetailController($scope, $rootScope, $stateParams, previousState, entity, MeterReading) {
        var vm = this;

        vm.meterReading = entity;
        vm.previousState = previousState.name;

        var unsubscribe = $rootScope.$on('natmobApp:meterReadingUpdate', function(event, result) {
            vm.meterReading = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();

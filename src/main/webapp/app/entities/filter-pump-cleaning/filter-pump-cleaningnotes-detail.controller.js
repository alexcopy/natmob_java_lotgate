(function() {
    'use strict';

    angular
        .module('natmobApp')
        .controller('FilterPumpCleaningNotesDetailController', FilterPumpCleaningNotesDetailController);

    FilterPumpCleaningNotesDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'previousState', 'entity', 'FilterPumpCleaning'];

    function FilterPumpCleaningNotesDetailController($scope, $rootScope, $stateParams, previousState, entity, FilterPumpCleaning) {
        var vm = this;

        vm.filterPumpCleaning = entity;
        vm.previousState = previousState.name;

        var unsubscribe = $rootScope.$on('natmobApp:filterPumpCleaningUpdate', function(event, result) {
            vm.filterPumpCleaning = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();

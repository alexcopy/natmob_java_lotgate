(function() {
    'use strict';

    angular
        .module('natmobApp')
        .controller('ChemicalsNotesDetailController', ChemicalsNotesDetailController);

    ChemicalsNotesDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'previousState', 'entity', 'Chemicals'];

    function ChemicalsNotesDetailController($scope, $rootScope, $stateParams, previousState, entity, Chemicals) {
        var vm = this;

        vm.chemicals = entity;
        vm.previousState = previousState.name;

        var unsubscribe = $rootScope.$on('natmobApp:chemicalsUpdate', function(event, result) {
            vm.chemicals = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();

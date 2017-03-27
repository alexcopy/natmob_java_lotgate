(function() {
    'use strict';

    angular
        .module('natmobApp')
        .controller('ChemicalAnalysisNotesDetailController', ChemicalAnalysisNotesDetailController);

    ChemicalAnalysisNotesDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'previousState', 'entity', 'ChemicalAnalysis', 'Tank'];

    function ChemicalAnalysisNotesDetailController($scope, $rootScope, $stateParams, previousState, entity, ChemicalAnalysis, Tank) {
        var vm = this;

        vm.chemicalAnalysis = entity;
        vm.previousState = previousState.name;

        var unsubscribe = $rootScope.$on('natmobApp:chemicalAnalysisUpdate', function(event, result) {
            vm.chemicalAnalysis = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();

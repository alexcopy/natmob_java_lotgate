(function() {
    'use strict';

    angular
        .module('natmobApp')
        .controller('ChemicalAnalysisNotesDeleteController',ChemicalAnalysisNotesDeleteController);

    ChemicalAnalysisNotesDeleteController.$inject = ['$uibModalInstance', 'entity', 'ChemicalAnalysis'];

    function ChemicalAnalysisNotesDeleteController($uibModalInstance, entity, ChemicalAnalysis) {
        var vm = this;

        vm.chemicalAnalysis = entity;
        vm.clear = clear;
        vm.confirmDelete = confirmDelete;

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function confirmDelete (id) {
            ChemicalAnalysis.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        }
    }
})();

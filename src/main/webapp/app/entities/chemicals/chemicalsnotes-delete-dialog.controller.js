(function() {
    'use strict';

    angular
        .module('natmobApp')
        .controller('ChemicalsNotesDeleteController',ChemicalsNotesDeleteController);

    ChemicalsNotesDeleteController.$inject = ['$uibModalInstance', 'entity', 'Chemicals'];

    function ChemicalsNotesDeleteController($uibModalInstance, entity, Chemicals) {
        var vm = this;

        vm.chemicals = entity;
        vm.clear = clear;
        vm.confirmDelete = confirmDelete;

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function confirmDelete (id) {
            Chemicals.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        }
    }
})();

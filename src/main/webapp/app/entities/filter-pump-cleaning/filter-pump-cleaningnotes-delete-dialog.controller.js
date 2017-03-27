(function() {
    'use strict';

    angular
        .module('natmobApp')
        .controller('FilterPumpCleaningNotesDeleteController',FilterPumpCleaningNotesDeleteController);

    FilterPumpCleaningNotesDeleteController.$inject = ['$uibModalInstance', 'entity', 'FilterPumpCleaning'];

    function FilterPumpCleaningNotesDeleteController($uibModalInstance, entity, FilterPumpCleaning) {
        var vm = this;

        vm.filterPumpCleaning = entity;
        vm.clear = clear;
        vm.confirmDelete = confirmDelete;

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function confirmDelete (id) {
            FilterPumpCleaning.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        }
    }
})();

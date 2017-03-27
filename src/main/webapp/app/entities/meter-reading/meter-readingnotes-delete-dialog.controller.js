(function() {
    'use strict';

    angular
        .module('natmobApp')
        .controller('MeterReadingNotesDeleteController',MeterReadingNotesDeleteController);

    MeterReadingNotesDeleteController.$inject = ['$uibModalInstance', 'entity', 'MeterReading'];

    function MeterReadingNotesDeleteController($uibModalInstance, entity, MeterReading) {
        var vm = this;

        vm.meterReading = entity;
        vm.clear = clear;
        vm.confirmDelete = confirmDelete;

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function confirmDelete (id) {
            MeterReading.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        }
    }
})();

(function() {
    'use strict';

    angular
        .module('natmobApp')
        .controller('TempMeterNotesDeleteController',TempMeterNotesDeleteController);

    TempMeterNotesDeleteController.$inject = ['$uibModalInstance', 'entity', 'TempMeter'];

    function TempMeterNotesDeleteController($uibModalInstance, entity, TempMeter) {
        var vm = this;

        vm.tempMeter = entity;
        vm.clear = clear;
        vm.confirmDelete = confirmDelete;

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function confirmDelete (id) {
            TempMeter.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        }
    }
})();

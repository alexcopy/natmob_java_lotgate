(function() {
    'use strict';

    angular
        .module('natmobApp')
        .controller('DeviceNotesDeleteController',DeviceNotesDeleteController);

    DeviceNotesDeleteController.$inject = ['$uibModalInstance', 'entity', 'Device'];

    function DeviceNotesDeleteController($uibModalInstance, entity, Device) {
        var vm = this;

        vm.device = entity;
        vm.clear = clear;
        vm.confirmDelete = confirmDelete;

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function confirmDelete (id) {
            Device.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        }
    }
})();

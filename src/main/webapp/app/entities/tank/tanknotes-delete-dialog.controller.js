(function() {
    'use strict';

    angular
        .module('natmobApp')
        .controller('TankNotesDeleteController',TankNotesDeleteController);

    TankNotesDeleteController.$inject = ['$uibModalInstance', 'entity', 'Tank'];

    function TankNotesDeleteController($uibModalInstance, entity, Tank) {
        var vm = this;

        vm.tank = entity;
        vm.clear = clear;
        vm.confirmDelete = confirmDelete;

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function confirmDelete (id) {
            Tank.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        }
    }
})();

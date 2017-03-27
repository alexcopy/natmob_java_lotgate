(function() {
    'use strict';

    angular
        .module('natmobApp')
        .controller('WaterChangeNotesDeleteController',WaterChangeNotesDeleteController);

    WaterChangeNotesDeleteController.$inject = ['$uibModalInstance', 'entity', 'WaterChange'];

    function WaterChangeNotesDeleteController($uibModalInstance, entity, WaterChange) {
        var vm = this;

        vm.waterChange = entity;
        vm.clear = clear;
        vm.confirmDelete = confirmDelete;

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function confirmDelete (id) {
            WaterChange.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        }
    }
})();

(function() {
    'use strict';

    angular
        .module('natmobApp')
        .controller('LiveStockNotesDeleteController',LiveStockNotesDeleteController);

    LiveStockNotesDeleteController.$inject = ['$uibModalInstance', 'entity', 'LiveStock'];

    function LiveStockNotesDeleteController($uibModalInstance, entity, LiveStock) {
        var vm = this;

        vm.liveStock = entity;
        vm.clear = clear;
        vm.confirmDelete = confirmDelete;

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function confirmDelete (id) {
            LiveStock.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        }
    }
})();

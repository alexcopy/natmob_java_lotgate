(function() {
    'use strict';

    angular
        .module('natmobApp')
        .controller('NatHistoryLotappDeleteController',NatHistoryLotappDeleteController);

    NatHistoryLotappDeleteController.$inject = ['$uibModalInstance', 'entity', 'NatHistory'];

    function NatHistoryLotappDeleteController($uibModalInstance, entity, NatHistory) {
        var vm = this;

        vm.natHistory = entity;
        vm.clear = clear;
        vm.confirmDelete = confirmDelete;

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function confirmDelete (id) {
            NatHistory.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        }
    }
})();

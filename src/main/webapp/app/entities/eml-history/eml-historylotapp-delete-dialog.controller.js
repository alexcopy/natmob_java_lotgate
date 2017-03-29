(function() {
    'use strict';

    angular
        .module('natmobApp')
        .controller('EmlHistoryLotappDeleteController',EmlHistoryLotappDeleteController);

    EmlHistoryLotappDeleteController.$inject = ['$uibModalInstance', 'entity', 'EmlHistory'];

    function EmlHistoryLotappDeleteController($uibModalInstance, entity, EmlHistory) {
        var vm = this;

        vm.emlHistory = entity;
        vm.clear = clear;
        vm.confirmDelete = confirmDelete;

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function confirmDelete (id) {
            EmlHistory.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        }
    }
})();

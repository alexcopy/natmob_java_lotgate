(function() {
    'use strict';

    angular
        .module('natmobApp')
        .controller('Thb_historyDeleteController',Thb_historyDeleteController);

    Thb_historyDeleteController.$inject = ['$uibModalInstance', 'entity', 'Thb_history'];

    function Thb_historyDeleteController($uibModalInstance, entity, Thb_history) {
        var vm = this;

        vm.thb_history = entity;
        vm.clear = clear;
        vm.confirmDelete = confirmDelete;

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function confirmDelete (id) {
            Thb_history.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        }
    }
})();

(function() {
    'use strict';

    angular
        .module('natmobApp')
        .controller('Nat_historyDeleteController',Nat_historyDeleteController);

    Nat_historyDeleteController.$inject = ['$uibModalInstance', 'entity', 'Nat_history'];

    function Nat_historyDeleteController($uibModalInstance, entity, Nat_history) {
        var vm = this;

        vm.nat_history = entity;
        vm.clear = clear;
        vm.confirmDelete = confirmDelete;

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function confirmDelete (id) {
            Nat_history.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        }
    }
})();

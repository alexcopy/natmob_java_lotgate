(function() {
    'use strict';

    angular
        .module('natmobApp')
        .controller('Eml_historyDeleteController',Eml_historyDeleteController);

    Eml_historyDeleteController.$inject = ['$uibModalInstance', 'entity', 'Eml_history'];

    function Eml_historyDeleteController($uibModalInstance, entity, Eml_history) {
        var vm = this;

        vm.eml_history = entity;
        vm.clear = clear;
        vm.confirmDelete = confirmDelete;

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function confirmDelete (id) {
            Eml_history.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        }
    }
})();

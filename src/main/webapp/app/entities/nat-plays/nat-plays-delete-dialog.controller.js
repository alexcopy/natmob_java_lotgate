(function() {
    'use strict';

    angular
        .module('natmobApp')
        .controller('Nat_playsDeleteController',Nat_playsDeleteController);

    Nat_playsDeleteController.$inject = ['$uibModalInstance', 'entity', 'Nat_plays'];

    function Nat_playsDeleteController($uibModalInstance, entity, Nat_plays) {
        var vm = this;

        vm.nat_plays = entity;
        vm.clear = clear;
        vm.confirmDelete = confirmDelete;

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function confirmDelete (id) {
            Nat_plays.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        }
    }
})();

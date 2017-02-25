(function() {
    'use strict';

    angular
        .module('natmobApp')
        .controller('Thb_playsDeleteController',Thb_playsDeleteController);

    Thb_playsDeleteController.$inject = ['$uibModalInstance', 'entity', 'Thb_plays'];

    function Thb_playsDeleteController($uibModalInstance, entity, Thb_plays) {
        var vm = this;

        vm.thb_plays = entity;
        vm.clear = clear;
        vm.confirmDelete = confirmDelete;

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function confirmDelete (id) {
            Thb_plays.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        }
    }
})();

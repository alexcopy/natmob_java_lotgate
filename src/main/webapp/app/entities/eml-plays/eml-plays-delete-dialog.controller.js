(function() {
    'use strict';

    angular
        .module('natmobApp')
        .controller('Eml_playsDeleteController',Eml_playsDeleteController);

    Eml_playsDeleteController.$inject = ['$uibModalInstance', 'entity', 'Eml_plays'];

    function Eml_playsDeleteController($uibModalInstance, entity, Eml_plays) {
        var vm = this;

        vm.eml_plays = entity;
        vm.clear = clear;
        vm.confirmDelete = confirmDelete;

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function confirmDelete (id) {
            Eml_plays.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        }
    }
})();

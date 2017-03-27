(function() {
    'use strict';

    angular
        .module('natmobApp')
        .controller('LocationNotesDeleteController',LocationNotesDeleteController);

    LocationNotesDeleteController.$inject = ['$uibModalInstance', 'entity', 'Location'];

    function LocationNotesDeleteController($uibModalInstance, entity, Location) {
        var vm = this;

        vm.location = entity;
        vm.clear = clear;
        vm.confirmDelete = confirmDelete;

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function confirmDelete (id) {
            Location.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        }
    }
})();

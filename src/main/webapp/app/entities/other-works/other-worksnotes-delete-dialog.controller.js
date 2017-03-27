(function() {
    'use strict';

    angular
        .module('natmobApp')
        .controller('OtherWorksNotesDeleteController',OtherWorksNotesDeleteController);

    OtherWorksNotesDeleteController.$inject = ['$uibModalInstance', 'entity', 'OtherWorks'];

    function OtherWorksNotesDeleteController($uibModalInstance, entity, OtherWorks) {
        var vm = this;

        vm.otherWorks = entity;
        vm.clear = clear;
        vm.confirmDelete = confirmDelete;

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function confirmDelete (id) {
            OtherWorks.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        }
    }
})();

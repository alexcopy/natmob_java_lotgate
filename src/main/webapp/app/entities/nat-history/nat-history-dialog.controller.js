(function() {
    'use strict';

    angular
        .module('natmobApp')
        .controller('Nat_historyDialogController', Nat_historyDialogController);

    Nat_historyDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'entity', 'Nat_history'];

    function Nat_historyDialogController ($timeout, $scope, $stateParams, $uibModalInstance, entity, Nat_history) {
        var vm = this;

        vm.nat_history = entity;
        vm.clear = clear;
        vm.save = save;

        $timeout(function (){
            angular.element('.form-group:eq(1)>input').focus();
        });

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function save () {
            vm.isSaving = true;
            if (vm.nat_history.id !== null) {
                Nat_history.update(vm.nat_history, onSaveSuccess, onSaveError);
            } else {
                Nat_history.save(vm.nat_history, onSaveSuccess, onSaveError);
            }
        }

        function onSaveSuccess (result) {
            $scope.$emit('natmobApp:nat_historyUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        }

        function onSaveError () {
            vm.isSaving = false;
        }


    }
})();

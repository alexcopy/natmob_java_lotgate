(function() {
    'use strict';

    angular
        .module('natmobApp')
        .controller('Thb_historyDialogController', Thb_historyDialogController);

    Thb_historyDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'entity', 'Thb_history'];

    function Thb_historyDialogController ($timeout, $scope, $stateParams, $uibModalInstance, entity, Thb_history) {
        var vm = this;

        vm.thb_history = entity;
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
            if (vm.thb_history.id !== null) {
                Thb_history.update(vm.thb_history, onSaveSuccess, onSaveError);
            } else {
                Thb_history.save(vm.thb_history, onSaveSuccess, onSaveError);
            }
        }

        function onSaveSuccess (result) {
            $scope.$emit('natmobApp:thb_historyUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        }

        function onSaveError () {
            vm.isSaving = false;
        }


    }
})();

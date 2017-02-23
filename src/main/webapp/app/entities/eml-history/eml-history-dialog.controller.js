(function() {
    'use strict';

    angular
        .module('natmobApp')
        .controller('Eml_historyDialogController', Eml_historyDialogController);

    Eml_historyDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'entity', 'Eml_history'];

    function Eml_historyDialogController ($timeout, $scope, $stateParams, $uibModalInstance, entity, Eml_history) {
        var vm = this;

        vm.eml_history = entity;
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
            if (vm.eml_history.id !== null) {
                Eml_history.update(vm.eml_history, onSaveSuccess, onSaveError);
            } else {
                Eml_history.save(vm.eml_history, onSaveSuccess, onSaveError);
            }
        }

        function onSaveSuccess (result) {
            $scope.$emit('natmobApp:eml_historyUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        }

        function onSaveError () {
            vm.isSaving = false;
        }


    }
})();

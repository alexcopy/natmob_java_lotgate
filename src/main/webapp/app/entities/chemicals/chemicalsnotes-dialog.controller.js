(function() {
    'use strict';

    angular
        .module('natmobApp')
        .controller('ChemicalsNotesDialogController', ChemicalsNotesDialogController);

    ChemicalsNotesDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'entity', 'Chemicals'];

    function ChemicalsNotesDialogController ($timeout, $scope, $stateParams, $uibModalInstance, entity, Chemicals) {
        var vm = this;

        vm.chemicals = entity;
        vm.clear = clear;
        vm.datePickerOpenStatus = {};
        vm.openCalendar = openCalendar;
        vm.save = save;

        $timeout(function (){
            angular.element('.form-group:eq(1)>input').focus();
        });

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function save () {
            vm.isSaving = true;
            if (vm.chemicals.id !== null) {
                Chemicals.update(vm.chemicals, onSaveSuccess, onSaveError);
            } else {
                Chemicals.save(vm.chemicals, onSaveSuccess, onSaveError);
            }
        }

        function onSaveSuccess (result) {
            $scope.$emit('natmobApp:chemicalsUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        }

        function onSaveError () {
            vm.isSaving = false;
        }

        vm.datePickerOpenStatus.date = false;

        function openCalendar (date) {
            vm.datePickerOpenStatus[date] = true;
        }
    }
})();

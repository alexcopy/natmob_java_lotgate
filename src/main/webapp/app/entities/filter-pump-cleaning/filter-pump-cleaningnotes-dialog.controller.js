(function() {
    'use strict';

    angular
        .module('natmobApp')
        .controller('FilterPumpCleaningNotesDialogController', FilterPumpCleaningNotesDialogController);

    FilterPumpCleaningNotesDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'entity', 'FilterPumpCleaning', 'Device'];

    function FilterPumpCleaningNotesDialogController ($timeout, $scope, $stateParams, $uibModalInstance, entity, FilterPumpCleaning, Device) {
        var vm = this;

        vm.filterPumpCleaning = entity;
        vm.clear = clear;
        vm.datePickerOpenStatus = {};
        vm.openCalendar = openCalendar;
        vm.save = save;
        vm.devices = Device.query();

        $timeout(function (){
            angular.element('.form-group:eq(1)>input').focus();
        });

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function save () {
            vm.isSaving = true;
            if (vm.filterPumpCleaning.id !== null) {
                FilterPumpCleaning.update(vm.filterPumpCleaning, onSaveSuccess, onSaveError);
            } else {
                FilterPumpCleaning.save(vm.filterPumpCleaning, onSaveSuccess, onSaveError);
            }
        }

        function onSaveSuccess (result) {
            $scope.$emit('natmobApp:filterPumpCleaningUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        }

        function onSaveError () {
            vm.isSaving = false;
        }

        vm.datePickerOpenStatus.cleaningDate = false;

        function openCalendar (date) {
            vm.datePickerOpenStatus[date] = true;
        }
    }
})();

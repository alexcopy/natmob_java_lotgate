(function() {
    'use strict';

    angular
        .module('natmobApp')
        .controller('MeterReadingNotesDialogController', MeterReadingNotesDialogController);

    MeterReadingNotesDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'entity', 'MeterReading'];

    function MeterReadingNotesDialogController ($timeout, $scope, $stateParams, $uibModalInstance, entity, MeterReading) {
        var vm = this;

        vm.meterReading = entity;
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
            if (vm.meterReading.id !== null) {
                MeterReading.update(vm.meterReading, onSaveSuccess, onSaveError);
            } else {
                MeterReading.save(vm.meterReading, onSaveSuccess, onSaveError);
            }
        }

        function onSaveSuccess (result) {
            $scope.$emit('natmobApp:meterReadingUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        }

        function onSaveError () {
            vm.isSaving = false;
        }

        vm.datePickerOpenStatus.readingDate = false;

        function openCalendar (date) {
            vm.datePickerOpenStatus[date] = true;
        }
    }
})();

(function() {
    'use strict';

    angular
        .module('natmobApp')
        .controller('TempMeterNotesDialogController', TempMeterNotesDialogController);

    TempMeterNotesDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'entity', 'TempMeter', 'Tank'];

    function TempMeterNotesDialogController ($timeout, $scope, $stateParams, $uibModalInstance, entity, TempMeter, Tank) {
        var vm = this;

        vm.tempMeter = entity;
        vm.clear = clear;
        vm.datePickerOpenStatus = {};
        vm.openCalendar = openCalendar;
        vm.save = save;
        vm.tanks = Tank.query();

        $timeout(function (){
            angular.element('.form-group:eq(1)>input').focus();
        });

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function save () {
            vm.isSaving = true;
            if (vm.tempMeter.id !== null) {
                TempMeter.update(vm.tempMeter, onSaveSuccess, onSaveError);
            } else {
                TempMeter.save(vm.tempMeter, onSaveSuccess, onSaveError);
            }
        }

        function onSaveSuccess (result) {
            $scope.$emit('natmobApp:tempMeterUpdate', result);
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

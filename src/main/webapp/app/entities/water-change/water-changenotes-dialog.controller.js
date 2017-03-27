(function() {
    'use strict';

    angular
        .module('natmobApp')
        .controller('WaterChangeNotesDialogController', WaterChangeNotesDialogController);

    WaterChangeNotesDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'entity', 'WaterChange', 'Tank'];

    function WaterChangeNotesDialogController ($timeout, $scope, $stateParams, $uibModalInstance, entity, WaterChange, Tank) {
        var vm = this;

        vm.waterChange = entity;
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
            if (vm.waterChange.id !== null) {
                WaterChange.update(vm.waterChange, onSaveSuccess, onSaveError);
            } else {
                WaterChange.save(vm.waterChange, onSaveSuccess, onSaveError);
            }
        }

        function onSaveSuccess (result) {
            $scope.$emit('natmobApp:waterChangeUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        }

        function onSaveError () {
            vm.isSaving = false;
        }

        vm.datePickerOpenStatus.changeDate = false;

        function openCalendar (date) {
            vm.datePickerOpenStatus[date] = true;
        }
    }
})();

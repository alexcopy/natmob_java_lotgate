(function() {
    'use strict';

    angular
        .module('natmobApp')
        .controller('NatHistoryLotappDialogController', NatHistoryLotappDialogController);

    NatHistoryLotappDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'entity', 'NatHistory'];

    function NatHistoryLotappDialogController ($timeout, $scope, $stateParams, $uibModalInstance, entity, NatHistory) {
        var vm = this;

        vm.natHistory = entity;
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
            if (vm.natHistory.id !== null) {
                NatHistory.update(vm.natHistory, onSaveSuccess, onSaveError);
            } else {
                NatHistory.save(vm.natHistory, onSaveSuccess, onSaveError);
            }
        }

        function onSaveSuccess (result) {
            $scope.$emit('natmobApp:natHistoryUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        }

        function onSaveError () {
            vm.isSaving = false;
        }

        vm.datePickerOpenStatus.drawDate = false;

        function openCalendar (date) {
            vm.datePickerOpenStatus[date] = true;
        }
    }
})();

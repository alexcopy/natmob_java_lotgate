(function() {
    'use strict';

    angular
        .module('natmobApp')
        .controller('EmlHistoryLotappDialogController', EmlHistoryLotappDialogController);

    EmlHistoryLotappDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'entity', 'EmlHistory'];

    function EmlHistoryLotappDialogController ($timeout, $scope, $stateParams, $uibModalInstance, entity, EmlHistory) {
        var vm = this;

        vm.emlHistory = entity;
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
            if (vm.emlHistory.id !== null) {
                EmlHistory.update(vm.emlHistory, onSaveSuccess, onSaveError);
            } else {
                EmlHistory.save(vm.emlHistory, onSaveSuccess, onSaveError);
            }
        }

        function onSaveSuccess (result) {
            $scope.$emit('natmobApp:emlHistoryUpdate', result);
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

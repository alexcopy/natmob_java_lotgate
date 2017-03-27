(function() {
    'use strict';

    angular
        .module('natmobApp')
        .controller('LiveStockNotesDialogController', LiveStockNotesDialogController);

    LiveStockNotesDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'entity', 'LiveStock', 'Tank'];

    function LiveStockNotesDialogController ($timeout, $scope, $stateParams, $uibModalInstance, entity, LiveStock, Tank) {
        var vm = this;

        vm.liveStock = entity;
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
            if (vm.liveStock.id !== null) {
                LiveStock.update(vm.liveStock, onSaveSuccess, onSaveError);
            } else {
                LiveStock.save(vm.liveStock, onSaveSuccess, onSaveError);
            }
        }

        function onSaveSuccess (result) {
            $scope.$emit('natmobApp:liveStockUpdate', result);
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

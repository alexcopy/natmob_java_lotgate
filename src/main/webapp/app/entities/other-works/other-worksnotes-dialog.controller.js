(function() {
    'use strict';

    angular
        .module('natmobApp')
        .controller('OtherWorksNotesDialogController', OtherWorksNotesDialogController);

    OtherWorksNotesDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'entity', 'OtherWorks'];

    function OtherWorksNotesDialogController ($timeout, $scope, $stateParams, $uibModalInstance, entity, OtherWorks) {
        var vm = this;

        vm.otherWorks = entity;
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
            if (vm.otherWorks.id !== null) {
                OtherWorks.update(vm.otherWorks, onSaveSuccess, onSaveError);
            } else {
                OtherWorks.save(vm.otherWorks, onSaveSuccess, onSaveError);
            }
        }

        function onSaveSuccess (result) {
            $scope.$emit('natmobApp:otherWorksUpdate', result);
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

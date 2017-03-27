(function() {
    'use strict';

    angular
        .module('natmobApp')
        .controller('ChemicalAnalysisNotesDialogController', ChemicalAnalysisNotesDialogController);

    ChemicalAnalysisNotesDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'entity', 'ChemicalAnalysis', 'Tank'];

    function ChemicalAnalysisNotesDialogController ($timeout, $scope, $stateParams, $uibModalInstance, entity, ChemicalAnalysis, Tank) {
        var vm = this;

        vm.chemicalAnalysis = entity;
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
            if (vm.chemicalAnalysis.id !== null) {
                ChemicalAnalysis.update(vm.chemicalAnalysis, onSaveSuccess, onSaveError);
            } else {
                ChemicalAnalysis.save(vm.chemicalAnalysis, onSaveSuccess, onSaveError);
            }
        }

        function onSaveSuccess (result) {
            $scope.$emit('natmobApp:chemicalAnalysisUpdate', result);
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

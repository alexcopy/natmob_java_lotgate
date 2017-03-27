(function() {
    'use strict';

    angular
        .module('natmobApp')
        .controller('TankNotesDialogController', TankNotesDialogController);

    TankNotesDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'entity', 'Tank', 'Location'];

    function TankNotesDialogController ($timeout, $scope, $stateParams, $uibModalInstance, entity, Tank, Location) {
        var vm = this;

        vm.tank = entity;
        vm.clear = clear;
        vm.save = save;
        vm.locations = Location.query();

        $timeout(function (){
            angular.element('.form-group:eq(1)>input').focus();
        });

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function save () {
            vm.isSaving = true;
            if (vm.tank.id !== null) {
                Tank.update(vm.tank, onSaveSuccess, onSaveError);
            } else {
                Tank.save(vm.tank, onSaveSuccess, onSaveError);
            }
        }

        function onSaveSuccess (result) {
            $scope.$emit('natmobApp:tankUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        }

        function onSaveError () {
            vm.isSaving = false;
        }


    }
})();

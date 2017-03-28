(function() {
    'use strict';

    angular
        .module('natmobApp')
        .controller('DeviceNotesDialogController', DeviceNotesDialogController);

    DeviceNotesDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', '$q', 'entity', 'Device', 'Tank'];

    function DeviceNotesDialogController ($timeout, $scope, $stateParams, $uibModalInstance, $q, entity, Device, Tank) {
        var vm = this;

        vm.device = entity;
        vm.clear = clear;
        vm.save = save;
        vm.tanks = Tank.query({filter: 'device-is-null'});
        $q.all([vm.device.$promise, vm.tanks.$promise]).then(function() {
            if (!vm.device.tank || !vm.device.tank.id) {
                return $q.reject();
            }
            return Tank.get({id : vm.device.tank.id}).$promise;
        }).then(function(tank) {
            vm.tanks.push(tank);
        });

        $timeout(function (){
            angular.element('.form-group:eq(1)>input').focus();
        });

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function save () {
            vm.isSaving = true;
            if (vm.device.id !== null) {
                Device.update(vm.device, onSaveSuccess, onSaveError);
            } else {
                Device.save(vm.device, onSaveSuccess, onSaveError);
            }
        }

        function onSaveSuccess (result) {
            $scope.$emit('natmobApp:deviceUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        }

        function onSaveError () {
            vm.isSaving = false;
        }


    }
})();

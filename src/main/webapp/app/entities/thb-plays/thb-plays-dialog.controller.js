(function() {
    'use strict';

    angular
        .module('natmobApp')
        .controller('Thb_playsDialogController', Thb_playsDialogController);

    Thb_playsDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'entity', 'Thb_plays'];

    function Thb_playsDialogController ($timeout, $scope, $stateParams, $uibModalInstance, entity, Thb_plays) {
        var vm = this;

        vm.thb_plays = entity;
        vm.clear = clear;
        vm.save = save;

        $timeout(function (){
            angular.element('.form-group:eq(1)>input').focus();
        });

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function save () {
            vm.isSaving = true;
            if (vm.thb_plays.id !== null) {
                Thb_plays.update(vm.thb_plays, onSaveSuccess, onSaveError);
            } else {
                Thb_plays.save(vm.thb_plays, onSaveSuccess, onSaveError);
            }
        }

        function onSaveSuccess (result) {
            $scope.$emit('natmobApp:thb_playsUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        }

        function onSaveError () {
            vm.isSaving = false;
        }


    }
})();

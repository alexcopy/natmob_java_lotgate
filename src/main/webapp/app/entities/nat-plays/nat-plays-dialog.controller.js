(function() {
    'use strict';

    angular
        .module('natmobApp')
        .controller('Nat_playsDialogController', Nat_playsDialogController);

    Nat_playsDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'entity', 'Nat_plays'];

    function Nat_playsDialogController ($timeout, $scope, $stateParams, $uibModalInstance, entity, Nat_plays) {
        var vm = this;

        vm.nat_plays = entity;
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
            if (vm.nat_plays.id !== null) {
                Nat_plays.update(vm.nat_plays, onSaveSuccess, onSaveError);
            } else {
                Nat_plays.save(vm.nat_plays, onSaveSuccess, onSaveError);
            }
        }

        function onSaveSuccess (result) {
            $scope.$emit('natmobApp:nat_playsUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        }

        function onSaveError () {
            vm.isSaving = false;
        }


    }
})();

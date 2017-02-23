(function() {
    'use strict';

    angular
        .module('natmobApp')
        .controller('Eml_playsDialogController', Eml_playsDialogController);

    Eml_playsDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'entity', 'Eml_plays'];

    function Eml_playsDialogController ($timeout, $scope, $stateParams, $uibModalInstance, entity, Eml_plays) {
        var vm = this;

        vm.eml_plays = entity;
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
            if (vm.eml_plays.id !== null) {
                Eml_plays.update(vm.eml_plays, onSaveSuccess, onSaveError);
            } else {
                Eml_plays.save(vm.eml_plays, onSaveSuccess, onSaveError);
            }
        }

        function onSaveSuccess (result) {
            $scope.$emit('natmobApp:eml_playsUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        }

        function onSaveError () {
            vm.isSaving = false;
        }


    }
})();

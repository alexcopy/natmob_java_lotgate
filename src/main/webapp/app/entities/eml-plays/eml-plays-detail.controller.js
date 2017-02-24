(function() {
    'use strict';

    angular
        .module('natmobApp')
        .controller('Eml_playsDetailController', Eml_playsDetailController);

    Eml_playsDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'previousState', 'entity', 'Eml_plays'];

    function Eml_playsDetailController($scope, $rootScope, $stateParams, previousState, entity, Eml_plays) {
        var vm = this;

        vm.eml_plays = entity;
        vm.previousState = previousState.name;

        var unsubscribe = $rootScope.$on('natmobApp:eml_playsUpdate', function(event, result) {
            vm.eml_plays = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();

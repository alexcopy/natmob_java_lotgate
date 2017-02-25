(function() {
    'use strict';

    angular
        .module('natmobApp')
        .controller('Nat_playsDetailController', Nat_playsDetailController);

    Nat_playsDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'previousState', 'entity', 'Nat_plays'];

    function Nat_playsDetailController($scope, $rootScope, $stateParams, previousState, entity, Nat_plays) {
        var vm = this;

        vm.nat_plays = entity;
        vm.previousState = previousState.name;

        var unsubscribe = $rootScope.$on('natmobApp:nat_playsUpdate', function(event, result) {
            vm.nat_plays = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();

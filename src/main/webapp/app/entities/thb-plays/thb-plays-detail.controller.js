(function() {
    'use strict';

    angular
        .module('natmobApp')
        .controller('Thb_playsDetailController', Thb_playsDetailController);

    Thb_playsDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'previousState', 'entity', 'Thb_plays'];

    function Thb_playsDetailController($scope, $rootScope, $stateParams, previousState, entity, Thb_plays) {
        var vm = this;

        vm.thb_plays = entity;
        vm.previousState = previousState.name;

        var unsubscribe = $rootScope.$on('natmobApp:thb_playsUpdate', function(event, result) {
            vm.thb_plays = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();

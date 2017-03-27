(function() {
    'use strict';

    angular
        .module('natmobApp')
        .controller('LocationNotesDetailController', LocationNotesDetailController);

    LocationNotesDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'previousState', 'entity', 'Location'];

    function LocationNotesDetailController($scope, $rootScope, $stateParams, previousState, entity, Location) {
        var vm = this;

        vm.location = entity;
        vm.previousState = previousState.name;

        var unsubscribe = $rootScope.$on('natmobApp:locationUpdate', function(event, result) {
            vm.location = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();

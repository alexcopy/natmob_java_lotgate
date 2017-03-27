(function() {
    'use strict';

    angular
        .module('natmobApp')
        .controller('WaterChangeNotesDetailController', WaterChangeNotesDetailController);

    WaterChangeNotesDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'previousState', 'entity', 'WaterChange', 'Tank'];

    function WaterChangeNotesDetailController($scope, $rootScope, $stateParams, previousState, entity, WaterChange, Tank) {
        var vm = this;

        vm.waterChange = entity;
        vm.previousState = previousState.name;

        var unsubscribe = $rootScope.$on('natmobApp:waterChangeUpdate', function(event, result) {
            vm.waterChange = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();

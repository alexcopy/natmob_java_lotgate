(function() {
    'use strict';

    angular
        .module('natmobApp')
        .controller('LiveStockNotesDetailController', LiveStockNotesDetailController);

    LiveStockNotesDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'previousState', 'entity', 'LiveStock', 'Tank'];

    function LiveStockNotesDetailController($scope, $rootScope, $stateParams, previousState, entity, LiveStock, Tank) {
        var vm = this;

        vm.liveStock = entity;
        vm.previousState = previousState.name;

        var unsubscribe = $rootScope.$on('natmobApp:liveStockUpdate', function(event, result) {
            vm.liveStock = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();

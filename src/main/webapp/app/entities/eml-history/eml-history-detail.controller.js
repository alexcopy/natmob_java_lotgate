(function() {
    'use strict';

    angular
        .module('natmobApp')
        .controller('Eml_historyDetailController', Eml_historyDetailController);

    Eml_historyDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'previousState', 'entity', 'Eml_history'];

    function Eml_historyDetailController($scope, $rootScope, $stateParams, previousState, entity, Eml_history) {
        var vm = this;

        vm.eml_history = entity;
        vm.previousState = previousState.name;

        var unsubscribe = $rootScope.$on('natmobApp:eml_historyUpdate', function(event, result) {
            vm.eml_history = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();

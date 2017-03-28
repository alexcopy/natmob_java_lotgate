(function() {
    'use strict';

    angular
        .module('natmobApp')
        .controller('OtherWorksNotesDetailController', OtherWorksNotesDetailController);

    OtherWorksNotesDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'previousState', 'entity', 'OtherWorks', 'Tank'];

    function OtherWorksNotesDetailController($scope, $rootScope, $stateParams, previousState, entity, OtherWorks, Tank) {
        var vm = this;

        vm.otherWorks = entity;
        vm.previousState = previousState.name;

        var unsubscribe = $rootScope.$on('natmobApp:otherWorksUpdate', function(event, result) {
            vm.otherWorks = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();

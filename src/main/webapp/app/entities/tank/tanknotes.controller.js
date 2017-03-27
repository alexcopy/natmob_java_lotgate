(function() {
    'use strict';

    angular
        .module('natmobApp')
        .controller('TankNotesController', TankNotesController);

    TankNotesController.$inject = ['$scope', '$state', 'Tank', 'TankSearch'];

    function TankNotesController ($scope, $state, Tank, TankSearch) {
        var vm = this;

        vm.tanks = [];
        vm.clear = clear;
        vm.search = search;
        vm.loadAll = loadAll;

        loadAll();

        function loadAll() {
            Tank.query(function(result) {
                vm.tanks = result;
                vm.searchQuery = null;
            });
        }

        function search() {
            if (!vm.searchQuery) {
                return vm.loadAll();
            }
            TankSearch.query({query: vm.searchQuery}, function(result) {
                vm.tanks = result;
                vm.currentSearch = vm.searchQuery;
            });
        }

        function clear() {
            vm.searchQuery = null;
            loadAll();
        }    }
})();

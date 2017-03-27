(function() {
    'use strict';

    angular
        .module('natmobApp')
        .controller('WaterChangeNotesController', WaterChangeNotesController);

    WaterChangeNotesController.$inject = ['$scope', '$state', 'WaterChange', 'WaterChangeSearch'];

    function WaterChangeNotesController ($scope, $state, WaterChange, WaterChangeSearch) {
        var vm = this;

        vm.waterChanges = [];
        vm.clear = clear;
        vm.search = search;
        vm.loadAll = loadAll;

        loadAll();

        function loadAll() {
            WaterChange.query(function(result) {
                vm.waterChanges = result;
                vm.searchQuery = null;
            });
        }

        function search() {
            if (!vm.searchQuery) {
                return vm.loadAll();
            }
            WaterChangeSearch.query({query: vm.searchQuery}, function(result) {
                vm.waterChanges = result;
                vm.currentSearch = vm.searchQuery;
            });
        }

        function clear() {
            vm.searchQuery = null;
            loadAll();
        }    }
})();

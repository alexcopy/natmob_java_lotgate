(function() {
    'use strict';

    angular
        .module('natmobApp')
        .controller('LocationNotesController', LocationNotesController);

    LocationNotesController.$inject = ['$scope', '$state', 'Location', 'LocationSearch'];

    function LocationNotesController ($scope, $state, Location, LocationSearch) {
        var vm = this;

        vm.locations = [];
        vm.clear = clear;
        vm.search = search;
        vm.loadAll = loadAll;

        loadAll();

        function loadAll() {
            Location.query(function(result) {
                vm.locations = result;
                vm.searchQuery = null;
            });
        }

        function search() {
            if (!vm.searchQuery) {
                return vm.loadAll();
            }
            LocationSearch.query({query: vm.searchQuery}, function(result) {
                vm.locations = result;
                vm.currentSearch = vm.searchQuery;
            });
        }

        function clear() {
            vm.searchQuery = null;
            loadAll();
        }    }
})();

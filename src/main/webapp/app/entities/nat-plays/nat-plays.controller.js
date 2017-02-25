(function() {
    'use strict';

    angular
        .module('natmobApp')
        .controller('Nat_playsController', Nat_playsController);

    Nat_playsController.$inject = ['$scope', '$state', 'Nat_plays', 'Nat_playsSearch'];

    function Nat_playsController ($scope, $state, Nat_plays, Nat_playsSearch) {
        var vm = this;

        vm.nat_plays = [];
        vm.clear = clear;
        vm.search = search;
        vm.loadAll = loadAll;

        loadAll();

        function loadAll() {
            Nat_plays.query(function(result) {
                vm.nat_plays = result;
                vm.searchQuery = null;
            });
        }

        function search() {
            if (!vm.searchQuery) {
                return vm.loadAll();
            }
            Nat_playsSearch.query({query: vm.searchQuery}, function(result) {
                vm.nat_plays = result;
                vm.currentSearch = vm.searchQuery;
            });
        }

        function clear() {
            vm.searchQuery = null;
            loadAll();
        }    }
})();

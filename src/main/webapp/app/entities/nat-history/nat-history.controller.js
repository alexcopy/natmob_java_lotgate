(function() {
    'use strict';

    angular
        .module('natmobApp')
        .controller('Nat_historyController', Nat_historyController);

    Nat_historyController.$inject = ['$scope', '$state', 'Nat_history', 'Nat_historySearch'];

    function Nat_historyController ($scope, $state, Nat_history, Nat_historySearch) {
        var vm = this;

        vm.nat_histories = [];
        vm.clear = clear;
        vm.search = search;
        vm.loadAll = loadAll;

        loadAll();

        function loadAll() {
            Nat_history.query(function(result) {
                vm.nat_histories = result;
                vm.searchQuery = null;
            });
        }

        function search() {
            if (!vm.searchQuery) {
                return vm.loadAll();
            }
            Nat_historySearch.query({query: vm.searchQuery}, function(result) {
                vm.nat_histories = result;
                vm.currentSearch = vm.searchQuery;
            });
        }

        function clear() {
            vm.searchQuery = null;
            loadAll();
        }    }
})();

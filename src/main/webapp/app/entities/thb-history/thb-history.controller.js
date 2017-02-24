(function() {
    'use strict';

    angular
        .module('natmobApp')
        .controller('Thb_historyController', Thb_historyController);

    Thb_historyController.$inject = ['$scope', '$state', 'Thb_history', 'Thb_historySearch'];

    function Thb_historyController ($scope, $state, Thb_history, Thb_historySearch) {
        var vm = this;

        vm.thb_histories = [];
        vm.clear = clear;
        vm.search = search;
        vm.loadAll = loadAll;

        loadAll();

        function loadAll() {
            Thb_history.query(function(result) {
                vm.thb_histories = result;
                vm.searchQuery = null;
            });
        }

        function search() {
            if (!vm.searchQuery) {
                return vm.loadAll();
            }
            Thb_historySearch.query({query: vm.searchQuery}, function(result) {
                vm.thb_histories = result;
                vm.currentSearch = vm.searchQuery;
            });
        }

        function clear() {
            vm.searchQuery = null;
            loadAll();
        }    }
})();

(function() {
    'use strict';

    angular
        .module('natmobApp')
        .controller('EmlHistoryLotappController', EmlHistoryLotappController);

    EmlHistoryLotappController.$inject = ['$scope', '$state', 'EmlHistory', 'EmlHistorySearch'];

    function EmlHistoryLotappController ($scope, $state, EmlHistory, EmlHistorySearch) {
        var vm = this;

        vm.emlHistories = [];
        vm.clear = clear;
        vm.search = search;
        vm.loadAll = loadAll;

        loadAll();

        function loadAll() {
            EmlHistory.query(function(result) {
                vm.emlHistories = result;
                vm.searchQuery = null;
            });
        }

        function search() {
            if (!vm.searchQuery) {
                return vm.loadAll();
            }
            EmlHistorySearch.query({query: vm.searchQuery}, function(result) {
                vm.emlHistories = result;
                vm.currentSearch = vm.searchQuery;
            });
        }

        function clear() {
            vm.searchQuery = null;
            loadAll();
        }    }
})();

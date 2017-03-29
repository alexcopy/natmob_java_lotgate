(function() {
    'use strict';

    angular
        .module('natmobApp')
        .controller('NatHistoryLotappController', NatHistoryLotappController);

    NatHistoryLotappController.$inject = ['$scope', '$state', 'NatHistory', 'NatHistorySearch'];

    function NatHistoryLotappController ($scope, $state, NatHistory, NatHistorySearch) {
        var vm = this;

        vm.natHistories = [];
        vm.clear = clear;
        vm.search = search;
        vm.loadAll = loadAll;

        loadAll();

        function loadAll() {
            NatHistory.query(function(result) {
                vm.natHistories = result;
                vm.searchQuery = null;
            });
        }

        function search() {
            if (!vm.searchQuery) {
                return vm.loadAll();
            }
            NatHistorySearch.query({query: vm.searchQuery}, function(result) {
                vm.natHistories = result;
                vm.currentSearch = vm.searchQuery;
            });
        }

        function clear() {
            vm.searchQuery = null;
            loadAll();
        }    }
})();

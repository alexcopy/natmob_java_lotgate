(function() {
    'use strict';

    angular
        .module('natmobApp')
        .controller('Eml_historyController', Eml_historyController);

    Eml_historyController.$inject = ['$scope', '$state', 'Eml_history', 'Eml_historySearch'];

    function Eml_historyController ($scope, $state, Eml_history, Eml_historySearch) {
        var vm = this;

        vm.eml_histories = [];
        vm.clear = clear;
        vm.search = search;
        vm.loadAll = loadAll;

        loadAll();

        function loadAll() {
            Eml_history.query(function(result) {
                vm.eml_histories = result;
                vm.searchQuery = null;
            });
        }

        function search() {
            if (!vm.searchQuery) {
                return vm.loadAll();
            }
            Eml_historySearch.query({query: vm.searchQuery}, function(result) {
                vm.eml_histories = result;
                vm.currentSearch = vm.searchQuery;
            });
        }

        function clear() {
            vm.searchQuery = null;
            loadAll();
        }    }
})();

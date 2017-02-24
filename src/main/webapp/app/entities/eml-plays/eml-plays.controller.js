(function() {
    'use strict';

    angular
        .module('natmobApp')
        .controller('Eml_playsController', Eml_playsController);

    Eml_playsController.$inject = ['$scope', '$state', 'Eml_plays', 'Eml_playsSearch'];

    function Eml_playsController ($scope, $state, Eml_plays, Eml_playsSearch) {
        var vm = this;

        vm.eml_plays = [];
        vm.clear = clear;
        vm.search = search;
        vm.loadAll = loadAll;

        loadAll();

        function loadAll() {
            Eml_plays.query(function(result) {
                vm.eml_plays = result;
                vm.searchQuery = null;
            });
        }

        function search() {
            if (!vm.searchQuery) {
                return vm.loadAll();
            }
            Eml_playsSearch.query({query: vm.searchQuery}, function(result) {
                vm.eml_plays = result;
                vm.currentSearch = vm.searchQuery;
            });
        }

        function clear() {
            vm.searchQuery = null;
            loadAll();
        }    }
})();

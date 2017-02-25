(function() {
    'use strict';

    angular
        .module('natmobApp')
        .controller('Thb_playsController', Thb_playsController);

    Thb_playsController.$inject = ['$scope', '$state', 'Thb_plays', 'Thb_playsSearch'];

    function Thb_playsController ($scope, $state, Thb_plays, Thb_playsSearch) {
        var vm = this;

        vm.thb_plays = [];
        vm.clear = clear;
        vm.search = search;
        vm.loadAll = loadAll;

        loadAll();

        function loadAll() {
            Thb_plays.query(function(result) {
                vm.thb_plays = result;
                vm.searchQuery = null;
            });
        }

        function search() {
            if (!vm.searchQuery) {
                return vm.loadAll();
            }
            Thb_playsSearch.query({query: vm.searchQuery}, function(result) {
                vm.thb_plays = result;
                vm.currentSearch = vm.searchQuery;
            });
        }

        function clear() {
            vm.searchQuery = null;
            loadAll();
        }    }
})();

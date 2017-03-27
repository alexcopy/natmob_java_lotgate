(function() {
    'use strict';

    angular
        .module('natmobApp')
        .controller('OtherWorksNotesController', OtherWorksNotesController);

    OtherWorksNotesController.$inject = ['$scope', '$state', 'OtherWorks', 'OtherWorksSearch'];

    function OtherWorksNotesController ($scope, $state, OtherWorks, OtherWorksSearch) {
        var vm = this;

        vm.otherWorks = [];
        vm.clear = clear;
        vm.search = search;
        vm.loadAll = loadAll;

        loadAll();

        function loadAll() {
            OtherWorks.query(function(result) {
                vm.otherWorks = result;
                vm.searchQuery = null;
            });
        }

        function search() {
            if (!vm.searchQuery) {
                return vm.loadAll();
            }
            OtherWorksSearch.query({query: vm.searchQuery}, function(result) {
                vm.otherWorks = result;
                vm.currentSearch = vm.searchQuery;
            });
        }

        function clear() {
            vm.searchQuery = null;
            loadAll();
        }    }
})();

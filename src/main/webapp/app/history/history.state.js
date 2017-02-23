(function() {
    'use strict';

    angular
        .module('natmobApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider.state('history', {
            parent: 'app',
            url: '/history',
            data: {
                authorities: [],
                pageTitle: 'global.menu.history'
            },
            views: {
                'content@': {
                    templateUrl: 'app/history/history.html',
                    controller: 'HistoryController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('history');
                    return $translate.refresh();
                }]
            }
        });
    }
})();

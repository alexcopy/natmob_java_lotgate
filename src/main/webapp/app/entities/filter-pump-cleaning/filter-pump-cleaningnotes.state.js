(function() {
    'use strict';

    angular
        .module('natmobApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('filter-pump-cleaningnotes', {
            parent: 'entity',
            url: '/filter-pump-cleaningnotes?page&sort&search',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'natmobApp.filterPumpCleaning.home.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/filter-pump-cleaning/filter-pump-cleaningsnotes.html',
                    controller: 'FilterPumpCleaningNotesController',
                    controllerAs: 'vm'
                }
            },
            params: {
                page: {
                    value: '1',
                    squash: true
                },
                sort: {
                    value: 'id,asc',
                    squash: true
                },
                search: null
            },
            resolve: {
                pagingParams: ['$stateParams', 'PaginationUtil', function ($stateParams, PaginationUtil) {
                    return {
                        page: PaginationUtil.parsePage($stateParams.page),
                        sort: $stateParams.sort,
                        predicate: PaginationUtil.parsePredicate($stateParams.sort),
                        ascending: PaginationUtil.parseAscending($stateParams.sort),
                        search: $stateParams.search
                    };
                }],
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('filterPumpCleaning');
                    $translatePartialLoader.addPart('global');
                    return $translate.refresh();
                }]
            }
        })
        .state('filter-pump-cleaningnotes-detail', {
            parent: 'filter-pump-cleaningnotes',
            url: '/filter-pump-cleaningnotes/{id}',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'natmobApp.filterPumpCleaning.detail.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/filter-pump-cleaning/filter-pump-cleaningnotes-detail.html',
                    controller: 'FilterPumpCleaningNotesDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('filterPumpCleaning');
                    return $translate.refresh();
                }],
                entity: ['$stateParams', 'FilterPumpCleaning', function($stateParams, FilterPumpCleaning) {
                    return FilterPumpCleaning.get({id : $stateParams.id}).$promise;
                }],
                previousState: ["$state", function ($state) {
                    var currentStateData = {
                        name: $state.current.name || 'filter-pump-cleaningnotes',
                        params: $state.params,
                        url: $state.href($state.current.name, $state.params)
                    };
                    return currentStateData;
                }]
            }
        })
        .state('filter-pump-cleaningnotes-detail.edit', {
            parent: 'filter-pump-cleaningnotes-detail',
            url: '/detail/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/filter-pump-cleaning/filter-pump-cleaningnotes-dialog.html',
                    controller: 'FilterPumpCleaningNotesDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['FilterPumpCleaning', function(FilterPumpCleaning) {
                            return FilterPumpCleaning.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('^', {}, { reload: false });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('filter-pump-cleaningnotes.new', {
            parent: 'filter-pump-cleaningnotes',
            url: '/new',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/filter-pump-cleaning/filter-pump-cleaningnotes-dialog.html',
                    controller: 'FilterPumpCleaningNotesDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: function () {
                            return {
                                cleaningDate: null,
                                description: null,
                                tempVal: null,
                                timestamp: null,
                                id: null
                            };
                        }
                    }
                }).result.then(function() {
                    $state.go('filter-pump-cleaningnotes', null, { reload: 'filter-pump-cleaningnotes' });
                }, function() {
                    $state.go('filter-pump-cleaningnotes');
                });
            }]
        })
        .state('filter-pump-cleaningnotes.edit', {
            parent: 'filter-pump-cleaningnotes',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/filter-pump-cleaning/filter-pump-cleaningnotes-dialog.html',
                    controller: 'FilterPumpCleaningNotesDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['FilterPumpCleaning', function(FilterPumpCleaning) {
                            return FilterPumpCleaning.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('filter-pump-cleaningnotes', null, { reload: 'filter-pump-cleaningnotes' });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('filter-pump-cleaningnotes.delete', {
            parent: 'filter-pump-cleaningnotes',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/filter-pump-cleaning/filter-pump-cleaningnotes-delete-dialog.html',
                    controller: 'FilterPumpCleaningNotesDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['FilterPumpCleaning', function(FilterPumpCleaning) {
                            return FilterPumpCleaning.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('filter-pump-cleaningnotes', null, { reload: 'filter-pump-cleaningnotes' });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();

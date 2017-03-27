(function() {
    'use strict';

    angular
        .module('natmobApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('live-stocknotes', {
            parent: 'entity',
            url: '/live-stocknotes?page&sort&search',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'natmobApp.liveStock.home.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/live-stock/live-stocksnotes.html',
                    controller: 'LiveStockNotesController',
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
                    $translatePartialLoader.addPart('liveStock');
                    $translatePartialLoader.addPart('stockCase');
                    $translatePartialLoader.addPart('global');
                    return $translate.refresh();
                }]
            }
        })
        .state('live-stocknotes-detail', {
            parent: 'live-stocknotes',
            url: '/live-stocknotes/{id}',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'natmobApp.liveStock.detail.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/live-stock/live-stocknotes-detail.html',
                    controller: 'LiveStockNotesDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('liveStock');
                    $translatePartialLoader.addPart('stockCase');
                    return $translate.refresh();
                }],
                entity: ['$stateParams', 'LiveStock', function($stateParams, LiveStock) {
                    return LiveStock.get({id : $stateParams.id}).$promise;
                }],
                previousState: ["$state", function ($state) {
                    var currentStateData = {
                        name: $state.current.name || 'live-stocknotes',
                        params: $state.params,
                        url: $state.href($state.current.name, $state.params)
                    };
                    return currentStateData;
                }]
            }
        })
        .state('live-stocknotes-detail.edit', {
            parent: 'live-stocknotes-detail',
            url: '/detail/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/live-stock/live-stocknotes-dialog.html',
                    controller: 'LiveStockNotesDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['LiveStock', function(LiveStock) {
                            return LiveStock.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('^', {}, { reload: false });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('live-stocknotes.new', {
            parent: 'live-stocknotes',
            url: '/new',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/live-stock/live-stocknotes-dialog.html',
                    controller: 'LiveStockNotesDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: function () {
                            return {
                                date: null,
                                reason: null,
                                description: null,
                                qty: null,
                                tempVal: null,
                                id: null
                            };
                        }
                    }
                }).result.then(function() {
                    $state.go('live-stocknotes', null, { reload: 'live-stocknotes' });
                }, function() {
                    $state.go('live-stocknotes');
                });
            }]
        })
        .state('live-stocknotes.edit', {
            parent: 'live-stocknotes',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/live-stock/live-stocknotes-dialog.html',
                    controller: 'LiveStockNotesDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['LiveStock', function(LiveStock) {
                            return LiveStock.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('live-stocknotes', null, { reload: 'live-stocknotes' });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('live-stocknotes.delete', {
            parent: 'live-stocknotes',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/live-stock/live-stocknotes-delete-dialog.html',
                    controller: 'LiveStockNotesDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['LiveStock', function(LiveStock) {
                            return LiveStock.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('live-stocknotes', null, { reload: 'live-stocknotes' });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();

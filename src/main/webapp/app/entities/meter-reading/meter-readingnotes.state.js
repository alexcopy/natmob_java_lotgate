(function() {
    'use strict';

    angular
        .module('natmobApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('meter-readingnotes', {
            parent: 'entity',
            url: '/meter-readingnotes?page&sort&search',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'natmobApp.meterReading.home.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/meter-reading/meter-readingsnotes.html',
                    controller: 'MeterReadingNotesController',
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
                    $translatePartialLoader.addPart('meterReading');
                    $translatePartialLoader.addPart('global');
                    return $translate.refresh();
                }]
            }
        })
        .state('meter-readingnotes-detail', {
            parent: 'meter-readingnotes',
            url: '/meter-readingnotes/{id}',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'natmobApp.meterReading.detail.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/meter-reading/meter-readingnotes-detail.html',
                    controller: 'MeterReadingNotesDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('meterReading');
                    return $translate.refresh();
                }],
                entity: ['$stateParams', 'MeterReading', function($stateParams, MeterReading) {
                    return MeterReading.get({id : $stateParams.id}).$promise;
                }],
                previousState: ["$state", function ($state) {
                    var currentStateData = {
                        name: $state.current.name || 'meter-readingnotes',
                        params: $state.params,
                        url: $state.href($state.current.name, $state.params)
                    };
                    return currentStateData;
                }]
            }
        })
        .state('meter-readingnotes-detail.edit', {
            parent: 'meter-readingnotes-detail',
            url: '/detail/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/meter-reading/meter-readingnotes-dialog.html',
                    controller: 'MeterReadingNotesDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['MeterReading', function(MeterReading) {
                            return MeterReading.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('^', {}, { reload: false });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('meter-readingnotes.new', {
            parent: 'meter-readingnotes',
            url: '/new',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/meter-reading/meter-readingnotes-dialog.html',
                    controller: 'MeterReadingNotesDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: function () {
                            return {
                                readingDate: null,
                                description: null,
                                reading: null,
                                tempVal: null,
                                id: null
                            };
                        }
                    }
                }).result.then(function() {
                    $state.go('meter-readingnotes', null, { reload: 'meter-readingnotes' });
                }, function() {
                    $state.go('meter-readingnotes');
                });
            }]
        })
        .state('meter-readingnotes.edit', {
            parent: 'meter-readingnotes',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/meter-reading/meter-readingnotes-dialog.html',
                    controller: 'MeterReadingNotesDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['MeterReading', function(MeterReading) {
                            return MeterReading.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('meter-readingnotes', null, { reload: 'meter-readingnotes' });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('meter-readingnotes.delete', {
            parent: 'meter-readingnotes',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/meter-reading/meter-readingnotes-delete-dialog.html',
                    controller: 'MeterReadingNotesDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['MeterReading', function(MeterReading) {
                            return MeterReading.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('meter-readingnotes', null, { reload: 'meter-readingnotes' });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();

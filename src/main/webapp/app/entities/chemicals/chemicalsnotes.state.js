(function() {
    'use strict';

    angular
        .module('natmobApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('chemicalsnotes', {
            parent: 'entity',
            url: '/chemicalsnotes?page&sort&search',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'natmobApp.chemicals.home.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/chemicals/chemicalsnotes.html',
                    controller: 'ChemicalsNotesController',
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
                    $translatePartialLoader.addPart('chemicals');
                    $translatePartialLoader.addPart('global');
                    return $translate.refresh();
                }]
            }
        })
        .state('chemicalsnotes-detail', {
            parent: 'chemicalsnotes',
            url: '/chemicalsnotes/{id}',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'natmobApp.chemicals.detail.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/chemicals/chemicalsnotes-detail.html',
                    controller: 'ChemicalsNotesDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('chemicals');
                    return $translate.refresh();
                }],
                entity: ['$stateParams', 'Chemicals', function($stateParams, Chemicals) {
                    return Chemicals.get({id : $stateParams.id}).$promise;
                }],
                previousState: ["$state", function ($state) {
                    var currentStateData = {
                        name: $state.current.name || 'chemicalsnotes',
                        params: $state.params,
                        url: $state.href($state.current.name, $state.params)
                    };
                    return currentStateData;
                }]
            }
        })
        .state('chemicalsnotes-detail.edit', {
            parent: 'chemicalsnotes-detail',
            url: '/detail/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/chemicals/chemicalsnotes-dialog.html',
                    controller: 'ChemicalsNotesDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['Chemicals', function(Chemicals) {
                            return Chemicals.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('^', {}, { reload: false });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('chemicalsnotes.new', {
            parent: 'chemicalsnotes',
            url: '/new',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/chemicals/chemicalsnotes-dialog.html',
                    controller: 'ChemicalsNotesDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: function () {
                            return {
                                date: null,
                                qty: null,
                                reason: null,
                                tempVal: null,
                                id: null
                            };
                        }
                    }
                }).result.then(function() {
                    $state.go('chemicalsnotes', null, { reload: 'chemicalsnotes' });
                }, function() {
                    $state.go('chemicalsnotes');
                });
            }]
        })
        .state('chemicalsnotes.edit', {
            parent: 'chemicalsnotes',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/chemicals/chemicalsnotes-dialog.html',
                    controller: 'ChemicalsNotesDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['Chemicals', function(Chemicals) {
                            return Chemicals.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('chemicalsnotes', null, { reload: 'chemicalsnotes' });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('chemicalsnotes.delete', {
            parent: 'chemicalsnotes',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/chemicals/chemicalsnotes-delete-dialog.html',
                    controller: 'ChemicalsNotesDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['Chemicals', function(Chemicals) {
                            return Chemicals.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('chemicalsnotes', null, { reload: 'chemicalsnotes' });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();

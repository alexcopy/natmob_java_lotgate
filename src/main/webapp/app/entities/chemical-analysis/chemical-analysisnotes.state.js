(function() {
    'use strict';

    angular
        .module('natmobApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('chemical-analysisnotes', {
            parent: 'entity',
            url: '/chemical-analysisnotes?page&sort&search',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'natmobApp.chemicalAnalysis.home.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/chemical-analysis/chemical-analysesnotes.html',
                    controller: 'ChemicalAnalysisNotesController',
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
                    $translatePartialLoader.addPart('chemicalAnalysis');
                    $translatePartialLoader.addPart('global');
                    return $translate.refresh();
                }]
            }
        })
        .state('chemical-analysisnotes-detail', {
            parent: 'chemical-analysisnotes',
            url: '/chemical-analysisnotes/{id}',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'natmobApp.chemicalAnalysis.detail.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/chemical-analysis/chemical-analysisnotes-detail.html',
                    controller: 'ChemicalAnalysisNotesDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('chemicalAnalysis');
                    return $translate.refresh();
                }],
                entity: ['$stateParams', 'ChemicalAnalysis', function($stateParams, ChemicalAnalysis) {
                    return ChemicalAnalysis.get({id : $stateParams.id}).$promise;
                }],
                previousState: ["$state", function ($state) {
                    var currentStateData = {
                        name: $state.current.name || 'chemical-analysisnotes',
                        params: $state.params,
                        url: $state.href($state.current.name, $state.params)
                    };
                    return currentStateData;
                }]
            }
        })
        .state('chemical-analysisnotes-detail.edit', {
            parent: 'chemical-analysisnotes-detail',
            url: '/detail/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/chemical-analysis/chemical-analysisnotes-dialog.html',
                    controller: 'ChemicalAnalysisNotesDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['ChemicalAnalysis', function(ChemicalAnalysis) {
                            return ChemicalAnalysis.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('^', {}, { reload: false });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('chemical-analysisnotes.new', {
            parent: 'chemical-analysisnotes',
            url: '/new',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/chemical-analysis/chemical-analysisnotes-dialog.html',
                    controller: 'ChemicalAnalysisNotesDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: function () {
                            return {
                                date: null,
                                nO2: null,
                                nO3: null,
                                nH4: null,
                                ph: null,
                                tempVal: null,
                                timestamp: null,
                                id: null
                            };
                        }
                    }
                }).result.then(function() {
                    $state.go('chemical-analysisnotes', null, { reload: 'chemical-analysisnotes' });
                }, function() {
                    $state.go('chemical-analysisnotes');
                });
            }]
        })
        .state('chemical-analysisnotes.edit', {
            parent: 'chemical-analysisnotes',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/chemical-analysis/chemical-analysisnotes-dialog.html',
                    controller: 'ChemicalAnalysisNotesDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['ChemicalAnalysis', function(ChemicalAnalysis) {
                            return ChemicalAnalysis.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('chemical-analysisnotes', null, { reload: 'chemical-analysisnotes' });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('chemical-analysisnotes.delete', {
            parent: 'chemical-analysisnotes',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/chemical-analysis/chemical-analysisnotes-delete-dialog.html',
                    controller: 'ChemicalAnalysisNotesDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['ChemicalAnalysis', function(ChemicalAnalysis) {
                            return ChemicalAnalysis.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('chemical-analysisnotes', null, { reload: 'chemical-analysisnotes' });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();

(function() {
    'use strict';

    angular
        .module('natmobApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('eml-history', {
            parent: 'entity',
            url: '/eml-history',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'natmobApp.eml_history.home.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/eml-history/eml-histories.html',
                    controller: 'Eml_historyController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('eml_history');
                    $translatePartialLoader.addPart('global');
                    return $translate.refresh();
                }]
            }
        })
        .state('eml-history-detail', {
            parent: 'eml-history',
            url: '/eml-history/{id}',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'natmobApp.eml_history.detail.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/eml-history/eml-history-detail.html',
                    controller: 'Eml_historyDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('eml_history');
                    return $translate.refresh();
                }],
                entity: ['$stateParams', 'Eml_history', function($stateParams, Eml_history) {
                    return Eml_history.get({id : $stateParams.id}).$promise;
                }],
                previousState: ["$state", function ($state) {
                    var currentStateData = {
                        name: $state.current.name || 'eml-history',
                        params: $state.params,
                        url: $state.href($state.current.name, $state.params)
                    };
                    return currentStateData;
                }]
            }
        })
        .state('eml-history-detail.edit', {
            parent: 'eml-history-detail',
            url: '/detail/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/eml-history/eml-history-dialog.html',
                    controller: 'Eml_historyDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['Eml_history', function(Eml_history) {
                            return Eml_history.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('^', {}, { reload: false });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('eml-history.new', {
            parent: 'eml-history',
            url: '/new',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/eml-history/eml-history-dialog.html',
                    controller: 'Eml_historyDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: function () {
                            return {
                                drawDate: null,
                                ball1: null,
                                ball2: null,
                                ball3: null,
                                ball4: null,
                                ball5: null,
                                luckyStar1: null,
                                luckyStar2: null,
                                id: null
                            };
                        }
                    }
                }).result.then(function() {
                    $state.go('eml-history', null, { reload: 'eml-history' });
                }, function() {
                    $state.go('eml-history');
                });
            }]
        })
        .state('eml-history.edit', {
            parent: 'eml-history',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/eml-history/eml-history-dialog.html',
                    controller: 'Eml_historyDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['Eml_history', function(Eml_history) {
                            return Eml_history.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('eml-history', null, { reload: 'eml-history' });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('eml-history.delete', {
            parent: 'eml-history',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/eml-history/eml-history-delete-dialog.html',
                    controller: 'Eml_historyDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['Eml_history', function(Eml_history) {
                            return Eml_history.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('eml-history', null, { reload: 'eml-history' });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();

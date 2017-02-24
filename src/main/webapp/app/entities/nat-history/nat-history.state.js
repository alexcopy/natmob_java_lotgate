(function() {
    'use strict';

    angular
        .module('natmobApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('nat-history', {
            parent: 'entity',
            url: '/nat-history',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'natmobApp.nat_history.home.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/nat-history/nat-histories.html',
                    controller: 'Nat_historyController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('nat_history');
                    $translatePartialLoader.addPart('global');
                    return $translate.refresh();
                }]
            }
        })
        .state('nat-history-detail', {
            parent: 'nat-history',
            url: '/nat-history/{id}',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'natmobApp.nat_history.detail.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/nat-history/nat-history-detail.html',
                    controller: 'Nat_historyDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('nat_history');
                    return $translate.refresh();
                }],
                entity: ['$stateParams', 'Nat_history', function($stateParams, Nat_history) {
                    return Nat_history.get({id : $stateParams.id}).$promise;
                }],
                previousState: ["$state", function ($state) {
                    var currentStateData = {
                        name: $state.current.name || 'nat-history',
                        params: $state.params,
                        url: $state.href($state.current.name, $state.params)
                    };
                    return currentStateData;
                }]
            }
        })
        .state('nat-history-detail.edit', {
            parent: 'nat-history-detail',
            url: '/detail/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/nat-history/nat-history-dialog.html',
                    controller: 'Nat_historyDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['Nat_history', function(Nat_history) {
                            return Nat_history.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('^', {}, { reload: false });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('nat-history.new', {
            parent: 'nat-history',
            url: '/new',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/nat-history/nat-history-dialog.html',
                    controller: 'Nat_historyDialogController',
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
                                ball6: null,
                                bonusBall: null,
                                machine: null,
                                raffles: null,
                                drawNumber: null,
                                sumB: null,
                                hash: null,
                                timestamp: null,
                                id: null
                            };
                        }
                    }
                }).result.then(function() {
                    $state.go('nat-history', null, { reload: 'nat-history' });
                }, function() {
                    $state.go('nat-history');
                });
            }]
        })
        .state('nat-history.edit', {
            parent: 'nat-history',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/nat-history/nat-history-dialog.html',
                    controller: 'Nat_historyDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['Nat_history', function(Nat_history) {
                            return Nat_history.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('nat-history', null, { reload: 'nat-history' });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('nat-history.delete', {
            parent: 'nat-history',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/nat-history/nat-history-delete-dialog.html',
                    controller: 'Nat_historyDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['Nat_history', function(Nat_history) {
                            return Nat_history.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('nat-history', null, { reload: 'nat-history' });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();

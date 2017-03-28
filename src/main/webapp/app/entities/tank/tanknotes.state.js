(function() {
    'use strict';

    angular
        .module('natmobApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('tanknotes', {
            parent: 'entity',
            url: '/tanknotes',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'natmobApp.tank.home.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/tank/tanksnotes.html',
                    controller: 'TankNotesController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('tank');
                    $translatePartialLoader.addPart('tankType');
                    $translatePartialLoader.addPart('global');
                    return $translate.refresh();
                }]
            }
        })
        .state('tanknotes-detail', {
            parent: 'tanknotes',
            url: '/tanknotes/{id}',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'natmobApp.tank.detail.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/tank/tanknotes-detail.html',
                    controller: 'TankNotesDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('tank');
                    $translatePartialLoader.addPart('tankType');
                    return $translate.refresh();
                }],
                entity: ['$stateParams', 'Tank', function($stateParams, Tank) {
                    return Tank.get({id : $stateParams.id}).$promise;
                }],
                previousState: ["$state", function ($state) {
                    var currentStateData = {
                        name: $state.current.name || 'tanknotes',
                        params: $state.params,
                        url: $state.href($state.current.name, $state.params)
                    };
                    return currentStateData;
                }]
            }
        })
        .state('tanknotes-detail.edit', {
            parent: 'tanknotes-detail',
            url: '/detail/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/tank/tanknotes-dialog.html',
                    controller: 'TankNotesDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['Tank', function(Tank) {
                            return Tank.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('^', {}, { reload: false });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('tanknotes.new', {
            parent: 'tanknotes',
            url: '/new',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/tank/tanknotes-dialog.html',
                    controller: 'TankNotesDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: function () {
                            return {
                                tankName: null,
                                tankType: null,
                                description: null,
                                id: null
                            };
                        }
                    }
                }).result.then(function() {
                    $state.go('tanknotes', null, { reload: 'tanknotes' });
                }, function() {
                    $state.go('tanknotes');
                });
            }]
        })
        .state('tanknotes.edit', {
            parent: 'tanknotes',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/tank/tanknotes-dialog.html',
                    controller: 'TankNotesDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['Tank', function(Tank) {
                            return Tank.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('tanknotes', null, { reload: 'tanknotes' });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('tanknotes.delete', {
            parent: 'tanknotes',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/tank/tanknotes-delete-dialog.html',
                    controller: 'TankNotesDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['Tank', function(Tank) {
                            return Tank.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('tanknotes', null, { reload: 'tanknotes' });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();

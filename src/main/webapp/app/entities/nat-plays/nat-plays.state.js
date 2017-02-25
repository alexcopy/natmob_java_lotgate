(function() {
    'use strict';

    angular
        .module('natmobApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('nat-plays', {
            parent: 'entity',
            url: '/nat-plays',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'natmobApp.nat_plays.home.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/nat-plays/nat-plays.html',
                    controller: 'Nat_playsController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('nat_plays');
                    $translatePartialLoader.addPart('global');
                    return $translate.refresh();
                }]
            }
        })
        .state('nat-plays-detail', {
            parent: 'nat-plays',
            url: '/nat-plays/{id}',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'natmobApp.nat_plays.detail.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/nat-plays/nat-plays-detail.html',
                    controller: 'Nat_playsDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('nat_plays');
                    return $translate.refresh();
                }],
                entity: ['$stateParams', 'Nat_plays', function($stateParams, Nat_plays) {
                    return Nat_plays.get({id : $stateParams.id}).$promise;
                }],
                previousState: ["$state", function ($state) {
                    var currentStateData = {
                        name: $state.current.name || 'nat-plays',
                        params: $state.params,
                        url: $state.href($state.current.name, $state.params)
                    };
                    return currentStateData;
                }]
            }
        })
        .state('nat-plays-detail.edit', {
            parent: 'nat-plays-detail',
            url: '/detail/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/nat-plays/nat-plays-dialog.html',
                    controller: 'Nat_playsDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['Nat_plays', function(Nat_plays) {
                            return Nat_plays.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('^', {}, { reload: false });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('nat-plays.new', {
            parent: 'nat-plays',
            url: '/new',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/nat-plays/nat-plays-dialog.html',
                    controller: 'Nat_playsDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: function () {
                            return {
                                drawDate: null,
                                prize: null,
                                checked: null,
                                tickets: null,
                                prizeHigh: null,
                                prizeLow: null,
                                coeficient: null,
                                spent: null,
                                prizeFreq: null,
                                id: null
                            };
                        }
                    }
                }).result.then(function() {
                    $state.go('nat-plays', null, { reload: 'nat-plays' });
                }, function() {
                    $state.go('nat-plays');
                });
            }]
        })
        .state('nat-plays.edit', {
            parent: 'nat-plays',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/nat-plays/nat-plays-dialog.html',
                    controller: 'Nat_playsDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['Nat_plays', function(Nat_plays) {
                            return Nat_plays.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('nat-plays', null, { reload: 'nat-plays' });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('nat-plays.delete', {
            parent: 'nat-plays',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/nat-plays/nat-plays-delete-dialog.html',
                    controller: 'Nat_playsDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['Nat_plays', function(Nat_plays) {
                            return Nat_plays.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('nat-plays', null, { reload: 'nat-plays' });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();

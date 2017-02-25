(function() {
    'use strict';

    angular
        .module('natmobApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('thb-plays', {
            parent: 'entity',
            url: '/thb-plays',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'natmobApp.thb_plays.home.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/thb-plays/thb-plays.html',
                    controller: 'Thb_playsController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('thb_plays');
                    $translatePartialLoader.addPart('global');
                    return $translate.refresh();
                }]
            }
        })
        .state('thb-plays-detail', {
            parent: 'thb-plays',
            url: '/thb-plays/{id}',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'natmobApp.thb_plays.detail.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/thb-plays/thb-plays-detail.html',
                    controller: 'Thb_playsDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('thb_plays');
                    return $translate.refresh();
                }],
                entity: ['$stateParams', 'Thb_plays', function($stateParams, Thb_plays) {
                    return Thb_plays.get({id : $stateParams.id}).$promise;
                }],
                previousState: ["$state", function ($state) {
                    var currentStateData = {
                        name: $state.current.name || 'thb-plays',
                        params: $state.params,
                        url: $state.href($state.current.name, $state.params)
                    };
                    return currentStateData;
                }]
            }
        })
        .state('thb-plays-detail.edit', {
            parent: 'thb-plays-detail',
            url: '/detail/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/thb-plays/thb-plays-dialog.html',
                    controller: 'Thb_playsDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['Thb_plays', function(Thb_plays) {
                            return Thb_plays.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('^', {}, { reload: false });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('thb-plays.new', {
            parent: 'thb-plays',
            url: '/new',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/thb-plays/thb-plays-dialog.html',
                    controller: 'Thb_playsDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: function () {
                            return {
                                drawDate: null,
                                prize: null,
                                checked: false,
                                tickets: null,
                                prizeHigh: null,
                                prizeLow: null,
                                coeficient: null,
                                spent: null,
                                prizeFreq: null,
                                balanse: null,
                                id: null
                            };
                        }
                    }
                }).result.then(function() {
                    $state.go('thb-plays', null, { reload: 'thb-plays' });
                }, function() {
                    $state.go('thb-plays');
                });
            }]
        })
        .state('thb-plays.edit', {
            parent: 'thb-plays',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/thb-plays/thb-plays-dialog.html',
                    controller: 'Thb_playsDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['Thb_plays', function(Thb_plays) {
                            return Thb_plays.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('thb-plays', null, { reload: 'thb-plays' });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('thb-plays.delete', {
            parent: 'thb-plays',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/thb-plays/thb-plays-delete-dialog.html',
                    controller: 'Thb_playsDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['Thb_plays', function(Thb_plays) {
                            return Thb_plays.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('thb-plays', null, { reload: 'thb-plays' });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();

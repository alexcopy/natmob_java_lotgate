(function() {
    'use strict';

    angular
        .module('natmobApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('eml-plays', {
            parent: 'entity',
            url: '/eml-plays',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'natmobApp.eml_plays.home.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/eml-plays/eml-plays.html',
                    controller: 'Eml_playsController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('eml_plays');
                    $translatePartialLoader.addPart('global');
                    return $translate.refresh();
                }]
            }
        })
        .state('eml-plays-detail', {
            parent: 'eml-plays',
            url: '/eml-plays/{id}',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'natmobApp.eml_plays.detail.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/eml-plays/eml-plays-detail.html',
                    controller: 'Eml_playsDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('eml_plays');
                    return $translate.refresh();
                }],
                entity: ['$stateParams', 'Eml_plays', function($stateParams, Eml_plays) {
                    return Eml_plays.get({id : $stateParams.id}).$promise;
                }],
                previousState: ["$state", function ($state) {
                    var currentStateData = {
                        name: $state.current.name || 'eml-plays',
                        params: $state.params,
                        url: $state.href($state.current.name, $state.params)
                    };
                    return currentStateData;
                }]
            }
        })
        .state('eml-plays-detail.edit', {
            parent: 'eml-plays-detail',
            url: '/detail/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/eml-plays/eml-plays-dialog.html',
                    controller: 'Eml_playsDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['Eml_plays', function(Eml_plays) {
                            return Eml_plays.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('^', {}, { reload: false });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('eml-plays.new', {
            parent: 'eml-plays',
            url: '/new',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/eml-plays/eml-plays-dialog.html',
                    controller: 'Eml_playsDialogController',
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
                                balanse: null,
                                id: null
                            };
                        }
                    }
                }).result.then(function() {
                    $state.go('eml-plays', null, { reload: 'eml-plays' });
                }, function() {
                    $state.go('eml-plays');
                });
            }]
        })
        .state('eml-plays.edit', {
            parent: 'eml-plays',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/eml-plays/eml-plays-dialog.html',
                    controller: 'Eml_playsDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['Eml_plays', function(Eml_plays) {
                            return Eml_plays.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('eml-plays', null, { reload: 'eml-plays' });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('eml-plays.delete', {
            parent: 'eml-plays',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/eml-plays/eml-plays-delete-dialog.html',
                    controller: 'Eml_playsDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['Eml_plays', function(Eml_plays) {
                            return Eml_plays.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('eml-plays', null, { reload: 'eml-plays' });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();

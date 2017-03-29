(function() {
    'use strict';

    angular
        .module('natmobApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('nat-historylotapp', {
            parent: 'entity',
            url: '/nat-historylotapp',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'natmobApp.natHistory.home.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/nat-history/nat-historieslotapp.html',
                    controller: 'NatHistoryLotappController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('natHistory');
                    $translatePartialLoader.addPart('global');
                    return $translate.refresh();
                }]
            }
        })
        .state('nat-historylotapp-detail', {
            parent: 'nat-historylotapp',
            url: '/nat-historylotapp/{id}',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'natmobApp.natHistory.detail.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/nat-history/nat-historylotapp-detail.html',
                    controller: 'NatHistoryLotappDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('natHistory');
                    return $translate.refresh();
                }],
                entity: ['$stateParams', 'NatHistory', function($stateParams, NatHistory) {
                    return NatHistory.get({id : $stateParams.id}).$promise;
                }],
                previousState: ["$state", function ($state) {
                    var currentStateData = {
                        name: $state.current.name || 'nat-historylotapp',
                        params: $state.params,
                        url: $state.href($state.current.name, $state.params)
                    };
                    return currentStateData;
                }]
            }
        })
        .state('nat-historylotapp-detail.edit', {
            parent: 'nat-historylotapp-detail',
            url: '/detail/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/nat-history/nat-historylotapp-dialog.html',
                    controller: 'NatHistoryLotappDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['NatHistory', function(NatHistory) {
                            return NatHistory.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('^', {}, { reload: false });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('nat-historylotapp.new', {
            parent: 'nat-historylotapp',
            url: '/new',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/nat-history/nat-historylotapp-dialog.html',
                    controller: 'NatHistoryLotappDialogController',
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
                                id: null
                            };
                        }
                    }
                }).result.then(function() {
                    $state.go('nat-historylotapp', null, { reload: 'nat-historylotapp' });
                }, function() {
                    $state.go('nat-historylotapp');
                });
            }]
        })
        .state('nat-historylotapp.edit', {
            parent: 'nat-historylotapp',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/nat-history/nat-historylotapp-dialog.html',
                    controller: 'NatHistoryLotappDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['NatHistory', function(NatHistory) {
                            return NatHistory.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('nat-historylotapp', null, { reload: 'nat-historylotapp' });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('nat-historylotapp.delete', {
            parent: 'nat-historylotapp',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/nat-history/nat-historylotapp-delete-dialog.html',
                    controller: 'NatHistoryLotappDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['NatHistory', function(NatHistory) {
                            return NatHistory.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('nat-historylotapp', null, { reload: 'nat-historylotapp' });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();

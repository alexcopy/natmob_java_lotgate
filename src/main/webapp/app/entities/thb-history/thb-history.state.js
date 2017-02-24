(function() {
    'use strict';

    angular
        .module('natmobApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('thb-history', {
            parent: 'entity',
            url: '/thb-history',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'natmobApp.thb_history.home.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/thb-history/thb-histories.html',
                    controller: 'Thb_historyController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('thb_history');
                    $translatePartialLoader.addPart('global');
                    return $translate.refresh();
                }]
            }
        })
        .state('thb-history-detail', {
            parent: 'thb-history',
            url: '/thb-history/{id}',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'natmobApp.thb_history.detail.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/thb-history/thb-history-detail.html',
                    controller: 'Thb_historyDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('thb_history');
                    return $translate.refresh();
                }],
                entity: ['$stateParams', 'Thb_history', function($stateParams, Thb_history) {
                    return Thb_history.get({id : $stateParams.id}).$promise;
                }],
                previousState: ["$state", function ($state) {
                    var currentStateData = {
                        name: $state.current.name || 'thb-history',
                        params: $state.params,
                        url: $state.href($state.current.name, $state.params)
                    };
                    return currentStateData;
                }]
            }
        })
        .state('thb-history-detail.edit', {
            parent: 'thb-history-detail',
            url: '/detail/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/thb-history/thb-history-dialog.html',
                    controller: 'Thb_historyDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['Thb_history', function(Thb_history) {
                            return Thb_history.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('^', {}, { reload: false });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('thb-history.new', {
            parent: 'thb-history',
            url: '/new',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/thb-history/thb-history-dialog.html',
                    controller: 'Thb_historyDialogController',
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
                                thunderBall: null,
                                sumB: null,
                                machine: null,
                                ballSet: null,
                                drawNumber: null,
                                hash: null,
                                timestamp: null,
                                id: null
                            };
                        }
                    }
                }).result.then(function() {
                    $state.go('thb-history', null, { reload: 'thb-history' });
                }, function() {
                    $state.go('thb-history');
                });
            }]
        })
        .state('thb-history.edit', {
            parent: 'thb-history',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/thb-history/thb-history-dialog.html',
                    controller: 'Thb_historyDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['Thb_history', function(Thb_history) {
                            return Thb_history.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('thb-history', null, { reload: 'thb-history' });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('thb-history.delete', {
            parent: 'thb-history',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/thb-history/thb-history-delete-dialog.html',
                    controller: 'Thb_historyDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['Thb_history', function(Thb_history) {
                            return Thb_history.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('thb-history', null, { reload: 'thb-history' });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();

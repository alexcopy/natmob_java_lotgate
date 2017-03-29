(function() {
    'use strict';

    angular
        .module('natmobApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('eml-historylotapp', {
            parent: 'entity',
            url: '/eml-historylotapp',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'natmobApp.emlHistory.home.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/eml-history/eml-historieslotapp.html',
                    controller: 'EmlHistoryLotappController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('emlHistory');
                    $translatePartialLoader.addPart('global');
                    return $translate.refresh();
                }]
            }
        })
        .state('eml-historylotapp-detail', {
            parent: 'eml-historylotapp',
            url: '/eml-historylotapp/{id}',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'natmobApp.emlHistory.detail.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/eml-history/eml-historylotapp-detail.html',
                    controller: 'EmlHistoryLotappDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('emlHistory');
                    return $translate.refresh();
                }],
                entity: ['$stateParams', 'EmlHistory', function($stateParams, EmlHistory) {
                    return EmlHistory.get({id : $stateParams.id}).$promise;
                }],
                previousState: ["$state", function ($state) {
                    var currentStateData = {
                        name: $state.current.name || 'eml-historylotapp',
                        params: $state.params,
                        url: $state.href($state.current.name, $state.params)
                    };
                    return currentStateData;
                }]
            }
        })
        .state('eml-historylotapp-detail.edit', {
            parent: 'eml-historylotapp-detail',
            url: '/detail/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/eml-history/eml-historylotapp-dialog.html',
                    controller: 'EmlHistoryLotappDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['EmlHistory', function(EmlHistory) {
                            return EmlHistory.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('^', {}, { reload: false });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('eml-historylotapp.new', {
            parent: 'eml-historylotapp',
            url: '/new',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/eml-history/eml-historylotapp-dialog.html',
                    controller: 'EmlHistoryLotappDialogController',
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
                    $state.go('eml-historylotapp', null, { reload: 'eml-historylotapp' });
                }, function() {
                    $state.go('eml-historylotapp');
                });
            }]
        })
        .state('eml-historylotapp.edit', {
            parent: 'eml-historylotapp',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/eml-history/eml-historylotapp-dialog.html',
                    controller: 'EmlHistoryLotappDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['EmlHistory', function(EmlHistory) {
                            return EmlHistory.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('eml-historylotapp', null, { reload: 'eml-historylotapp' });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('eml-historylotapp.delete', {
            parent: 'eml-historylotapp',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/eml-history/eml-historylotapp-delete-dialog.html',
                    controller: 'EmlHistoryLotappDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['EmlHistory', function(EmlHistory) {
                            return EmlHistory.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('eml-historylotapp', null, { reload: 'eml-historylotapp' });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();

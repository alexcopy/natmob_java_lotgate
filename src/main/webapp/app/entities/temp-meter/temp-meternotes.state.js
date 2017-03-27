(function() {
    'use strict';

    angular
        .module('natmobApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('temp-meternotes', {
            parent: 'entity',
            url: '/temp-meternotes',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'natmobApp.tempMeter.home.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/temp-meter/temp-metersnotes.html',
                    controller: 'TempMeterNotesController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('tempMeter');
                    $translatePartialLoader.addPart('global');
                    return $translate.refresh();
                }]
            }
        })
        .state('temp-meternotes-detail', {
            parent: 'temp-meternotes',
            url: '/temp-meternotes/{id}',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'natmobApp.tempMeter.detail.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/temp-meter/temp-meternotes-detail.html',
                    controller: 'TempMeterNotesDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('tempMeter');
                    return $translate.refresh();
                }],
                entity: ['$stateParams', 'TempMeter', function($stateParams, TempMeter) {
                    return TempMeter.get({id : $stateParams.id}).$promise;
                }],
                previousState: ["$state", function ($state) {
                    var currentStateData = {
                        name: $state.current.name || 'temp-meternotes',
                        params: $state.params,
                        url: $state.href($state.current.name, $state.params)
                    };
                    return currentStateData;
                }]
            }
        })
        .state('temp-meternotes-detail.edit', {
            parent: 'temp-meternotes-detail',
            url: '/detail/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/temp-meter/temp-meternotes-dialog.html',
                    controller: 'TempMeterNotesDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['TempMeter', function(TempMeter) {
                            return TempMeter.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('^', {}, { reload: false });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('temp-meternotes.new', {
            parent: 'temp-meternotes',
            url: '/new',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/temp-meter/temp-meternotes-dialog.html',
                    controller: 'TempMeterNotesDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: function () {
                            return {
                                readingDate: null,
                                tempVal: null,
                                tank: null,
                                id: null
                            };
                        }
                    }
                }).result.then(function() {
                    $state.go('temp-meternotes', null, { reload: 'temp-meternotes' });
                }, function() {
                    $state.go('temp-meternotes');
                });
            }]
        })
        .state('temp-meternotes.edit', {
            parent: 'temp-meternotes',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/temp-meter/temp-meternotes-dialog.html',
                    controller: 'TempMeterNotesDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['TempMeter', function(TempMeter) {
                            return TempMeter.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('temp-meternotes', null, { reload: 'temp-meternotes' });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('temp-meternotes.delete', {
            parent: 'temp-meternotes',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/temp-meter/temp-meternotes-delete-dialog.html',
                    controller: 'TempMeterNotesDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['TempMeter', function(TempMeter) {
                            return TempMeter.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('temp-meternotes', null, { reload: 'temp-meternotes' });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();

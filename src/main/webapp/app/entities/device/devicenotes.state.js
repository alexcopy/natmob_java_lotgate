(function() {
    'use strict';

    angular
        .module('natmobApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('devicenotes', {
            parent: 'entity',
            url: '/devicenotes',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'natmobApp.device.home.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/device/devicesnotes.html',
                    controller: 'DeviceNotesController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('device');
                    $translatePartialLoader.addPart('deviceType');
                    $translatePartialLoader.addPart('global');
                    return $translate.refresh();
                }]
            }
        })
        .state('devicenotes-detail', {
            parent: 'devicenotes',
            url: '/devicenotes/{id}',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'natmobApp.device.detail.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/device/devicenotes-detail.html',
                    controller: 'DeviceNotesDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('device');
                    $translatePartialLoader.addPart('deviceType');
                    return $translate.refresh();
                }],
                entity: ['$stateParams', 'Device', function($stateParams, Device) {
                    return Device.get({id : $stateParams.id}).$promise;
                }],
                previousState: ["$state", function ($state) {
                    var currentStateData = {
                        name: $state.current.name || 'devicenotes',
                        params: $state.params,
                        url: $state.href($state.current.name, $state.params)
                    };
                    return currentStateData;
                }]
            }
        })
        .state('devicenotes-detail.edit', {
            parent: 'devicenotes-detail',
            url: '/detail/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/device/devicenotes-dialog.html',
                    controller: 'DeviceNotesDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['Device', function(Device) {
                            return Device.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('^', {}, { reload: false });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('devicenotes.new', {
            parent: 'devicenotes',
            url: '/new',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/device/devicenotes-dialog.html',
                    controller: 'DeviceNotesDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: function () {
                            return {
                                deviceName: null,
                                deviceType: null,
                                description: null,
                                tank: null,
                                id: null
                            };
                        }
                    }
                }).result.then(function() {
                    $state.go('devicenotes', null, { reload: 'devicenotes' });
                }, function() {
                    $state.go('devicenotes');
                });
            }]
        })
        .state('devicenotes.edit', {
            parent: 'devicenotes',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/device/devicenotes-dialog.html',
                    controller: 'DeviceNotesDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['Device', function(Device) {
                            return Device.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('devicenotes', null, { reload: 'devicenotes' });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('devicenotes.delete', {
            parent: 'devicenotes',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/device/devicenotes-delete-dialog.html',
                    controller: 'DeviceNotesDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['Device', function(Device) {
                            return Device.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('devicenotes', null, { reload: 'devicenotes' });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();

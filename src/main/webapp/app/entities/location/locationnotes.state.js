(function() {
    'use strict';

    angular
        .module('natmobApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('locationnotes', {
            parent: 'entity',
            url: '/locationnotes',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'natmobApp.location.home.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/location/locationsnotes.html',
                    controller: 'LocationNotesController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('location');
                    $translatePartialLoader.addPart('global');
                    return $translate.refresh();
                }]
            }
        })
        .state('locationnotes-detail', {
            parent: 'locationnotes',
            url: '/locationnotes/{id}',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'natmobApp.location.detail.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/location/locationnotes-detail.html',
                    controller: 'LocationNotesDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('location');
                    return $translate.refresh();
                }],
                entity: ['$stateParams', 'Location', function($stateParams, Location) {
                    return Location.get({id : $stateParams.id}).$promise;
                }],
                previousState: ["$state", function ($state) {
                    var currentStateData = {
                        name: $state.current.name || 'locationnotes',
                        params: $state.params,
                        url: $state.href($state.current.name, $state.params)
                    };
                    return currentStateData;
                }]
            }
        })
        .state('locationnotes-detail.edit', {
            parent: 'locationnotes-detail',
            url: '/detail/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/location/locationnotes-dialog.html',
                    controller: 'LocationNotesDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['Location', function(Location) {
                            return Location.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('^', {}, { reload: false });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('locationnotes.new', {
            parent: 'locationnotes',
            url: '/new',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/location/locationnotes-dialog.html',
                    controller: 'LocationNotesDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: function () {
                            return {
                                streetAddress: null,
                                postalCode: null,
                                city: null,
                                county: null,
                                id: null
                            };
                        }
                    }
                }).result.then(function() {
                    $state.go('locationnotes', null, { reload: 'locationnotes' });
                }, function() {
                    $state.go('locationnotes');
                });
            }]
        })
        .state('locationnotes.edit', {
            parent: 'locationnotes',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/location/locationnotes-dialog.html',
                    controller: 'LocationNotesDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['Location', function(Location) {
                            return Location.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('locationnotes', null, { reload: 'locationnotes' });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('locationnotes.delete', {
            parent: 'locationnotes',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/location/locationnotes-delete-dialog.html',
                    controller: 'LocationNotesDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['Location', function(Location) {
                            return Location.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('locationnotes', null, { reload: 'locationnotes' });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();

(function() {
    'use strict';

    angular
        .module('natmobApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('water-changenotes', {
            parent: 'entity',
            url: '/water-changenotes',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'natmobApp.waterChange.home.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/water-change/water-changesnotes.html',
                    controller: 'WaterChangeNotesController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('waterChange');
                    $translatePartialLoader.addPart('global');
                    return $translate.refresh();
                }]
            }
        })
        .state('water-changenotes-detail', {
            parent: 'water-changenotes',
            url: '/water-changenotes/{id}',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'natmobApp.waterChange.detail.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/water-change/water-changenotes-detail.html',
                    controller: 'WaterChangeNotesDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('waterChange');
                    return $translate.refresh();
                }],
                entity: ['$stateParams', 'WaterChange', function($stateParams, WaterChange) {
                    return WaterChange.get({id : $stateParams.id}).$promise;
                }],
                previousState: ["$state", function ($state) {
                    var currentStateData = {
                        name: $state.current.name || 'water-changenotes',
                        params: $state.params,
                        url: $state.href($state.current.name, $state.params)
                    };
                    return currentStateData;
                }]
            }
        })
        .state('water-changenotes-detail.edit', {
            parent: 'water-changenotes-detail',
            url: '/detail/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/water-change/water-changenotes-dialog.html',
                    controller: 'WaterChangeNotesDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['WaterChange', function(WaterChange) {
                            return WaterChange.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('^', {}, { reload: false });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('water-changenotes.new', {
            parent: 'water-changenotes',
            url: '/new',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/water-change/water-changenotes-dialog.html',
                    controller: 'WaterChangeNotesDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: function () {
                            return {
                                changeDate: null,
                                description: null,
                                readingBefore: null,
                                readingAfter: null,
                                tempVal: null,
                                id: null
                            };
                        }
                    }
                }).result.then(function() {
                    $state.go('water-changenotes', null, { reload: 'water-changenotes' });
                }, function() {
                    $state.go('water-changenotes');
                });
            }]
        })
        .state('water-changenotes.edit', {
            parent: 'water-changenotes',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/water-change/water-changenotes-dialog.html',
                    controller: 'WaterChangeNotesDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['WaterChange', function(WaterChange) {
                            return WaterChange.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('water-changenotes', null, { reload: 'water-changenotes' });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('water-changenotes.delete', {
            parent: 'water-changenotes',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/water-change/water-changenotes-delete-dialog.html',
                    controller: 'WaterChangeNotesDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['WaterChange', function(WaterChange) {
                            return WaterChange.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('water-changenotes', null, { reload: 'water-changenotes' });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();

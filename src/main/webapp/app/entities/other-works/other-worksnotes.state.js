(function() {
    'use strict';

    angular
        .module('natmobApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('other-worksnotes', {
            parent: 'entity',
            url: '/other-worksnotes',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'natmobApp.otherWorks.home.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/other-works/other-worksnotes.html',
                    controller: 'OtherWorksNotesController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('otherWorks');
                    $translatePartialLoader.addPart('global');
                    return $translate.refresh();
                }]
            }
        })
        .state('other-worksnotes-detail', {
            parent: 'other-worksnotes',
            url: '/other-worksnotes/{id}',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'natmobApp.otherWorks.detail.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/other-works/other-worksnotes-detail.html',
                    controller: 'OtherWorksNotesDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('otherWorks');
                    return $translate.refresh();
                }],
                entity: ['$stateParams', 'OtherWorks', function($stateParams, OtherWorks) {
                    return OtherWorks.get({id : $stateParams.id}).$promise;
                }],
                previousState: ["$state", function ($state) {
                    var currentStateData = {
                        name: $state.current.name || 'other-worksnotes',
                        params: $state.params,
                        url: $state.href($state.current.name, $state.params)
                    };
                    return currentStateData;
                }]
            }
        })
        .state('other-worksnotes-detail.edit', {
            parent: 'other-worksnotes-detail',
            url: '/detail/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/other-works/other-worksnotes-dialog.html',
                    controller: 'OtherWorksNotesDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['OtherWorks', function(OtherWorks) {
                            return OtherWorks.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('^', {}, { reload: false });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('other-worksnotes.new', {
            parent: 'other-worksnotes',
            url: '/new',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/other-works/other-worksnotes-dialog.html',
                    controller: 'OtherWorksNotesDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: function () {
                            return {
                                date: null,
                                reason: null,
                                qty: null,
                                descripton: null,
                                tempVal: null,
                                id: null
                            };
                        }
                    }
                }).result.then(function() {
                    $state.go('other-worksnotes', null, { reload: 'other-worksnotes' });
                }, function() {
                    $state.go('other-worksnotes');
                });
            }]
        })
        .state('other-worksnotes.edit', {
            parent: 'other-worksnotes',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/other-works/other-worksnotes-dialog.html',
                    controller: 'OtherWorksNotesDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['OtherWorks', function(OtherWorks) {
                            return OtherWorks.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('other-worksnotes', null, { reload: 'other-worksnotes' });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('other-worksnotes.delete', {
            parent: 'other-worksnotes',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/other-works/other-worksnotes-delete-dialog.html',
                    controller: 'OtherWorksNotesDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['OtherWorks', function(OtherWorks) {
                            return OtherWorks.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('other-worksnotes', null, { reload: 'other-worksnotes' });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();

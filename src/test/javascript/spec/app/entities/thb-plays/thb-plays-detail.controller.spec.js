'use strict';

describe('Controller Tests', function() {

    describe('Thb_plays Management Detail Controller', function() {
        var $scope, $rootScope;
        var MockEntity, MockPreviousState, MockThb_plays;
        var createController;

        beforeEach(inject(function($injector) {
            $rootScope = $injector.get('$rootScope');
            $scope = $rootScope.$new();
            MockEntity = jasmine.createSpy('MockEntity');
            MockPreviousState = jasmine.createSpy('MockPreviousState');
            MockThb_plays = jasmine.createSpy('MockThb_plays');
            

            var locals = {
                '$scope': $scope,
                '$rootScope': $rootScope,
                'entity': MockEntity,
                'previousState': MockPreviousState,
                'Thb_plays': MockThb_plays
            };
            createController = function() {
                $injector.get('$controller')("Thb_playsDetailController", locals);
            };
        }));


        describe('Root Scope Listening', function() {
            it('Unregisters root scope listener upon scope destruction', function() {
                var eventType = 'natmobApp:thb_playsUpdate';

                createController();
                expect($rootScope.$$listenerCount[eventType]).toEqual(1);

                $scope.$destroy();
                expect($rootScope.$$listenerCount[eventType]).toBeUndefined();
            });
        });
    });

});

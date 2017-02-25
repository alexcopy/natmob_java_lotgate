'use strict';

describe('Controller Tests', function() {

    describe('Nat_plays Management Detail Controller', function() {
        var $scope, $rootScope;
        var MockEntity, MockPreviousState, MockNat_plays;
        var createController;

        beforeEach(inject(function($injector) {
            $rootScope = $injector.get('$rootScope');
            $scope = $rootScope.$new();
            MockEntity = jasmine.createSpy('MockEntity');
            MockPreviousState = jasmine.createSpy('MockPreviousState');
            MockNat_plays = jasmine.createSpy('MockNat_plays');
            

            var locals = {
                '$scope': $scope,
                '$rootScope': $rootScope,
                'entity': MockEntity,
                'previousState': MockPreviousState,
                'Nat_plays': MockNat_plays
            };
            createController = function() {
                $injector.get('$controller')("Nat_playsDetailController", locals);
            };
        }));


        describe('Root Scope Listening', function() {
            it('Unregisters root scope listener upon scope destruction', function() {
                var eventType = 'natmobApp:nat_playsUpdate';

                createController();
                expect($rootScope.$$listenerCount[eventType]).toEqual(1);

                $scope.$destroy();
                expect($rootScope.$$listenerCount[eventType]).toBeUndefined();
            });
        });
    });

});

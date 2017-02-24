'use strict';

describe('Controller Tests', function() {

    describe('Thb_history Management Detail Controller', function() {
        var $scope, $rootScope;
        var MockEntity, MockPreviousState, MockThb_history;
        var createController;

        beforeEach(inject(function($injector) {
            $rootScope = $injector.get('$rootScope');
            $scope = $rootScope.$new();
            MockEntity = jasmine.createSpy('MockEntity');
            MockPreviousState = jasmine.createSpy('MockPreviousState');
            MockThb_history = jasmine.createSpy('MockThb_history');
            

            var locals = {
                '$scope': $scope,
                '$rootScope': $rootScope,
                'entity': MockEntity,
                'previousState': MockPreviousState,
                'Thb_history': MockThb_history
            };
            createController = function() {
                $injector.get('$controller')("Thb_historyDetailController", locals);
            };
        }));


        describe('Root Scope Listening', function() {
            it('Unregisters root scope listener upon scope destruction', function() {
                var eventType = 'natmobApp:thb_historyUpdate';

                createController();
                expect($rootScope.$$listenerCount[eventType]).toEqual(1);

                $scope.$destroy();
                expect($rootScope.$$listenerCount[eventType]).toBeUndefined();
            });
        });
    });

});

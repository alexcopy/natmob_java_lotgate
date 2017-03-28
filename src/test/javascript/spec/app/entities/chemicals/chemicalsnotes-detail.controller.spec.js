'use strict';

describe('Controller Tests', function() {

    describe('Chemicals Management Detail Controller', function() {
        var $scope, $rootScope;
        var MockEntity, MockPreviousState, MockChemicals, MockTank;
        var createController;

        beforeEach(inject(function($injector) {
            $rootScope = $injector.get('$rootScope');
            $scope = $rootScope.$new();
            MockEntity = jasmine.createSpy('MockEntity');
            MockPreviousState = jasmine.createSpy('MockPreviousState');
            MockChemicals = jasmine.createSpy('MockChemicals');
            MockTank = jasmine.createSpy('MockTank');
            

            var locals = {
                '$scope': $scope,
                '$rootScope': $rootScope,
                'entity': MockEntity,
                'previousState': MockPreviousState,
                'Chemicals': MockChemicals,
                'Tank': MockTank
            };
            createController = function() {
                $injector.get('$controller')("ChemicalsNotesDetailController", locals);
            };
        }));


        describe('Root Scope Listening', function() {
            it('Unregisters root scope listener upon scope destruction', function() {
                var eventType = 'natmobApp:chemicalsUpdate';

                createController();
                expect($rootScope.$$listenerCount[eventType]).toEqual(1);

                $scope.$destroy();
                expect($rootScope.$$listenerCount[eventType]).toBeUndefined();
            });
        });
    });

});

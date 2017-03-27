'use strict';

describe('Controller Tests', function() {

    describe('ChemicalAnalysis Management Detail Controller', function() {
        var $scope, $rootScope;
        var MockEntity, MockPreviousState, MockChemicalAnalysis, MockTank;
        var createController;

        beforeEach(inject(function($injector) {
            $rootScope = $injector.get('$rootScope');
            $scope = $rootScope.$new();
            MockEntity = jasmine.createSpy('MockEntity');
            MockPreviousState = jasmine.createSpy('MockPreviousState');
            MockChemicalAnalysis = jasmine.createSpy('MockChemicalAnalysis');
            MockTank = jasmine.createSpy('MockTank');
            

            var locals = {
                '$scope': $scope,
                '$rootScope': $rootScope,
                'entity': MockEntity,
                'previousState': MockPreviousState,
                'ChemicalAnalysis': MockChemicalAnalysis,
                'Tank': MockTank
            };
            createController = function() {
                $injector.get('$controller')("ChemicalAnalysisNotesDetailController", locals);
            };
        }));


        describe('Root Scope Listening', function() {
            it('Unregisters root scope listener upon scope destruction', function() {
                var eventType = 'natmobApp:chemicalAnalysisUpdate';

                createController();
                expect($rootScope.$$listenerCount[eventType]).toEqual(1);

                $scope.$destroy();
                expect($rootScope.$$listenerCount[eventType]).toBeUndefined();
            });
        });
    });

});

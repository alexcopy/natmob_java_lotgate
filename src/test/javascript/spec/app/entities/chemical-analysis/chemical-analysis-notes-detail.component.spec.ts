import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { MockBackend } from '@angular/http/testing';
import { Http, BaseRequestOptions } from '@angular/http';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { DateUtils, DataUtils } from 'ng-jhipster';
import { JhiLanguageService } from 'ng-jhipster';
import { MockLanguageService } from '../../../helpers/mock-language.service';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { ChemicalAnalysisNotesDetailComponent } from '../../../../../../main/webapp/app/entities/chemical-analysis/chemical-analysis-notes-detail.component';
import { ChemicalAnalysisNotesService } from '../../../../../../main/webapp/app/entities/chemical-analysis/chemical-analysis-notes.service';
import { ChemicalAnalysisNotes } from '../../../../../../main/webapp/app/entities/chemical-analysis/chemical-analysis-notes.model';

describe('Component Tests', () => {

    describe('ChemicalAnalysisNotes Management Detail Component', () => {
        let comp: ChemicalAnalysisNotesDetailComponent;
        let fixture: ComponentFixture<ChemicalAnalysisNotesDetailComponent>;
        let service: ChemicalAnalysisNotesService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                declarations: [ChemicalAnalysisNotesDetailComponent],
                providers: [
                    MockBackend,
                    BaseRequestOptions,
                    DateUtils,
                    DataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    {
                        provide: Http,
                        useFactory: (backendInstance: MockBackend, defaultOptions: BaseRequestOptions) => {
                            return new Http(backendInstance, defaultOptions);
                        },
                        deps: [MockBackend, BaseRequestOptions]
                    },
                    {
                        provide: JhiLanguageService,
                        useClass: MockLanguageService
                    },
                    ChemicalAnalysisNotesService
                ]
            }).overrideComponent(ChemicalAnalysisNotesDetailComponent, {
                set: {
                    template: ''
                }
            }).compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ChemicalAnalysisNotesDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ChemicalAnalysisNotesService);
        });


        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new ChemicalAnalysisNotes(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.chemicalAnalysis).toEqual(jasmine.objectContaining({id:10}));
            });
        });
    });

});

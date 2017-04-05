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
import { ChemicalsNotesDetailComponent } from '../../../../../../main/webapp/app/entities/chemicals/chemicals-notes-detail.component';
import { ChemicalsNotesService } from '../../../../../../main/webapp/app/entities/chemicals/chemicals-notes.service';
import { ChemicalsNotes } from '../../../../../../main/webapp/app/entities/chemicals/chemicals-notes.model';

describe('Component Tests', () => {

    describe('ChemicalsNotes Management Detail Component', () => {
        let comp: ChemicalsNotesDetailComponent;
        let fixture: ComponentFixture<ChemicalsNotesDetailComponent>;
        let service: ChemicalsNotesService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                declarations: [ChemicalsNotesDetailComponent],
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
                    ChemicalsNotesService
                ]
            }).overrideComponent(ChemicalsNotesDetailComponent, {
                set: {
                    template: ''
                }
            }).compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ChemicalsNotesDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ChemicalsNotesService);
        });


        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new ChemicalsNotes(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.chemicals).toEqual(jasmine.objectContaining({id:10}));
            });
        });
    });

});

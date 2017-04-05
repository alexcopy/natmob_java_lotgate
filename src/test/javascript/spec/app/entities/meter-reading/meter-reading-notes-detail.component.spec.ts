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
import { MeterReadingNotesDetailComponent } from '../../../../../../main/webapp/app/entities/meter-reading/meter-reading-notes-detail.component';
import { MeterReadingNotesService } from '../../../../../../main/webapp/app/entities/meter-reading/meter-reading-notes.service';
import { MeterReadingNotes } from '../../../../../../main/webapp/app/entities/meter-reading/meter-reading-notes.model';

describe('Component Tests', () => {

    describe('MeterReadingNotes Management Detail Component', () => {
        let comp: MeterReadingNotesDetailComponent;
        let fixture: ComponentFixture<MeterReadingNotesDetailComponent>;
        let service: MeterReadingNotesService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                declarations: [MeterReadingNotesDetailComponent],
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
                    MeterReadingNotesService
                ]
            }).overrideComponent(MeterReadingNotesDetailComponent, {
                set: {
                    template: ''
                }
            }).compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(MeterReadingNotesDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(MeterReadingNotesService);
        });


        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new MeterReadingNotes(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.meterReading).toEqual(jasmine.objectContaining({id:10}));
            });
        });
    });

});

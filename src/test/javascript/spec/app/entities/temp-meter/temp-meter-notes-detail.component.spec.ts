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
import { TempMeterNotesDetailComponent } from '../../../../../../main/webapp/app/entities/temp-meter/temp-meter-notes-detail.component';
import { TempMeterNotesService } from '../../../../../../main/webapp/app/entities/temp-meter/temp-meter-notes.service';
import { TempMeterNotes } from '../../../../../../main/webapp/app/entities/temp-meter/temp-meter-notes.model';

describe('Component Tests', () => {

    describe('TempMeterNotes Management Detail Component', () => {
        let comp: TempMeterNotesDetailComponent;
        let fixture: ComponentFixture<TempMeterNotesDetailComponent>;
        let service: TempMeterNotesService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                declarations: [TempMeterNotesDetailComponent],
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
                    TempMeterNotesService
                ]
            }).overrideComponent(TempMeterNotesDetailComponent, {
                set: {
                    template: ''
                }
            }).compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TempMeterNotesDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TempMeterNotesService);
        });


        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new TempMeterNotes(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.tempMeter).toEqual(jasmine.objectContaining({id:10}));
            });
        });
    });

});

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
import { LiveStockNotesDetailComponent } from '../../../../../../main/webapp/app/entities/live-stock/live-stock-notes-detail.component';
import { LiveStockNotesService } from '../../../../../../main/webapp/app/entities/live-stock/live-stock-notes.service';
import { LiveStockNotes } from '../../../../../../main/webapp/app/entities/live-stock/live-stock-notes.model';

describe('Component Tests', () => {

    describe('LiveStockNotes Management Detail Component', () => {
        let comp: LiveStockNotesDetailComponent;
        let fixture: ComponentFixture<LiveStockNotesDetailComponent>;
        let service: LiveStockNotesService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                declarations: [LiveStockNotesDetailComponent],
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
                    LiveStockNotesService
                ]
            }).overrideComponent(LiveStockNotesDetailComponent, {
                set: {
                    template: ''
                }
            }).compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(LiveStockNotesDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(LiveStockNotesService);
        });


        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new LiveStockNotes(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.liveStock).toEqual(jasmine.objectContaining({id:10}));
            });
        });
    });

});

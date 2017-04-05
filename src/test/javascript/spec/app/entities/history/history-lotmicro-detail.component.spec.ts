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
import { HistoryLotmicroDetailComponent } from '../../../../../../main/webapp/app/entities/history/history-lotmicro-detail.component';
import { HistoryLotmicroService } from '../../../../../../main/webapp/app/entities/history/history-lotmicro.service';
import { HistoryLotmicro } from '../../../../../../main/webapp/app/entities/history/history-lotmicro.model';

describe('Component Tests', () => {

    describe('HistoryLotmicro Management Detail Component', () => {
        let comp: HistoryLotmicroDetailComponent;
        let fixture: ComponentFixture<HistoryLotmicroDetailComponent>;
        let service: HistoryLotmicroService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                declarations: [HistoryLotmicroDetailComponent],
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
                    HistoryLotmicroService
                ]
            }).overrideComponent(HistoryLotmicroDetailComponent, {
                set: {
                    template: ''
                }
            }).compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(HistoryLotmicroDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(HistoryLotmicroService);
        });


        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new HistoryLotmicro(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.history).toEqual(jasmine.objectContaining({id:10}));
            });
        });
    });

});

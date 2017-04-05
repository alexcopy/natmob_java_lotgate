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
import { RankLotmicroDetailComponent } from '../../../../../../main/webapp/app/entities/rank/rank-lotmicro-detail.component';
import { RankLotmicroService } from '../../../../../../main/webapp/app/entities/rank/rank-lotmicro.service';
import { RankLotmicro } from '../../../../../../main/webapp/app/entities/rank/rank-lotmicro.model';

describe('Component Tests', () => {

    describe('RankLotmicro Management Detail Component', () => {
        let comp: RankLotmicroDetailComponent;
        let fixture: ComponentFixture<RankLotmicroDetailComponent>;
        let service: RankLotmicroService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                declarations: [RankLotmicroDetailComponent],
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
                    RankLotmicroService
                ]
            }).overrideComponent(RankLotmicroDetailComponent, {
                set: {
                    template: ''
                }
            }).compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(RankLotmicroDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(RankLotmicroService);
        });


        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new RankLotmicro(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.rank).toEqual(jasmine.objectContaining({id:10}));
            });
        });
    });

});

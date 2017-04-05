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
import { BonusRankLotmicroDetailComponent } from '../../../../../../main/webapp/app/entities/bonus-rank/bonus-rank-lotmicro-detail.component';
import { BonusRankLotmicroService } from '../../../../../../main/webapp/app/entities/bonus-rank/bonus-rank-lotmicro.service';
import { BonusRankLotmicro } from '../../../../../../main/webapp/app/entities/bonus-rank/bonus-rank-lotmicro.model';

describe('Component Tests', () => {

    describe('BonusRankLotmicro Management Detail Component', () => {
        let comp: BonusRankLotmicroDetailComponent;
        let fixture: ComponentFixture<BonusRankLotmicroDetailComponent>;
        let service: BonusRankLotmicroService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                declarations: [BonusRankLotmicroDetailComponent],
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
                    BonusRankLotmicroService
                ]
            }).overrideComponent(BonusRankLotmicroDetailComponent, {
                set: {
                    template: ''
                }
            }).compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(BonusRankLotmicroDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(BonusRankLotmicroService);
        });


        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new BonusRankLotmicro(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.bonusRank).toEqual(jasmine.objectContaining({id:10}));
            });
        });
    });

});

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
import { GameRuleLotmicroDetailComponent } from '../../../../../../main/webapp/app/entities/game-rule/game-rule-lotmicro-detail.component';
import { GameRuleLotmicroService } from '../../../../../../main/webapp/app/entities/game-rule/game-rule-lotmicro.service';
import { GameRuleLotmicro } from '../../../../../../main/webapp/app/entities/game-rule/game-rule-lotmicro.model';

describe('Component Tests', () => {

    describe('GameRuleLotmicro Management Detail Component', () => {
        let comp: GameRuleLotmicroDetailComponent;
        let fixture: ComponentFixture<GameRuleLotmicroDetailComponent>;
        let service: GameRuleLotmicroService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                declarations: [GameRuleLotmicroDetailComponent],
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
                    GameRuleLotmicroService
                ]
            }).overrideComponent(GameRuleLotmicroDetailComponent, {
                set: {
                    template: ''
                }
            }).compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(GameRuleLotmicroDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(GameRuleLotmicroService);
        });


        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new GameRuleLotmicro(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.gameRule).toEqual(jasmine.objectContaining({id:10}));
            });
        });
    });

});

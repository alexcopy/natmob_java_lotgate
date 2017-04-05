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
import { GameLotmicroDetailComponent } from '../../../../../../main/webapp/app/entities/game/game-lotmicro-detail.component';
import { GameLotmicroService } from '../../../../../../main/webapp/app/entities/game/game-lotmicro.service';
import { GameLotmicro } from '../../../../../../main/webapp/app/entities/game/game-lotmicro.model';

describe('Component Tests', () => {

    describe('GameLotmicro Management Detail Component', () => {
        let comp: GameLotmicroDetailComponent;
        let fixture: ComponentFixture<GameLotmicroDetailComponent>;
        let service: GameLotmicroService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                declarations: [GameLotmicroDetailComponent],
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
                    GameLotmicroService
                ]
            }).overrideComponent(GameLotmicroDetailComponent, {
                set: {
                    template: ''
                }
            }).compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(GameLotmicroDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(GameLotmicroService);
        });


        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new GameLotmicro(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.game).toEqual(jasmine.objectContaining({id:10}));
            });
        });
    });

});

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
import { LocalPlayLotmicroDetailComponent } from '../../../../../../main/webapp/app/entities/local-play/local-play-lotmicro-detail.component';
import { LocalPlayLotmicroService } from '../../../../../../main/webapp/app/entities/local-play/local-play-lotmicro.service';
import { LocalPlayLotmicro } from '../../../../../../main/webapp/app/entities/local-play/local-play-lotmicro.model';

describe('Component Tests', () => {

    describe('LocalPlayLotmicro Management Detail Component', () => {
        let comp: LocalPlayLotmicroDetailComponent;
        let fixture: ComponentFixture<LocalPlayLotmicroDetailComponent>;
        let service: LocalPlayLotmicroService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                declarations: [LocalPlayLotmicroDetailComponent],
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
                    LocalPlayLotmicroService
                ]
            }).overrideComponent(LocalPlayLotmicroDetailComponent, {
                set: {
                    template: ''
                }
            }).compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(LocalPlayLotmicroDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(LocalPlayLotmicroService);
        });


        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new LocalPlayLotmicro(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.localPlay).toEqual(jasmine.objectContaining({id:10}));
            });
        });
    });

});

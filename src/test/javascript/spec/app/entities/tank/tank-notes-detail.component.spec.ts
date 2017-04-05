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
import { TankNotesDetailComponent } from '../../../../../../main/webapp/app/entities/tank/tank-notes-detail.component';
import { TankNotesService } from '../../../../../../main/webapp/app/entities/tank/tank-notes.service';
import { TankNotes } from '../../../../../../main/webapp/app/entities/tank/tank-notes.model';

describe('Component Tests', () => {

    describe('TankNotes Management Detail Component', () => {
        let comp: TankNotesDetailComponent;
        let fixture: ComponentFixture<TankNotesDetailComponent>;
        let service: TankNotesService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                declarations: [TankNotesDetailComponent],
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
                    TankNotesService
                ]
            }).overrideComponent(TankNotesDetailComponent, {
                set: {
                    template: ''
                }
            }).compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TankNotesDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TankNotesService);
        });


        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new TankNotes(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.tank).toEqual(jasmine.objectContaining({id:10}));
            });
        });
    });

});

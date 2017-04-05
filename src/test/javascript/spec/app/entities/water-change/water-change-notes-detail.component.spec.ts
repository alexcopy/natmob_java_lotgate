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
import { WaterChangeNotesDetailComponent } from '../../../../../../main/webapp/app/entities/water-change/water-change-notes-detail.component';
import { WaterChangeNotesService } from '../../../../../../main/webapp/app/entities/water-change/water-change-notes.service';
import { WaterChangeNotes } from '../../../../../../main/webapp/app/entities/water-change/water-change-notes.model';

describe('Component Tests', () => {

    describe('WaterChangeNotes Management Detail Component', () => {
        let comp: WaterChangeNotesDetailComponent;
        let fixture: ComponentFixture<WaterChangeNotesDetailComponent>;
        let service: WaterChangeNotesService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                declarations: [WaterChangeNotesDetailComponent],
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
                    WaterChangeNotesService
                ]
            }).overrideComponent(WaterChangeNotesDetailComponent, {
                set: {
                    template: ''
                }
            }).compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(WaterChangeNotesDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(WaterChangeNotesService);
        });


        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new WaterChangeNotes(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.waterChange).toEqual(jasmine.objectContaining({id:10}));
            });
        });
    });

});

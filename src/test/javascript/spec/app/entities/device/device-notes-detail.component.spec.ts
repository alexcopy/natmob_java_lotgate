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
import { DeviceNotesDetailComponent } from '../../../../../../main/webapp/app/entities/device/device-notes-detail.component';
import { DeviceNotesService } from '../../../../../../main/webapp/app/entities/device/device-notes.service';
import { DeviceNotes } from '../../../../../../main/webapp/app/entities/device/device-notes.model';

describe('Component Tests', () => {

    describe('DeviceNotes Management Detail Component', () => {
        let comp: DeviceNotesDetailComponent;
        let fixture: ComponentFixture<DeviceNotesDetailComponent>;
        let service: DeviceNotesService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                declarations: [DeviceNotesDetailComponent],
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
                    DeviceNotesService
                ]
            }).overrideComponent(DeviceNotesDetailComponent, {
                set: {
                    template: ''
                }
            }).compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(DeviceNotesDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DeviceNotesService);
        });


        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new DeviceNotes(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.device).toEqual(jasmine.objectContaining({id:10}));
            });
        });
    });

});

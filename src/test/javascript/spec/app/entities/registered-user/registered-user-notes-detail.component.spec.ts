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
import { RegisteredUserNotesDetailComponent } from '../../../../../../main/webapp/app/entities/registered-user/registered-user-notes-detail.component';
import { RegisteredUserNotesService } from '../../../../../../main/webapp/app/entities/registered-user/registered-user-notes.service';
import { RegisteredUserNotes } from '../../../../../../main/webapp/app/entities/registered-user/registered-user-notes.model';

describe('Component Tests', () => {

    describe('RegisteredUserNotes Management Detail Component', () => {
        let comp: RegisteredUserNotesDetailComponent;
        let fixture: ComponentFixture<RegisteredUserNotesDetailComponent>;
        let service: RegisteredUserNotesService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                declarations: [RegisteredUserNotesDetailComponent],
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
                    RegisteredUserNotesService
                ]
            }).overrideComponent(RegisteredUserNotesDetailComponent, {
                set: {
                    template: ''
                }
            }).compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(RegisteredUserNotesDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(RegisteredUserNotesService);
        });


        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new RegisteredUserNotes(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.registeredUser).toEqual(jasmine.objectContaining({id:10}));
            });
        });
    });

});

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
import { OtherWorksNotesDetailComponent } from '../../../../../../main/webapp/app/entities/other-works/other-works-notes-detail.component';
import { OtherWorksNotesService } from '../../../../../../main/webapp/app/entities/other-works/other-works-notes.service';
import { OtherWorksNotes } from '../../../../../../main/webapp/app/entities/other-works/other-works-notes.model';

describe('Component Tests', () => {

    describe('OtherWorksNotes Management Detail Component', () => {
        let comp: OtherWorksNotesDetailComponent;
        let fixture: ComponentFixture<OtherWorksNotesDetailComponent>;
        let service: OtherWorksNotesService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                declarations: [OtherWorksNotesDetailComponent],
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
                    OtherWorksNotesService
                ]
            }).overrideComponent(OtherWorksNotesDetailComponent, {
                set: {
                    template: ''
                }
            }).compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(OtherWorksNotesDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(OtherWorksNotesService);
        });


        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new OtherWorksNotes(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.otherWorks).toEqual(jasmine.objectContaining({id:10}));
            });
        });
    });

});

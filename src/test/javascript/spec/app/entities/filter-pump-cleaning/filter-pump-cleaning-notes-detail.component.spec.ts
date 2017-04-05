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
import { FilterPumpCleaningNotesDetailComponent } from '../../../../../../main/webapp/app/entities/filter-pump-cleaning/filter-pump-cleaning-notes-detail.component';
import { FilterPumpCleaningNotesService } from '../../../../../../main/webapp/app/entities/filter-pump-cleaning/filter-pump-cleaning-notes.service';
import { FilterPumpCleaningNotes } from '../../../../../../main/webapp/app/entities/filter-pump-cleaning/filter-pump-cleaning-notes.model';

describe('Component Tests', () => {

    describe('FilterPumpCleaningNotes Management Detail Component', () => {
        let comp: FilterPumpCleaningNotesDetailComponent;
        let fixture: ComponentFixture<FilterPumpCleaningNotesDetailComponent>;
        let service: FilterPumpCleaningNotesService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                declarations: [FilterPumpCleaningNotesDetailComponent],
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
                    FilterPumpCleaningNotesService
                ]
            }).overrideComponent(FilterPumpCleaningNotesDetailComponent, {
                set: {
                    template: ''
                }
            }).compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(FilterPumpCleaningNotesDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(FilterPumpCleaningNotesService);
        });


        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new FilterPumpCleaningNotes(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.filterPumpCleaning).toEqual(jasmine.objectContaining({id:10}));
            });
        });
    });

});

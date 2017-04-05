import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { FilterPumpCleaningNotes } from './filter-pump-cleaning-notes.model';
import { FilterPumpCleaningNotesService } from './filter-pump-cleaning-notes.service';

@Component({
    selector: 'jhi-filter-pump-cleaning-notes-detail',
    templateUrl: './filter-pump-cleaning-notes-detail.component.html'
})
export class FilterPumpCleaningNotesDetailComponent implements OnInit, OnDestroy {

    filterPumpCleaning: FilterPumpCleaningNotes;
    private subscription: any;

    constructor(
        private jhiLanguageService: JhiLanguageService,
        private filterPumpCleaningService: FilterPumpCleaningNotesService,
        private route: ActivatedRoute
    ) {
        this.jhiLanguageService.setLocations(['filterPumpCleaning']);
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe(params => {
            this.load(params['id']);
        });
    }

    load (id) {
        this.filterPumpCleaningService.find(id).subscribe(filterPumpCleaning => {
            this.filterPumpCleaning = filterPumpCleaning;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

}

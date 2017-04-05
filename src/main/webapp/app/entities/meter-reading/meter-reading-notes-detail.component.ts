import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { MeterReadingNotes } from './meter-reading-notes.model';
import { MeterReadingNotesService } from './meter-reading-notes.service';

@Component({
    selector: 'jhi-meter-reading-notes-detail',
    templateUrl: './meter-reading-notes-detail.component.html'
})
export class MeterReadingNotesDetailComponent implements OnInit, OnDestroy {

    meterReading: MeterReadingNotes;
    private subscription: any;

    constructor(
        private jhiLanguageService: JhiLanguageService,
        private meterReadingService: MeterReadingNotesService,
        private route: ActivatedRoute
    ) {
        this.jhiLanguageService.setLocations(['meterReading']);
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe(params => {
            this.load(params['id']);
        });
    }

    load (id) {
        this.meterReadingService.find(id).subscribe(meterReading => {
            this.meterReading = meterReading;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

}

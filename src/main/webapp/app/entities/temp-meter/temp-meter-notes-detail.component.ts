import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { TempMeterNotes } from './temp-meter-notes.model';
import { TempMeterNotesService } from './temp-meter-notes.service';

@Component({
    selector: 'jhi-temp-meter-notes-detail',
    templateUrl: './temp-meter-notes-detail.component.html'
})
export class TempMeterNotesDetailComponent implements OnInit, OnDestroy {

    tempMeter: TempMeterNotes;
    private subscription: any;

    constructor(
        private jhiLanguageService: JhiLanguageService,
        private tempMeterService: TempMeterNotesService,
        private route: ActivatedRoute
    ) {
        this.jhiLanguageService.setLocations(['tempMeter']);
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe(params => {
            this.load(params['id']);
        });
    }

    load (id) {
        this.tempMeterService.find(id).subscribe(tempMeter => {
            this.tempMeter = tempMeter;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

}

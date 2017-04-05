import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { LocationNotes } from './location-notes.model';
import { LocationNotesService } from './location-notes.service';

@Component({
    selector: 'jhi-location-notes-detail',
    templateUrl: './location-notes-detail.component.html'
})
export class LocationNotesDetailComponent implements OnInit, OnDestroy {

    location: LocationNotes;
    private subscription: any;

    constructor(
        private jhiLanguageService: JhiLanguageService,
        private locationService: LocationNotesService,
        private route: ActivatedRoute
    ) {
        this.jhiLanguageService.setLocations(['location']);
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe(params => {
            this.load(params['id']);
        });
    }

    load (id) {
        this.locationService.find(id).subscribe(location => {
            this.location = location;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

}

import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { WaterChangeNotes } from './water-change-notes.model';
import { WaterChangeNotesService } from './water-change-notes.service';

@Component({
    selector: 'jhi-water-change-notes-detail',
    templateUrl: './water-change-notes-detail.component.html'
})
export class WaterChangeNotesDetailComponent implements OnInit, OnDestroy {

    waterChange: WaterChangeNotes;
    private subscription: any;

    constructor(
        private jhiLanguageService: JhiLanguageService,
        private waterChangeService: WaterChangeNotesService,
        private route: ActivatedRoute
    ) {
        this.jhiLanguageService.setLocations(['waterChange']);
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe(params => {
            this.load(params['id']);
        });
    }

    load (id) {
        this.waterChangeService.find(id).subscribe(waterChange => {
            this.waterChange = waterChange;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

}

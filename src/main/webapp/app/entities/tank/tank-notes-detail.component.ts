import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { TankNotes } from './tank-notes.model';
import { TankNotesService } from './tank-notes.service';

@Component({
    selector: 'jhi-tank-notes-detail',
    templateUrl: './tank-notes-detail.component.html'
})
export class TankNotesDetailComponent implements OnInit, OnDestroy {

    tank: TankNotes;
    private subscription: any;

    constructor(
        private jhiLanguageService: JhiLanguageService,
        private tankService: TankNotesService,
        private route: ActivatedRoute
    ) {
        this.jhiLanguageService.setLocations(['tank', 'tankType']);
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe(params => {
            this.load(params['id']);
        });
    }

    load (id) {
        this.tankService.find(id).subscribe(tank => {
            this.tank = tank;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

}

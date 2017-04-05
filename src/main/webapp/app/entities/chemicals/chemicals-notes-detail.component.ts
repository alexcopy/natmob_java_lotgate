import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { ChemicalsNotes } from './chemicals-notes.model';
import { ChemicalsNotesService } from './chemicals-notes.service';

@Component({
    selector: 'jhi-chemicals-notes-detail',
    templateUrl: './chemicals-notes-detail.component.html'
})
export class ChemicalsNotesDetailComponent implements OnInit, OnDestroy {

    chemicals: ChemicalsNotes;
    private subscription: any;

    constructor(
        private jhiLanguageService: JhiLanguageService,
        private chemicalsService: ChemicalsNotesService,
        private route: ActivatedRoute
    ) {
        this.jhiLanguageService.setLocations(['chemicals']);
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe(params => {
            this.load(params['id']);
        });
    }

    load (id) {
        this.chemicalsService.find(id).subscribe(chemicals => {
            this.chemicals = chemicals;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

}

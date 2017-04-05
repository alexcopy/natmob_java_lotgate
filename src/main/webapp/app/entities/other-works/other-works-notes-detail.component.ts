import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { OtherWorksNotes } from './other-works-notes.model';
import { OtherWorksNotesService } from './other-works-notes.service';

@Component({
    selector: 'jhi-other-works-notes-detail',
    templateUrl: './other-works-notes-detail.component.html'
})
export class OtherWorksNotesDetailComponent implements OnInit, OnDestroy {

    otherWorks: OtherWorksNotes;
    private subscription: any;

    constructor(
        private jhiLanguageService: JhiLanguageService,
        private otherWorksService: OtherWorksNotesService,
        private route: ActivatedRoute
    ) {
        this.jhiLanguageService.setLocations(['otherWorks']);
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe(params => {
            this.load(params['id']);
        });
    }

    load (id) {
        this.otherWorksService.find(id).subscribe(otherWorks => {
            this.otherWorks = otherWorks;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

}

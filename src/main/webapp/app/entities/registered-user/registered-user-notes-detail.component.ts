import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { RegisteredUserNotes } from './registered-user-notes.model';
import { RegisteredUserNotesService } from './registered-user-notes.service';

@Component({
    selector: 'jhi-registered-user-notes-detail',
    templateUrl: './registered-user-notes-detail.component.html'
})
export class RegisteredUserNotesDetailComponent implements OnInit, OnDestroy {

    registeredUser: RegisteredUserNotes;
    private subscription: any;

    constructor(
        private jhiLanguageService: JhiLanguageService,
        private registeredUserService: RegisteredUserNotesService,
        private route: ActivatedRoute
    ) {
        this.jhiLanguageService.setLocations(['registeredUser']);
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe(params => {
            this.load(params['id']);
        });
    }

    load (id) {
        this.registeredUserService.find(id).subscribe(registeredUser => {
            this.registeredUser = registeredUser;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

}

import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventManager, JhiLanguageService } from 'ng-jhipster';

import { RegisteredUserNotes } from './registered-user-notes.model';
import { RegisteredUserNotesPopupService } from './registered-user-notes-popup.service';
import { RegisteredUserNotesService } from './registered-user-notes.service';

@Component({
    selector: 'jhi-registered-user-notes-delete-dialog',
    templateUrl: './registered-user-notes-delete-dialog.component.html'
})
export class RegisteredUserNotesDeleteDialogComponent {

    registeredUser: RegisteredUserNotes;

    constructor(
        private jhiLanguageService: JhiLanguageService,
        private registeredUserService: RegisteredUserNotesService,
        public activeModal: NgbActiveModal,
        private eventManager: EventManager
    ) {
        this.jhiLanguageService.setLocations(['registeredUser']);
    }

    clear () {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete (id: number) {
        this.registeredUserService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'registeredUserListModification',
                content: 'Deleted an registeredUser'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-registered-user-notes-delete-popup',
    template: ''
})
export class RegisteredUserNotesDeletePopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor (
        private route: ActivatedRoute,
        private registeredUserPopupService: RegisteredUserNotesPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            this.modalRef = this.registeredUserPopupService
                .open(RegisteredUserNotesDeleteDialogComponent, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}

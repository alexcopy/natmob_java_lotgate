import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventManager, AlertService, JhiLanguageService } from 'ng-jhipster';

import { RegisteredUserNotes } from './registered-user-notes.model';
import { RegisteredUserNotesPopupService } from './registered-user-notes-popup.service';
import { RegisteredUserNotesService } from './registered-user-notes.service';

@Component({
    selector: 'jhi-registered-user-notes-dialog',
    templateUrl: './registered-user-notes-dialog.component.html'
})
export class RegisteredUserNotesDialogComponent implements OnInit {

    registeredUser: RegisteredUserNotes;
    authorities: any[];
    isSaving: boolean;
    constructor(
        public activeModal: NgbActiveModal,
        private jhiLanguageService: JhiLanguageService,
        private alertService: AlertService,
        private registeredUserService: RegisteredUserNotesService,
        private eventManager: EventManager
    ) {
        this.jhiLanguageService.setLocations(['registeredUser']);
    }

    ngOnInit() {
        this.isSaving = false;
        this.authorities = ['ROLE_USER', 'ROLE_ADMIN'];
    }
    clear () {
        this.activeModal.dismiss('cancel');
    }

    save () {
        this.isSaving = true;
        if (this.registeredUser.id !== undefined) {
            this.registeredUserService.update(this.registeredUser)
                .subscribe((res: RegisteredUserNotes) =>
                    this.onSaveSuccess(res), (res: Response) => this.onSaveError(res.json()));
        } else {
            this.registeredUserService.create(this.registeredUser)
                .subscribe((res: RegisteredUserNotes) =>
                    this.onSaveSuccess(res), (res: Response) => this.onSaveError(res.json()));
        }
    }

    private onSaveSuccess (result: RegisteredUserNotes) {
        this.eventManager.broadcast({ name: 'registeredUserListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError (error) {
        this.isSaving = false;
        this.onError(error);
    }

    private onError (error) {
        this.alertService.error(error.message, null, null);
    }
}

@Component({
    selector: 'jhi-registered-user-notes-popup',
    template: ''
})
export class RegisteredUserNotesPopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor (
        private route: ActivatedRoute,
        private registeredUserPopupService: RegisteredUserNotesPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            if ( params['id'] ) {
                this.modalRef = this.registeredUserPopupService
                    .open(RegisteredUserNotesDialogComponent, params['id']);
            } else {
                this.modalRef = this.registeredUserPopupService
                    .open(RegisteredUserNotesDialogComponent);
            }

        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}

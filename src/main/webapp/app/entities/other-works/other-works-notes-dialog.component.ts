import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventManager, AlertService, JhiLanguageService } from 'ng-jhipster';

import { OtherWorksNotes } from './other-works-notes.model';
import { OtherWorksNotesPopupService } from './other-works-notes-popup.service';
import { OtherWorksNotesService } from './other-works-notes.service';

@Component({
    selector: 'jhi-other-works-notes-dialog',
    templateUrl: './other-works-notes-dialog.component.html'
})
export class OtherWorksNotesDialogComponent implements OnInit {

    otherWorks: OtherWorksNotes;
    authorities: any[];
    isSaving: boolean;
    constructor(
        public activeModal: NgbActiveModal,
        private jhiLanguageService: JhiLanguageService,
        private alertService: AlertService,
        private otherWorksService: OtherWorksNotesService,
        private eventManager: EventManager
    ) {
        this.jhiLanguageService.setLocations(['otherWorks']);
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
        if (this.otherWorks.id !== undefined) {
            this.otherWorksService.update(this.otherWorks)
                .subscribe((res: OtherWorksNotes) =>
                    this.onSaveSuccess(res), (res: Response) => this.onSaveError(res.json()));
        } else {
            this.otherWorksService.create(this.otherWorks)
                .subscribe((res: OtherWorksNotes) =>
                    this.onSaveSuccess(res), (res: Response) => this.onSaveError(res.json()));
        }
    }

    private onSaveSuccess (result: OtherWorksNotes) {
        this.eventManager.broadcast({ name: 'otherWorksListModification', content: 'OK'});
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
    selector: 'jhi-other-works-notes-popup',
    template: ''
})
export class OtherWorksNotesPopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor (
        private route: ActivatedRoute,
        private otherWorksPopupService: OtherWorksNotesPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            if ( params['id'] ) {
                this.modalRef = this.otherWorksPopupService
                    .open(OtherWorksNotesDialogComponent, params['id']);
            } else {
                this.modalRef = this.otherWorksPopupService
                    .open(OtherWorksNotesDialogComponent);
            }

        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}

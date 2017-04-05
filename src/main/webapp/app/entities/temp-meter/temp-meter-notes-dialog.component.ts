import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventManager, AlertService, JhiLanguageService } from 'ng-jhipster';

import { TempMeterNotes } from './temp-meter-notes.model';
import { TempMeterNotesPopupService } from './temp-meter-notes-popup.service';
import { TempMeterNotesService } from './temp-meter-notes.service';

@Component({
    selector: 'jhi-temp-meter-notes-dialog',
    templateUrl: './temp-meter-notes-dialog.component.html'
})
export class TempMeterNotesDialogComponent implements OnInit {

    tempMeter: TempMeterNotes;
    authorities: any[];
    isSaving: boolean;
    constructor(
        public activeModal: NgbActiveModal,
        private jhiLanguageService: JhiLanguageService,
        private alertService: AlertService,
        private tempMeterService: TempMeterNotesService,
        private eventManager: EventManager
    ) {
        this.jhiLanguageService.setLocations(['tempMeter']);
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
        if (this.tempMeter.id !== undefined) {
            this.tempMeterService.update(this.tempMeter)
                .subscribe((res: TempMeterNotes) =>
                    this.onSaveSuccess(res), (res: Response) => this.onSaveError(res.json()));
        } else {
            this.tempMeterService.create(this.tempMeter)
                .subscribe((res: TempMeterNotes) =>
                    this.onSaveSuccess(res), (res: Response) => this.onSaveError(res.json()));
        }
    }

    private onSaveSuccess (result: TempMeterNotes) {
        this.eventManager.broadcast({ name: 'tempMeterListModification', content: 'OK'});
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
    selector: 'jhi-temp-meter-notes-popup',
    template: ''
})
export class TempMeterNotesPopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor (
        private route: ActivatedRoute,
        private tempMeterPopupService: TempMeterNotesPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            if ( params['id'] ) {
                this.modalRef = this.tempMeterPopupService
                    .open(TempMeterNotesDialogComponent, params['id']);
            } else {
                this.modalRef = this.tempMeterPopupService
                    .open(TempMeterNotesDialogComponent);
            }

        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}

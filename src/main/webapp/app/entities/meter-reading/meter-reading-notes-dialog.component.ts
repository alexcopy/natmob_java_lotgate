import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventManager, AlertService, JhiLanguageService } from 'ng-jhipster';

import { MeterReadingNotes } from './meter-reading-notes.model';
import { MeterReadingNotesPopupService } from './meter-reading-notes-popup.service';
import { MeterReadingNotesService } from './meter-reading-notes.service';

@Component({
    selector: 'jhi-meter-reading-notes-dialog',
    templateUrl: './meter-reading-notes-dialog.component.html'
})
export class MeterReadingNotesDialogComponent implements OnInit {

    meterReading: MeterReadingNotes;
    authorities: any[];
    isSaving: boolean;
    constructor(
        public activeModal: NgbActiveModal,
        private jhiLanguageService: JhiLanguageService,
        private alertService: AlertService,
        private meterReadingService: MeterReadingNotesService,
        private eventManager: EventManager
    ) {
        this.jhiLanguageService.setLocations(['meterReading']);
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
        if (this.meterReading.id !== undefined) {
            this.meterReadingService.update(this.meterReading)
                .subscribe((res: MeterReadingNotes) =>
                    this.onSaveSuccess(res), (res: Response) => this.onSaveError(res.json()));
        } else {
            this.meterReadingService.create(this.meterReading)
                .subscribe((res: MeterReadingNotes) =>
                    this.onSaveSuccess(res), (res: Response) => this.onSaveError(res.json()));
        }
    }

    private onSaveSuccess (result: MeterReadingNotes) {
        this.eventManager.broadcast({ name: 'meterReadingListModification', content: 'OK'});
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
    selector: 'jhi-meter-reading-notes-popup',
    template: ''
})
export class MeterReadingNotesPopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor (
        private route: ActivatedRoute,
        private meterReadingPopupService: MeterReadingNotesPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            if ( params['id'] ) {
                this.modalRef = this.meterReadingPopupService
                    .open(MeterReadingNotesDialogComponent, params['id']);
            } else {
                this.modalRef = this.meterReadingPopupService
                    .open(MeterReadingNotesDialogComponent);
            }

        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}

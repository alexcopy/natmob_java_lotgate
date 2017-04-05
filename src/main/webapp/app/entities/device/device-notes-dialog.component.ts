import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventManager, AlertService, JhiLanguageService } from 'ng-jhipster';

import { DeviceNotes } from './device-notes.model';
import { DeviceNotesPopupService } from './device-notes-popup.service';
import { DeviceNotesService } from './device-notes.service';

@Component({
    selector: 'jhi-device-notes-dialog',
    templateUrl: './device-notes-dialog.component.html'
})
export class DeviceNotesDialogComponent implements OnInit {

    device: DeviceNotes;
    authorities: any[];
    isSaving: boolean;
    constructor(
        public activeModal: NgbActiveModal,
        private jhiLanguageService: JhiLanguageService,
        private alertService: AlertService,
        private deviceService: DeviceNotesService,
        private eventManager: EventManager
    ) {
        this.jhiLanguageService.setLocations(['device', 'deviceType']);
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
        if (this.device.id !== undefined) {
            this.deviceService.update(this.device)
                .subscribe((res: DeviceNotes) =>
                    this.onSaveSuccess(res), (res: Response) => this.onSaveError(res.json()));
        } else {
            this.deviceService.create(this.device)
                .subscribe((res: DeviceNotes) =>
                    this.onSaveSuccess(res), (res: Response) => this.onSaveError(res.json()));
        }
    }

    private onSaveSuccess (result: DeviceNotes) {
        this.eventManager.broadcast({ name: 'deviceListModification', content: 'OK'});
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
    selector: 'jhi-device-notes-popup',
    template: ''
})
export class DeviceNotesPopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor (
        private route: ActivatedRoute,
        private devicePopupService: DeviceNotesPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            if ( params['id'] ) {
                this.modalRef = this.devicePopupService
                    .open(DeviceNotesDialogComponent, params['id']);
            } else {
                this.modalRef = this.devicePopupService
                    .open(DeviceNotesDialogComponent);
            }

        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}

import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventManager, AlertService, JhiLanguageService } from 'ng-jhipster';

import { WaterChangeNotes } from './water-change-notes.model';
import { WaterChangeNotesPopupService } from './water-change-notes-popup.service';
import { WaterChangeNotesService } from './water-change-notes.service';

@Component({
    selector: 'jhi-water-change-notes-dialog',
    templateUrl: './water-change-notes-dialog.component.html'
})
export class WaterChangeNotesDialogComponent implements OnInit {

    waterChange: WaterChangeNotes;
    authorities: any[];
    isSaving: boolean;
    constructor(
        public activeModal: NgbActiveModal,
        private jhiLanguageService: JhiLanguageService,
        private alertService: AlertService,
        private waterChangeService: WaterChangeNotesService,
        private eventManager: EventManager
    ) {
        this.jhiLanguageService.setLocations(['waterChange']);
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
        if (this.waterChange.id !== undefined) {
            this.waterChangeService.update(this.waterChange)
                .subscribe((res: WaterChangeNotes) =>
                    this.onSaveSuccess(res), (res: Response) => this.onSaveError(res.json()));
        } else {
            this.waterChangeService.create(this.waterChange)
                .subscribe((res: WaterChangeNotes) =>
                    this.onSaveSuccess(res), (res: Response) => this.onSaveError(res.json()));
        }
    }

    private onSaveSuccess (result: WaterChangeNotes) {
        this.eventManager.broadcast({ name: 'waterChangeListModification', content: 'OK'});
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
    selector: 'jhi-water-change-notes-popup',
    template: ''
})
export class WaterChangeNotesPopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor (
        private route: ActivatedRoute,
        private waterChangePopupService: WaterChangeNotesPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            if ( params['id'] ) {
                this.modalRef = this.waterChangePopupService
                    .open(WaterChangeNotesDialogComponent, params['id']);
            } else {
                this.modalRef = this.waterChangePopupService
                    .open(WaterChangeNotesDialogComponent);
            }

        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}

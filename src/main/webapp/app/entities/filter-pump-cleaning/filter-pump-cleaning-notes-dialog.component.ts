import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventManager, AlertService, JhiLanguageService } from 'ng-jhipster';

import { FilterPumpCleaningNotes } from './filter-pump-cleaning-notes.model';
import { FilterPumpCleaningNotesPopupService } from './filter-pump-cleaning-notes-popup.service';
import { FilterPumpCleaningNotesService } from './filter-pump-cleaning-notes.service';

@Component({
    selector: 'jhi-filter-pump-cleaning-notes-dialog',
    templateUrl: './filter-pump-cleaning-notes-dialog.component.html'
})
export class FilterPumpCleaningNotesDialogComponent implements OnInit {

    filterPumpCleaning: FilterPumpCleaningNotes;
    authorities: any[];
    isSaving: boolean;
    constructor(
        public activeModal: NgbActiveModal,
        private jhiLanguageService: JhiLanguageService,
        private alertService: AlertService,
        private filterPumpCleaningService: FilterPumpCleaningNotesService,
        private eventManager: EventManager
    ) {
        this.jhiLanguageService.setLocations(['filterPumpCleaning']);
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
        if (this.filterPumpCleaning.id !== undefined) {
            this.filterPumpCleaningService.update(this.filterPumpCleaning)
                .subscribe((res: FilterPumpCleaningNotes) =>
                    this.onSaveSuccess(res), (res: Response) => this.onSaveError(res.json()));
        } else {
            this.filterPumpCleaningService.create(this.filterPumpCleaning)
                .subscribe((res: FilterPumpCleaningNotes) =>
                    this.onSaveSuccess(res), (res: Response) => this.onSaveError(res.json()));
        }
    }

    private onSaveSuccess (result: FilterPumpCleaningNotes) {
        this.eventManager.broadcast({ name: 'filterPumpCleaningListModification', content: 'OK'});
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
    selector: 'jhi-filter-pump-cleaning-notes-popup',
    template: ''
})
export class FilterPumpCleaningNotesPopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor (
        private route: ActivatedRoute,
        private filterPumpCleaningPopupService: FilterPumpCleaningNotesPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            if ( params['id'] ) {
                this.modalRef = this.filterPumpCleaningPopupService
                    .open(FilterPumpCleaningNotesDialogComponent, params['id']);
            } else {
                this.modalRef = this.filterPumpCleaningPopupService
                    .open(FilterPumpCleaningNotesDialogComponent);
            }

        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}

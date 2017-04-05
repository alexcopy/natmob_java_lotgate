import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventManager, AlertService, JhiLanguageService } from 'ng-jhipster';

import { LiveStockNotes } from './live-stock-notes.model';
import { LiveStockNotesPopupService } from './live-stock-notes-popup.service';
import { LiveStockNotesService } from './live-stock-notes.service';

@Component({
    selector: 'jhi-live-stock-notes-dialog',
    templateUrl: './live-stock-notes-dialog.component.html'
})
export class LiveStockNotesDialogComponent implements OnInit {

    liveStock: LiveStockNotes;
    authorities: any[];
    isSaving: boolean;
    constructor(
        public activeModal: NgbActiveModal,
        private jhiLanguageService: JhiLanguageService,
        private alertService: AlertService,
        private liveStockService: LiveStockNotesService,
        private eventManager: EventManager
    ) {
        this.jhiLanguageService.setLocations(['liveStock', 'stockCase']);
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
        if (this.liveStock.id !== undefined) {
            this.liveStockService.update(this.liveStock)
                .subscribe((res: LiveStockNotes) =>
                    this.onSaveSuccess(res), (res: Response) => this.onSaveError(res.json()));
        } else {
            this.liveStockService.create(this.liveStock)
                .subscribe((res: LiveStockNotes) =>
                    this.onSaveSuccess(res), (res: Response) => this.onSaveError(res.json()));
        }
    }

    private onSaveSuccess (result: LiveStockNotes) {
        this.eventManager.broadcast({ name: 'liveStockListModification', content: 'OK'});
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
    selector: 'jhi-live-stock-notes-popup',
    template: ''
})
export class LiveStockNotesPopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor (
        private route: ActivatedRoute,
        private liveStockPopupService: LiveStockNotesPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            if ( params['id'] ) {
                this.modalRef = this.liveStockPopupService
                    .open(LiveStockNotesDialogComponent, params['id']);
            } else {
                this.modalRef = this.liveStockPopupService
                    .open(LiveStockNotesDialogComponent);
            }

        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}

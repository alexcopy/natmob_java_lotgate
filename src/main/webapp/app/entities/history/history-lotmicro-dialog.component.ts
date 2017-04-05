import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventManager, AlertService, JhiLanguageService } from 'ng-jhipster';

import { HistoryLotmicro } from './history-lotmicro.model';
import { HistoryLotmicroPopupService } from './history-lotmicro-popup.service';
import { HistoryLotmicroService } from './history-lotmicro.service';

@Component({
    selector: 'jhi-history-lotmicro-dialog',
    templateUrl: './history-lotmicro-dialog.component.html'
})
export class HistoryLotmicroDialogComponent implements OnInit {

    history: HistoryLotmicro;
    authorities: any[];
    isSaving: boolean;
    constructor(
        public activeModal: NgbActiveModal,
        private jhiLanguageService: JhiLanguageService,
        private alertService: AlertService,
        private historyService: HistoryLotmicroService,
        private eventManager: EventManager
    ) {
        this.jhiLanguageService.setLocations(['history', 'gamesPlay']);
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
        if (this.history.id !== undefined) {
            this.historyService.update(this.history)
                .subscribe((res: HistoryLotmicro) =>
                    this.onSaveSuccess(res), (res: Response) => this.onSaveError(res.json()));
        } else {
            this.historyService.create(this.history)
                .subscribe((res: HistoryLotmicro) =>
                    this.onSaveSuccess(res), (res: Response) => this.onSaveError(res.json()));
        }
    }

    private onSaveSuccess (result: HistoryLotmicro) {
        this.eventManager.broadcast({ name: 'historyListModification', content: 'OK'});
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
    selector: 'jhi-history-lotmicro-popup',
    template: ''
})
export class HistoryLotmicroPopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor (
        private route: ActivatedRoute,
        private historyPopupService: HistoryLotmicroPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            if ( params['id'] ) {
                this.modalRef = this.historyPopupService
                    .open(HistoryLotmicroDialogComponent, params['id']);
            } else {
                this.modalRef = this.historyPopupService
                    .open(HistoryLotmicroDialogComponent);
            }

        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}

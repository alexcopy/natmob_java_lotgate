import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventManager, JhiLanguageService } from 'ng-jhipster';

import { HistoryLotmicro } from './history-lotmicro.model';
import { HistoryLotmicroPopupService } from './history-lotmicro-popup.service';
import { HistoryLotmicroService } from './history-lotmicro.service';

@Component({
    selector: 'jhi-history-lotmicro-delete-dialog',
    templateUrl: './history-lotmicro-delete-dialog.component.html'
})
export class HistoryLotmicroDeleteDialogComponent {

    history: HistoryLotmicro;

    constructor(
        private jhiLanguageService: JhiLanguageService,
        private historyService: HistoryLotmicroService,
        public activeModal: NgbActiveModal,
        private eventManager: EventManager
    ) {
        this.jhiLanguageService.setLocations(['history', 'gamesPlay']);
    }

    clear () {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete (id: number) {
        this.historyService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'historyListModification',
                content: 'Deleted an history'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-history-lotmicro-delete-popup',
    template: ''
})
export class HistoryLotmicroDeletePopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor (
        private route: ActivatedRoute,
        private historyPopupService: HistoryLotmicroPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            this.modalRef = this.historyPopupService
                .open(HistoryLotmicroDeleteDialogComponent, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}

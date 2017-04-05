import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventManager, JhiLanguageService } from 'ng-jhipster';

import { LiveStockNotes } from './live-stock-notes.model';
import { LiveStockNotesPopupService } from './live-stock-notes-popup.service';
import { LiveStockNotesService } from './live-stock-notes.service';

@Component({
    selector: 'jhi-live-stock-notes-delete-dialog',
    templateUrl: './live-stock-notes-delete-dialog.component.html'
})
export class LiveStockNotesDeleteDialogComponent {

    liveStock: LiveStockNotes;

    constructor(
        private jhiLanguageService: JhiLanguageService,
        private liveStockService: LiveStockNotesService,
        public activeModal: NgbActiveModal,
        private eventManager: EventManager
    ) {
        this.jhiLanguageService.setLocations(['liveStock', 'stockCase']);
    }

    clear () {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete (id: number) {
        this.liveStockService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'liveStockListModification',
                content: 'Deleted an liveStock'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-live-stock-notes-delete-popup',
    template: ''
})
export class LiveStockNotesDeletePopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor (
        private route: ActivatedRoute,
        private liveStockPopupService: LiveStockNotesPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            this.modalRef = this.liveStockPopupService
                .open(LiveStockNotesDeleteDialogComponent, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}

import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventManager, JhiLanguageService } from 'ng-jhipster';

import { MeterReadingNotes } from './meter-reading-notes.model';
import { MeterReadingNotesPopupService } from './meter-reading-notes-popup.service';
import { MeterReadingNotesService } from './meter-reading-notes.service';

@Component({
    selector: 'jhi-meter-reading-notes-delete-dialog',
    templateUrl: './meter-reading-notes-delete-dialog.component.html'
})
export class MeterReadingNotesDeleteDialogComponent {

    meterReading: MeterReadingNotes;

    constructor(
        private jhiLanguageService: JhiLanguageService,
        private meterReadingService: MeterReadingNotesService,
        public activeModal: NgbActiveModal,
        private eventManager: EventManager
    ) {
        this.jhiLanguageService.setLocations(['meterReading']);
    }

    clear () {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete (id: number) {
        this.meterReadingService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'meterReadingListModification',
                content: 'Deleted an meterReading'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-meter-reading-notes-delete-popup',
    template: ''
})
export class MeterReadingNotesDeletePopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor (
        private route: ActivatedRoute,
        private meterReadingPopupService: MeterReadingNotesPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            this.modalRef = this.meterReadingPopupService
                .open(MeterReadingNotesDeleteDialogComponent, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}

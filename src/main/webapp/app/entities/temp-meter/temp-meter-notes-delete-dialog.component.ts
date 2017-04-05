import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventManager, JhiLanguageService } from 'ng-jhipster';

import { TempMeterNotes } from './temp-meter-notes.model';
import { TempMeterNotesPopupService } from './temp-meter-notes-popup.service';
import { TempMeterNotesService } from './temp-meter-notes.service';

@Component({
    selector: 'jhi-temp-meter-notes-delete-dialog',
    templateUrl: './temp-meter-notes-delete-dialog.component.html'
})
export class TempMeterNotesDeleteDialogComponent {

    tempMeter: TempMeterNotes;

    constructor(
        private jhiLanguageService: JhiLanguageService,
        private tempMeterService: TempMeterNotesService,
        public activeModal: NgbActiveModal,
        private eventManager: EventManager
    ) {
        this.jhiLanguageService.setLocations(['tempMeter']);
    }

    clear () {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete (id: number) {
        this.tempMeterService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'tempMeterListModification',
                content: 'Deleted an tempMeter'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-temp-meter-notes-delete-popup',
    template: ''
})
export class TempMeterNotesDeletePopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor (
        private route: ActivatedRoute,
        private tempMeterPopupService: TempMeterNotesPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            this.modalRef = this.tempMeterPopupService
                .open(TempMeterNotesDeleteDialogComponent, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}

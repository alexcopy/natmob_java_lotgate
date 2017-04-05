import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventManager, JhiLanguageService } from 'ng-jhipster';

import { FilterPumpCleaningNotes } from './filter-pump-cleaning-notes.model';
import { FilterPumpCleaningNotesPopupService } from './filter-pump-cleaning-notes-popup.service';
import { FilterPumpCleaningNotesService } from './filter-pump-cleaning-notes.service';

@Component({
    selector: 'jhi-filter-pump-cleaning-notes-delete-dialog',
    templateUrl: './filter-pump-cleaning-notes-delete-dialog.component.html'
})
export class FilterPumpCleaningNotesDeleteDialogComponent {

    filterPumpCleaning: FilterPumpCleaningNotes;

    constructor(
        private jhiLanguageService: JhiLanguageService,
        private filterPumpCleaningService: FilterPumpCleaningNotesService,
        public activeModal: NgbActiveModal,
        private eventManager: EventManager
    ) {
        this.jhiLanguageService.setLocations(['filterPumpCleaning']);
    }

    clear () {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete (id: number) {
        this.filterPumpCleaningService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'filterPumpCleaningListModification',
                content: 'Deleted an filterPumpCleaning'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-filter-pump-cleaning-notes-delete-popup',
    template: ''
})
export class FilterPumpCleaningNotesDeletePopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor (
        private route: ActivatedRoute,
        private filterPumpCleaningPopupService: FilterPumpCleaningNotesPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            this.modalRef = this.filterPumpCleaningPopupService
                .open(FilterPumpCleaningNotesDeleteDialogComponent, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}

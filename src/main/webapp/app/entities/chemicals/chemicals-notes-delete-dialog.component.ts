import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventManager, JhiLanguageService } from 'ng-jhipster';

import { ChemicalsNotes } from './chemicals-notes.model';
import { ChemicalsNotesPopupService } from './chemicals-notes-popup.service';
import { ChemicalsNotesService } from './chemicals-notes.service';

@Component({
    selector: 'jhi-chemicals-notes-delete-dialog',
    templateUrl: './chemicals-notes-delete-dialog.component.html'
})
export class ChemicalsNotesDeleteDialogComponent {

    chemicals: ChemicalsNotes;

    constructor(
        private jhiLanguageService: JhiLanguageService,
        private chemicalsService: ChemicalsNotesService,
        public activeModal: NgbActiveModal,
        private eventManager: EventManager
    ) {
        this.jhiLanguageService.setLocations(['chemicals']);
    }

    clear () {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete (id: number) {
        this.chemicalsService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'chemicalsListModification',
                content: 'Deleted an chemicals'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-chemicals-notes-delete-popup',
    template: ''
})
export class ChemicalsNotesDeletePopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor (
        private route: ActivatedRoute,
        private chemicalsPopupService: ChemicalsNotesPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            this.modalRef = this.chemicalsPopupService
                .open(ChemicalsNotesDeleteDialogComponent, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}

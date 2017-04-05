import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventManager, JhiLanguageService } from 'ng-jhipster';

import { ChemicalAnalysisNotes } from './chemical-analysis-notes.model';
import { ChemicalAnalysisNotesPopupService } from './chemical-analysis-notes-popup.service';
import { ChemicalAnalysisNotesService } from './chemical-analysis-notes.service';

@Component({
    selector: 'jhi-chemical-analysis-notes-delete-dialog',
    templateUrl: './chemical-analysis-notes-delete-dialog.component.html'
})
export class ChemicalAnalysisNotesDeleteDialogComponent {

    chemicalAnalysis: ChemicalAnalysisNotes;

    constructor(
        private jhiLanguageService: JhiLanguageService,
        private chemicalAnalysisService: ChemicalAnalysisNotesService,
        public activeModal: NgbActiveModal,
        private eventManager: EventManager
    ) {
        this.jhiLanguageService.setLocations(['chemicalAnalysis']);
    }

    clear () {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete (id: number) {
        this.chemicalAnalysisService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'chemicalAnalysisListModification',
                content: 'Deleted an chemicalAnalysis'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-chemical-analysis-notes-delete-popup',
    template: ''
})
export class ChemicalAnalysisNotesDeletePopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor (
        private route: ActivatedRoute,
        private chemicalAnalysisPopupService: ChemicalAnalysisNotesPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            this.modalRef = this.chemicalAnalysisPopupService
                .open(ChemicalAnalysisNotesDeleteDialogComponent, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}

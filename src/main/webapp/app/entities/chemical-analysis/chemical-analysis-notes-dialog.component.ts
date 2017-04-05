import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventManager, AlertService, JhiLanguageService } from 'ng-jhipster';

import { ChemicalAnalysisNotes } from './chemical-analysis-notes.model';
import { ChemicalAnalysisNotesPopupService } from './chemical-analysis-notes-popup.service';
import { ChemicalAnalysisNotesService } from './chemical-analysis-notes.service';

@Component({
    selector: 'jhi-chemical-analysis-notes-dialog',
    templateUrl: './chemical-analysis-notes-dialog.component.html'
})
export class ChemicalAnalysisNotesDialogComponent implements OnInit {

    chemicalAnalysis: ChemicalAnalysisNotes;
    authorities: any[];
    isSaving: boolean;
    constructor(
        public activeModal: NgbActiveModal,
        private jhiLanguageService: JhiLanguageService,
        private alertService: AlertService,
        private chemicalAnalysisService: ChemicalAnalysisNotesService,
        private eventManager: EventManager
    ) {
        this.jhiLanguageService.setLocations(['chemicalAnalysis']);
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
        if (this.chemicalAnalysis.id !== undefined) {
            this.chemicalAnalysisService.update(this.chemicalAnalysis)
                .subscribe((res: ChemicalAnalysisNotes) =>
                    this.onSaveSuccess(res), (res: Response) => this.onSaveError(res.json()));
        } else {
            this.chemicalAnalysisService.create(this.chemicalAnalysis)
                .subscribe((res: ChemicalAnalysisNotes) =>
                    this.onSaveSuccess(res), (res: Response) => this.onSaveError(res.json()));
        }
    }

    private onSaveSuccess (result: ChemicalAnalysisNotes) {
        this.eventManager.broadcast({ name: 'chemicalAnalysisListModification', content: 'OK'});
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
    selector: 'jhi-chemical-analysis-notes-popup',
    template: ''
})
export class ChemicalAnalysisNotesPopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor (
        private route: ActivatedRoute,
        private chemicalAnalysisPopupService: ChemicalAnalysisNotesPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            if ( params['id'] ) {
                this.modalRef = this.chemicalAnalysisPopupService
                    .open(ChemicalAnalysisNotesDialogComponent, params['id']);
            } else {
                this.modalRef = this.chemicalAnalysisPopupService
                    .open(ChemicalAnalysisNotesDialogComponent);
            }

        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}

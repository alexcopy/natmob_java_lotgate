import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventManager, AlertService, JhiLanguageService } from 'ng-jhipster';

import { ChemicalsNotes } from './chemicals-notes.model';
import { ChemicalsNotesPopupService } from './chemicals-notes-popup.service';
import { ChemicalsNotesService } from './chemicals-notes.service';

@Component({
    selector: 'jhi-chemicals-notes-dialog',
    templateUrl: './chemicals-notes-dialog.component.html'
})
export class ChemicalsNotesDialogComponent implements OnInit {

    chemicals: ChemicalsNotes;
    authorities: any[];
    isSaving: boolean;
    constructor(
        public activeModal: NgbActiveModal,
        private jhiLanguageService: JhiLanguageService,
        private alertService: AlertService,
        private chemicalsService: ChemicalsNotesService,
        private eventManager: EventManager
    ) {
        this.jhiLanguageService.setLocations(['chemicals']);
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
        if (this.chemicals.id !== undefined) {
            this.chemicalsService.update(this.chemicals)
                .subscribe((res: ChemicalsNotes) =>
                    this.onSaveSuccess(res), (res: Response) => this.onSaveError(res.json()));
        } else {
            this.chemicalsService.create(this.chemicals)
                .subscribe((res: ChemicalsNotes) =>
                    this.onSaveSuccess(res), (res: Response) => this.onSaveError(res.json()));
        }
    }

    private onSaveSuccess (result: ChemicalsNotes) {
        this.eventManager.broadcast({ name: 'chemicalsListModification', content: 'OK'});
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
    selector: 'jhi-chemicals-notes-popup',
    template: ''
})
export class ChemicalsNotesPopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor (
        private route: ActivatedRoute,
        private chemicalsPopupService: ChemicalsNotesPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            if ( params['id'] ) {
                this.modalRef = this.chemicalsPopupService
                    .open(ChemicalsNotesDialogComponent, params['id']);
            } else {
                this.modalRef = this.chemicalsPopupService
                    .open(ChemicalsNotesDialogComponent);
            }

        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}

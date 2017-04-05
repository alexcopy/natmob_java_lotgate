import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventManager, AlertService, JhiLanguageService } from 'ng-jhipster';

import { TankNotes } from './tank-notes.model';
import { TankNotesPopupService } from './tank-notes-popup.service';
import { TankNotesService } from './tank-notes.service';

@Component({
    selector: 'jhi-tank-notes-dialog',
    templateUrl: './tank-notes-dialog.component.html'
})
export class TankNotesDialogComponent implements OnInit {

    tank: TankNotes;
    authorities: any[];
    isSaving: boolean;
    constructor(
        public activeModal: NgbActiveModal,
        private jhiLanguageService: JhiLanguageService,
        private alertService: AlertService,
        private tankService: TankNotesService,
        private eventManager: EventManager
    ) {
        this.jhiLanguageService.setLocations(['tank', 'tankType']);
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
        if (this.tank.id !== undefined) {
            this.tankService.update(this.tank)
                .subscribe((res: TankNotes) =>
                    this.onSaveSuccess(res), (res: Response) => this.onSaveError(res.json()));
        } else {
            this.tankService.create(this.tank)
                .subscribe((res: TankNotes) =>
                    this.onSaveSuccess(res), (res: Response) => this.onSaveError(res.json()));
        }
    }

    private onSaveSuccess (result: TankNotes) {
        this.eventManager.broadcast({ name: 'tankListModification', content: 'OK'});
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
    selector: 'jhi-tank-notes-popup',
    template: ''
})
export class TankNotesPopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor (
        private route: ActivatedRoute,
        private tankPopupService: TankNotesPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            if ( params['id'] ) {
                this.modalRef = this.tankPopupService
                    .open(TankNotesDialogComponent, params['id']);
            } else {
                this.modalRef = this.tankPopupService
                    .open(TankNotesDialogComponent);
            }

        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}

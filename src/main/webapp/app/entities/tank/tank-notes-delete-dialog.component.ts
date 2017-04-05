import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventManager, JhiLanguageService } from 'ng-jhipster';

import { TankNotes } from './tank-notes.model';
import { TankNotesPopupService } from './tank-notes-popup.service';
import { TankNotesService } from './tank-notes.service';

@Component({
    selector: 'jhi-tank-notes-delete-dialog',
    templateUrl: './tank-notes-delete-dialog.component.html'
})
export class TankNotesDeleteDialogComponent {

    tank: TankNotes;

    constructor(
        private jhiLanguageService: JhiLanguageService,
        private tankService: TankNotesService,
        public activeModal: NgbActiveModal,
        private eventManager: EventManager
    ) {
        this.jhiLanguageService.setLocations(['tank', 'tankType']);
    }

    clear () {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete (id: number) {
        this.tankService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'tankListModification',
                content: 'Deleted an tank'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-tank-notes-delete-popup',
    template: ''
})
export class TankNotesDeletePopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor (
        private route: ActivatedRoute,
        private tankPopupService: TankNotesPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            this.modalRef = this.tankPopupService
                .open(TankNotesDeleteDialogComponent, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}

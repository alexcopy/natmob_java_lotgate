import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventManager, JhiLanguageService } from 'ng-jhipster';

import { WaterChangeNotes } from './water-change-notes.model';
import { WaterChangeNotesPopupService } from './water-change-notes-popup.service';
import { WaterChangeNotesService } from './water-change-notes.service';

@Component({
    selector: 'jhi-water-change-notes-delete-dialog',
    templateUrl: './water-change-notes-delete-dialog.component.html'
})
export class WaterChangeNotesDeleteDialogComponent {

    waterChange: WaterChangeNotes;

    constructor(
        private jhiLanguageService: JhiLanguageService,
        private waterChangeService: WaterChangeNotesService,
        public activeModal: NgbActiveModal,
        private eventManager: EventManager
    ) {
        this.jhiLanguageService.setLocations(['waterChange']);
    }

    clear () {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete (id: number) {
        this.waterChangeService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'waterChangeListModification',
                content: 'Deleted an waterChange'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-water-change-notes-delete-popup',
    template: ''
})
export class WaterChangeNotesDeletePopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor (
        private route: ActivatedRoute,
        private waterChangePopupService: WaterChangeNotesPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            this.modalRef = this.waterChangePopupService
                .open(WaterChangeNotesDeleteDialogComponent, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}

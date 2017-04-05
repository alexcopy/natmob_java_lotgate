import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventManager, JhiLanguageService } from 'ng-jhipster';

import { OtherWorksNotes } from './other-works-notes.model';
import { OtherWorksNotesPopupService } from './other-works-notes-popup.service';
import { OtherWorksNotesService } from './other-works-notes.service';

@Component({
    selector: 'jhi-other-works-notes-delete-dialog',
    templateUrl: './other-works-notes-delete-dialog.component.html'
})
export class OtherWorksNotesDeleteDialogComponent {

    otherWorks: OtherWorksNotes;

    constructor(
        private jhiLanguageService: JhiLanguageService,
        private otherWorksService: OtherWorksNotesService,
        public activeModal: NgbActiveModal,
        private eventManager: EventManager
    ) {
        this.jhiLanguageService.setLocations(['otherWorks']);
    }

    clear () {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete (id: number) {
        this.otherWorksService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'otherWorksListModification',
                content: 'Deleted an otherWorks'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-other-works-notes-delete-popup',
    template: ''
})
export class OtherWorksNotesDeletePopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor (
        private route: ActivatedRoute,
        private otherWorksPopupService: OtherWorksNotesPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            this.modalRef = this.otherWorksPopupService
                .open(OtherWorksNotesDeleteDialogComponent, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}

import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventManager, JhiLanguageService } from 'ng-jhipster';

import { DeviceNotes } from './device-notes.model';
import { DeviceNotesPopupService } from './device-notes-popup.service';
import { DeviceNotesService } from './device-notes.service';

@Component({
    selector: 'jhi-device-notes-delete-dialog',
    templateUrl: './device-notes-delete-dialog.component.html'
})
export class DeviceNotesDeleteDialogComponent {

    device: DeviceNotes;

    constructor(
        private jhiLanguageService: JhiLanguageService,
        private deviceService: DeviceNotesService,
        public activeModal: NgbActiveModal,
        private eventManager: EventManager
    ) {
        this.jhiLanguageService.setLocations(['device', 'deviceType']);
    }

    clear () {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete (id: number) {
        this.deviceService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'deviceListModification',
                content: 'Deleted an device'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-device-notes-delete-popup',
    template: ''
})
export class DeviceNotesDeletePopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor (
        private route: ActivatedRoute,
        private devicePopupService: DeviceNotesPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            this.modalRef = this.devicePopupService
                .open(DeviceNotesDeleteDialogComponent, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}

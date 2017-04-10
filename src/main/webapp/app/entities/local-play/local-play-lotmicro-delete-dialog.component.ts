import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventManager, JhiLanguageService } from 'ng-jhipster';

import { LocalPlayLotmicro } from './local-play-lotmicro.model';
import { LocalPlayLotmicroPopupService } from './local-play-lotmicro-popup.service';
import { LocalPlayLotmicroService } from './local-play-lotmicro.service';

@Component({
    selector: 'jhi-local-play-lotmicro-delete-dialog',
    templateUrl: './local-play-lotmicro-delete-dialog.component.html'
})
export class LocalPlayLotmicroDeleteDialogComponent {

    localPlay: LocalPlayLotmicro;

    constructor(
        private jhiLanguageService: JhiLanguageService,
        private localPlayService: LocalPlayLotmicroService,
        public activeModal: NgbActiveModal,
        private eventManager: EventManager
    ) {
        this.jhiLanguageService.setLocations(['localPlay', 'gamesPlay']);
    }

    clear () {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete (id: number) {
        this.localPlayService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'localPlayListModification',
                content: 'Deleted an localPlay'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-local-play-lotmicro-delete-popup',
    template: ''
})
export class LocalPlayLotmicroDeletePopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor (
        private route: ActivatedRoute,
        private localPlayPopupService: LocalPlayLotmicroPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            this.modalRef = this.localPlayPopupService
                .open(LocalPlayLotmicroDeleteDialogComponent, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}

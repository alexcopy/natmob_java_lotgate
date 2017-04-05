import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventManager, JhiLanguageService } from 'ng-jhipster';

import { RankLotmicro } from './rank-lotmicro.model';
import { RankLotmicroPopupService } from './rank-lotmicro-popup.service';
import { RankLotmicroService } from './rank-lotmicro.service';

@Component({
    selector: 'jhi-rank-lotmicro-delete-dialog',
    templateUrl: './rank-lotmicro-delete-dialog.component.html'
})
export class RankLotmicroDeleteDialogComponent {

    rank: RankLotmicro;

    constructor(
        private jhiLanguageService: JhiLanguageService,
        private rankService: RankLotmicroService,
        public activeModal: NgbActiveModal,
        private eventManager: EventManager
    ) {
        this.jhiLanguageService.setLocations(['rank']);
    }

    clear () {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete (id: number) {
        this.rankService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'rankListModification',
                content: 'Deleted an rank'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-rank-lotmicro-delete-popup',
    template: ''
})
export class RankLotmicroDeletePopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor (
        private route: ActivatedRoute,
        private rankPopupService: RankLotmicroPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            this.modalRef = this.rankPopupService
                .open(RankLotmicroDeleteDialogComponent, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}

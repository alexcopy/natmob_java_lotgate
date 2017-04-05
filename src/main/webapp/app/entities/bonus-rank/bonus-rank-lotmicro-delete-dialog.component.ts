import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventManager, JhiLanguageService } from 'ng-jhipster';

import { BonusRankLotmicro } from './bonus-rank-lotmicro.model';
import { BonusRankLotmicroPopupService } from './bonus-rank-lotmicro-popup.service';
import { BonusRankLotmicroService } from './bonus-rank-lotmicro.service';

@Component({
    selector: 'jhi-bonus-rank-lotmicro-delete-dialog',
    templateUrl: './bonus-rank-lotmicro-delete-dialog.component.html'
})
export class BonusRankLotmicroDeleteDialogComponent {

    bonusRank: BonusRankLotmicro;

    constructor(
        private jhiLanguageService: JhiLanguageService,
        private bonusRankService: BonusRankLotmicroService,
        public activeModal: NgbActiveModal,
        private eventManager: EventManager
    ) {
        this.jhiLanguageService.setLocations(['bonusRank']);
    }

    clear () {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete (id: number) {
        this.bonusRankService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'bonusRankListModification',
                content: 'Deleted an bonusRank'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-bonus-rank-lotmicro-delete-popup',
    template: ''
})
export class BonusRankLotmicroDeletePopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor (
        private route: ActivatedRoute,
        private bonusRankPopupService: BonusRankLotmicroPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            this.modalRef = this.bonusRankPopupService
                .open(BonusRankLotmicroDeleteDialogComponent, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}

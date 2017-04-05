import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventManager, AlertService, JhiLanguageService } from 'ng-jhipster';

import { BonusRankLotmicro } from './bonus-rank-lotmicro.model';
import { BonusRankLotmicroPopupService } from './bonus-rank-lotmicro-popup.service';
import { BonusRankLotmicroService } from './bonus-rank-lotmicro.service';

@Component({
    selector: 'jhi-bonus-rank-lotmicro-dialog',
    templateUrl: './bonus-rank-lotmicro-dialog.component.html'
})
export class BonusRankLotmicroDialogComponent implements OnInit {

    bonusRank: BonusRankLotmicro;
    authorities: any[];
    isSaving: boolean;
    constructor(
        public activeModal: NgbActiveModal,
        private jhiLanguageService: JhiLanguageService,
        private alertService: AlertService,
        private bonusRankService: BonusRankLotmicroService,
        private eventManager: EventManager
    ) {
        this.jhiLanguageService.setLocations(['bonusRank']);
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
        if (this.bonusRank.id !== undefined) {
            this.bonusRankService.update(this.bonusRank)
                .subscribe((res: BonusRankLotmicro) =>
                    this.onSaveSuccess(res), (res: Response) => this.onSaveError(res.json()));
        } else {
            this.bonusRankService.create(this.bonusRank)
                .subscribe((res: BonusRankLotmicro) =>
                    this.onSaveSuccess(res), (res: Response) => this.onSaveError(res.json()));
        }
    }

    private onSaveSuccess (result: BonusRankLotmicro) {
        this.eventManager.broadcast({ name: 'bonusRankListModification', content: 'OK'});
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
    selector: 'jhi-bonus-rank-lotmicro-popup',
    template: ''
})
export class BonusRankLotmicroPopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor (
        private route: ActivatedRoute,
        private bonusRankPopupService: BonusRankLotmicroPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            if ( params['id'] ) {
                this.modalRef = this.bonusRankPopupService
                    .open(BonusRankLotmicroDialogComponent, params['id']);
            } else {
                this.modalRef = this.bonusRankPopupService
                    .open(BonusRankLotmicroDialogComponent);
            }

        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}

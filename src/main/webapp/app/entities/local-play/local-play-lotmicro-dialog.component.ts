import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventManager, AlertService, JhiLanguageService } from 'ng-jhipster';

import { LocalPlayLotmicro } from './local-play-lotmicro.model';
import { LocalPlayLotmicroPopupService } from './local-play-lotmicro-popup.service';
import { LocalPlayLotmicroService } from './local-play-lotmicro.service';
import { RankLotmicro, RankLotmicroService } from '../rank';
import { BonusRankLotmicro, BonusRankLotmicroService } from '../bonus-rank';

@Component({
    selector: 'jhi-local-play-lotmicro-dialog',
    templateUrl: './local-play-lotmicro-dialog.component.html'
})
export class LocalPlayLotmicroDialogComponent implements OnInit {

    localPlay: LocalPlayLotmicro;
    authorities: any[];
    isSaving: boolean;

    ranks: RankLotmicro[];

    bonusranks: BonusRankLotmicro[];
    constructor(
        public activeModal: NgbActiveModal,
        private jhiLanguageService: JhiLanguageService,
        private alertService: AlertService,
        private localPlayService: LocalPlayLotmicroService,
        private rankService: RankLotmicroService,
        private bonusRankService: BonusRankLotmicroService,
        private eventManager: EventManager
    ) {
        this.jhiLanguageService.setLocations(['localPlay', 'gamesPlay']);
    }

    ngOnInit() {
        this.isSaving = false;
        this.authorities = ['ROLE_USER', 'ROLE_ADMIN'];
        this.rankService.query({filter: 'localplay-is-null'}).subscribe((res: Response) => {
            if (!this.localPlay.rankId) {
                this.ranks = res.json();
            } else {
                this.rankService.find(this.localPlay.rankId).subscribe((subRes: RankLotmicro) => {
                    this.ranks = [subRes].concat(res.json());
                }, (subRes: Response) => this.onError(subRes.json()));
            }
        }, (res: Response) => this.onError(res.json()));
        this.bonusRankService.query({filter: 'localplay-is-null'}).subscribe((res: Response) => {
            if (!this.localPlay.bonusrankId) {
                this.bonusranks = res.json();
            } else {
                this.bonusRankService.find(this.localPlay.bonusrankId).subscribe((subRes: BonusRankLotmicro) => {
                    this.bonusranks = [subRes].concat(res.json());
                }, (subRes: Response) => this.onError(subRes.json()));
            }
        }, (res: Response) => this.onError(res.json()));
    }
    clear () {
        this.activeModal.dismiss('cancel');
    }

    save () {
        this.isSaving = true;
        if (this.localPlay.id !== undefined) {
            this.localPlayService.update(this.localPlay)
                .subscribe((res: LocalPlayLotmicro) =>
                    this.onSaveSuccess(res), (res: Response) => this.onSaveError(res.json()));
        } else {
            this.localPlayService.create(this.localPlay)
                .subscribe((res: LocalPlayLotmicro) =>
                    this.onSaveSuccess(res), (res: Response) => this.onSaveError(res.json()));
        }
    }

    private onSaveSuccess (result: LocalPlayLotmicro) {
        this.eventManager.broadcast({ name: 'localPlayListModification', content: 'OK'});
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

    trackRankById(index: number, item: RankLotmicro) {
        return item.id;
    }

    trackBonusRankById(index: number, item: BonusRankLotmicro) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-local-play-lotmicro-popup',
    template: ''
})
export class LocalPlayLotmicroPopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor (
        private route: ActivatedRoute,
        private localPlayPopupService: LocalPlayLotmicroPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            if ( params['id'] ) {
                this.modalRef = this.localPlayPopupService
                    .open(LocalPlayLotmicroDialogComponent, params['id']);
            } else {
                this.modalRef = this.localPlayPopupService
                    .open(LocalPlayLotmicroDialogComponent);
            }

        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}

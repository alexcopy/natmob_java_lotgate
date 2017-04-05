import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventManager, AlertService, JhiLanguageService } from 'ng-jhipster';

import { RankLotmicro } from './rank-lotmicro.model';
import { RankLotmicroPopupService } from './rank-lotmicro-popup.service';
import { RankLotmicroService } from './rank-lotmicro.service';

@Component({
    selector: 'jhi-rank-lotmicro-dialog',
    templateUrl: './rank-lotmicro-dialog.component.html'
})
export class RankLotmicroDialogComponent implements OnInit {

    rank: RankLotmicro;
    authorities: any[];
    isSaving: boolean;
    constructor(
        public activeModal: NgbActiveModal,
        private jhiLanguageService: JhiLanguageService,
        private alertService: AlertService,
        private rankService: RankLotmicroService,
        private eventManager: EventManager
    ) {
        this.jhiLanguageService.setLocations(['rank']);
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
        if (this.rank.id !== undefined) {
            this.rankService.update(this.rank)
                .subscribe((res: RankLotmicro) =>
                    this.onSaveSuccess(res), (res: Response) => this.onSaveError(res.json()));
        } else {
            this.rankService.create(this.rank)
                .subscribe((res: RankLotmicro) =>
                    this.onSaveSuccess(res), (res: Response) => this.onSaveError(res.json()));
        }
    }

    private onSaveSuccess (result: RankLotmicro) {
        this.eventManager.broadcast({ name: 'rankListModification', content: 'OK'});
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
    selector: 'jhi-rank-lotmicro-popup',
    template: ''
})
export class RankLotmicroPopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor (
        private route: ActivatedRoute,
        private rankPopupService: RankLotmicroPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            if ( params['id'] ) {
                this.modalRef = this.rankPopupService
                    .open(RankLotmicroDialogComponent, params['id']);
            } else {
                this.modalRef = this.rankPopupService
                    .open(RankLotmicroDialogComponent);
            }

        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}

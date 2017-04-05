import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventManager, AlertService, JhiLanguageService } from 'ng-jhipster';

import { GameRuleLotmicro } from './game-rule-lotmicro.model';
import { GameRuleLotmicroPopupService } from './game-rule-lotmicro-popup.service';
import { GameRuleLotmicroService } from './game-rule-lotmicro.service';

@Component({
    selector: 'jhi-game-rule-lotmicro-dialog',
    templateUrl: './game-rule-lotmicro-dialog.component.html'
})
export class GameRuleLotmicroDialogComponent implements OnInit {

    gameRule: GameRuleLotmicro;
    authorities: any[];
    isSaving: boolean;
    constructor(
        public activeModal: NgbActiveModal,
        private jhiLanguageService: JhiLanguageService,
        private alertService: AlertService,
        private gameRuleService: GameRuleLotmicroService,
        private eventManager: EventManager
    ) {
        this.jhiLanguageService.setLocations(['gameRule']);
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
        if (this.gameRule.id !== undefined) {
            this.gameRuleService.update(this.gameRule)
                .subscribe((res: GameRuleLotmicro) =>
                    this.onSaveSuccess(res), (res: Response) => this.onSaveError(res.json()));
        } else {
            this.gameRuleService.create(this.gameRule)
                .subscribe((res: GameRuleLotmicro) =>
                    this.onSaveSuccess(res), (res: Response) => this.onSaveError(res.json()));
        }
    }

    private onSaveSuccess (result: GameRuleLotmicro) {
        this.eventManager.broadcast({ name: 'gameRuleListModification', content: 'OK'});
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
    selector: 'jhi-game-rule-lotmicro-popup',
    template: ''
})
export class GameRuleLotmicroPopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor (
        private route: ActivatedRoute,
        private gameRulePopupService: GameRuleLotmicroPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            if ( params['id'] ) {
                this.modalRef = this.gameRulePopupService
                    .open(GameRuleLotmicroDialogComponent, params['id']);
            } else {
                this.modalRef = this.gameRulePopupService
                    .open(GameRuleLotmicroDialogComponent);
            }

        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}

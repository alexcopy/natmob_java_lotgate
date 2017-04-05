import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventManager, AlertService, JhiLanguageService } from 'ng-jhipster';

import { GameLotmicro } from './game-lotmicro.model';
import { GameLotmicroPopupService } from './game-lotmicro-popup.service';
import { GameLotmicroService } from './game-lotmicro.service';

@Component({
    selector: 'jhi-game-lotmicro-dialog',
    templateUrl: './game-lotmicro-dialog.component.html'
})
export class GameLotmicroDialogComponent implements OnInit {

    game: GameLotmicro;
    authorities: any[];
    isSaving: boolean;
    constructor(
        public activeModal: NgbActiveModal,
        private jhiLanguageService: JhiLanguageService,
        private alertService: AlertService,
        private gameService: GameLotmicroService,
        private eventManager: EventManager
    ) {
        this.jhiLanguageService.setLocations(['game', 'gamesPlay']);
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
        if (this.game.id !== undefined) {
            this.gameService.update(this.game)
                .subscribe((res: GameLotmicro) =>
                    this.onSaveSuccess(res), (res: Response) => this.onSaveError(res.json()));
        } else {
            this.gameService.create(this.game)
                .subscribe((res: GameLotmicro) =>
                    this.onSaveSuccess(res), (res: Response) => this.onSaveError(res.json()));
        }
    }

    private onSaveSuccess (result: GameLotmicro) {
        this.eventManager.broadcast({ name: 'gameListModification', content: 'OK'});
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
    selector: 'jhi-game-lotmicro-popup',
    template: ''
})
export class GameLotmicroPopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor (
        private route: ActivatedRoute,
        private gamePopupService: GameLotmicroPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            if ( params['id'] ) {
                this.modalRef = this.gamePopupService
                    .open(GameLotmicroDialogComponent, params['id']);
            } else {
                this.modalRef = this.gamePopupService
                    .open(GameLotmicroDialogComponent);
            }

        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}

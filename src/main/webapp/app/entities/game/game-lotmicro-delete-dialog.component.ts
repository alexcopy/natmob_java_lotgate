import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventManager, JhiLanguageService } from 'ng-jhipster';

import { GameLotmicro } from './game-lotmicro.model';
import { GameLotmicroPopupService } from './game-lotmicro-popup.service';
import { GameLotmicroService } from './game-lotmicro.service';

@Component({
    selector: 'jhi-game-lotmicro-delete-dialog',
    templateUrl: './game-lotmicro-delete-dialog.component.html'
})
export class GameLotmicroDeleteDialogComponent {

    game: GameLotmicro;

    constructor(
        private jhiLanguageService: JhiLanguageService,
        private gameService: GameLotmicroService,
        public activeModal: NgbActiveModal,
        private eventManager: EventManager
    ) {
        this.jhiLanguageService.setLocations(['game', 'gamesPlay']);
    }

    clear () {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete (id: number) {
        this.gameService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'gameListModification',
                content: 'Deleted an game'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-game-lotmicro-delete-popup',
    template: ''
})
export class GameLotmicroDeletePopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor (
        private route: ActivatedRoute,
        private gamePopupService: GameLotmicroPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            this.modalRef = this.gamePopupService
                .open(GameLotmicroDeleteDialogComponent, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}

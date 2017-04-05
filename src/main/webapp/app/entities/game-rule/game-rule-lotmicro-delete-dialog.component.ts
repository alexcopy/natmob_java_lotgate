import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventManager, JhiLanguageService } from 'ng-jhipster';

import { GameRuleLotmicro } from './game-rule-lotmicro.model';
import { GameRuleLotmicroPopupService } from './game-rule-lotmicro-popup.service';
import { GameRuleLotmicroService } from './game-rule-lotmicro.service';

@Component({
    selector: 'jhi-game-rule-lotmicro-delete-dialog',
    templateUrl: './game-rule-lotmicro-delete-dialog.component.html'
})
export class GameRuleLotmicroDeleteDialogComponent {

    gameRule: GameRuleLotmicro;

    constructor(
        private jhiLanguageService: JhiLanguageService,
        private gameRuleService: GameRuleLotmicroService,
        public activeModal: NgbActiveModal,
        private eventManager: EventManager
    ) {
        this.jhiLanguageService.setLocations(['gameRule']);
    }

    clear () {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete (id: number) {
        this.gameRuleService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'gameRuleListModification',
                content: 'Deleted an gameRule'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-game-rule-lotmicro-delete-popup',
    template: ''
})
export class GameRuleLotmicroDeletePopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor (
        private route: ActivatedRoute,
        private gameRulePopupService: GameRuleLotmicroPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            this.modalRef = this.gameRulePopupService
                .open(GameRuleLotmicroDeleteDialogComponent, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}

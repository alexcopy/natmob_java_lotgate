import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { GameRuleLotmicro } from './game-rule-lotmicro.model';
import { GameRuleLotmicroService } from './game-rule-lotmicro.service';
@Injectable()
export class GameRuleLotmicroPopupService {
    private isOpen = false;
    constructor (
        private modalService: NgbModal,
        private router: Router,
        private gameRuleService: GameRuleLotmicroService

    ) {}

    open (component: Component, id?: number | any): NgbModalRef {
        if (this.isOpen) {
            return;
        }
        this.isOpen = true;

        if (id) {
            this.gameRuleService.find(id).subscribe(gameRule => {
                this.gameRuleModalRef(component, gameRule);
            });
        } else {
            return this.gameRuleModalRef(component, new GameRuleLotmicro());
        }
    }

    gameRuleModalRef(component: Component, gameRule: GameRuleLotmicro): NgbModalRef {
        let modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.gameRule = gameRule;
        modalRef.result.then(result => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true });
            this.isOpen = false;
        }, (reason) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true });
            this.isOpen = false;
        });
        return modalRef;
    }
}

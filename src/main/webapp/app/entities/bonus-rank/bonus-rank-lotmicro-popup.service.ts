import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { BonusRankLotmicro } from './bonus-rank-lotmicro.model';
import { BonusRankLotmicroService } from './bonus-rank-lotmicro.service';
@Injectable()
export class BonusRankLotmicroPopupService {
    private isOpen = false;
    constructor (
        private modalService: NgbModal,
        private router: Router,
        private bonusRankService: BonusRankLotmicroService

    ) {}

    open (component: Component, id?: number | any): NgbModalRef {
        if (this.isOpen) {
            return;
        }
        this.isOpen = true;

        if (id) {
            this.bonusRankService.find(id).subscribe(bonusRank => {
                this.bonusRankModalRef(component, bonusRank);
            });
        } else {
            return this.bonusRankModalRef(component, new BonusRankLotmicro());
        }
    }

    bonusRankModalRef(component: Component, bonusRank: BonusRankLotmicro): NgbModalRef {
        let modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.bonusRank = bonusRank;
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

import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { LocalPlayLotmicro } from './local-play-lotmicro.model';
import { LocalPlayLotmicroService } from './local-play-lotmicro.service';
@Injectable()
export class LocalPlayLotmicroPopupService {
    private isOpen = false;
    constructor (
        private modalService: NgbModal,
        private router: Router,
        private localPlayService: LocalPlayLotmicroService

    ) {}

    open (component: Component, id?: number | any): NgbModalRef {
        if (this.isOpen) {
            return;
        }
        this.isOpen = true;

        if (id) {
            this.localPlayService.find(id).subscribe(localPlay => {
                if (localPlay.drawDate) {
                    localPlay.drawDate = {
                        year: localPlay.drawDate.getFullYear(),
                        month: localPlay.drawDate.getMonth() + 1,
                        day: localPlay.drawDate.getDate()
                    };
                }
                this.localPlayModalRef(component, localPlay);
            });
        } else {
            return this.localPlayModalRef(component, new LocalPlayLotmicro());
        }
    }

    localPlayModalRef(component: Component, localPlay: LocalPlayLotmicro): NgbModalRef {
        let modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.localPlay = localPlay;
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

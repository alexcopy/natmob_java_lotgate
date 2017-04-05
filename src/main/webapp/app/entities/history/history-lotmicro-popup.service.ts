import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HistoryLotmicro } from './history-lotmicro.model';
import { HistoryLotmicroService } from './history-lotmicro.service';
@Injectable()
export class HistoryLotmicroPopupService {
    private isOpen = false;
    constructor (
        private modalService: NgbModal,
        private router: Router,
        private historyService: HistoryLotmicroService

    ) {}

    open (component: Component, id?: number | any): NgbModalRef {
        if (this.isOpen) {
            return;
        }
        this.isOpen = true;

        if (id) {
            this.historyService.find(id).subscribe(history => {
                if (history.drawDate) {
                    history.drawDate = {
                        year: history.drawDate.getFullYear(),
                        month: history.drawDate.getMonth() + 1,
                        day: history.drawDate.getDate()
                    };
                }
                this.historyModalRef(component, history);
            });
        } else {
            return this.historyModalRef(component, new HistoryLotmicro());
        }
    }

    historyModalRef(component: Component, history: HistoryLotmicro): NgbModalRef {
        let modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.history = history;
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

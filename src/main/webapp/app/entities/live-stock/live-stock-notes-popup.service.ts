import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { LiveStockNotes } from './live-stock-notes.model';
import { LiveStockNotesService } from './live-stock-notes.service';
@Injectable()
export class LiveStockNotesPopupService {
    private isOpen = false;
    constructor (
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private liveStockService: LiveStockNotesService

    ) {}

    open (component: Component, id?: number | any): NgbModalRef {
        if (this.isOpen) {
            return;
        }
        this.isOpen = true;

        if (id) {
            this.liveStockService.find(id).subscribe(liveStock => {
                liveStock.date = this.datePipe
                    .transform(liveStock.date, 'yyyy-MM-ddThh:mm');
                this.liveStockModalRef(component, liveStock);
            });
        } else {
            return this.liveStockModalRef(component, new LiveStockNotes());
        }
    }

    liveStockModalRef(component: Component, liveStock: LiveStockNotes): NgbModalRef {
        let modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.liveStock = liveStock;
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

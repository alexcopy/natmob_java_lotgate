import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { WaterChangeNotes } from './water-change-notes.model';
import { WaterChangeNotesService } from './water-change-notes.service';
@Injectable()
export class WaterChangeNotesPopupService {
    private isOpen = false;
    constructor (
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private waterChangeService: WaterChangeNotesService

    ) {}

    open (component: Component, id?: number | any): NgbModalRef {
        if (this.isOpen) {
            return;
        }
        this.isOpen = true;

        if (id) {
            this.waterChangeService.find(id).subscribe(waterChange => {
                waterChange.changeDate = this.datePipe
                    .transform(waterChange.changeDate, 'yyyy-MM-ddThh:mm');
                this.waterChangeModalRef(component, waterChange);
            });
        } else {
            return this.waterChangeModalRef(component, new WaterChangeNotes());
        }
    }

    waterChangeModalRef(component: Component, waterChange: WaterChangeNotes): NgbModalRef {
        let modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.waterChange = waterChange;
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

import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { OtherWorksNotes } from './other-works-notes.model';
import { OtherWorksNotesService } from './other-works-notes.service';
@Injectable()
export class OtherWorksNotesPopupService {
    private isOpen = false;
    constructor (
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private otherWorksService: OtherWorksNotesService

    ) {}

    open (component: Component, id?: number | any): NgbModalRef {
        if (this.isOpen) {
            return;
        }
        this.isOpen = true;

        if (id) {
            this.otherWorksService.find(id).subscribe(otherWorks => {
                otherWorks.date = this.datePipe
                    .transform(otherWorks.date, 'yyyy-MM-ddThh:mm');
                this.otherWorksModalRef(component, otherWorks);
            });
        } else {
            return this.otherWorksModalRef(component, new OtherWorksNotes());
        }
    }

    otherWorksModalRef(component: Component, otherWorks: OtherWorksNotes): NgbModalRef {
        let modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.otherWorks = otherWorks;
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

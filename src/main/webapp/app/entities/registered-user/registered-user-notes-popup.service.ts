import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { RegisteredUserNotes } from './registered-user-notes.model';
import { RegisteredUserNotesService } from './registered-user-notes.service';
@Injectable()
export class RegisteredUserNotesPopupService {
    private isOpen = false;
    constructor (
        private modalService: NgbModal,
        private router: Router,
        private registeredUserService: RegisteredUserNotesService

    ) {}

    open (component: Component, id?: number | any): NgbModalRef {
        if (this.isOpen) {
            return;
        }
        this.isOpen = true;

        if (id) {
            this.registeredUserService.find(id).subscribe(registeredUser => {
                this.registeredUserModalRef(component, registeredUser);
            });
        } else {
            return this.registeredUserModalRef(component, new RegisteredUserNotes());
        }
    }

    registeredUserModalRef(component: Component, registeredUser: RegisteredUserNotes): NgbModalRef {
        let modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.registeredUser = registeredUser;
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

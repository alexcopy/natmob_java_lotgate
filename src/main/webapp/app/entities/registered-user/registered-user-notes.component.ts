import { Component, OnInit, OnDestroy } from '@angular/core';
import { Response } from '@angular/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { EventManager, ParseLinks, PaginationUtil, JhiLanguageService, AlertService } from 'ng-jhipster';

import { RegisteredUserNotes } from './registered-user-notes.model';
import { RegisteredUserNotesService } from './registered-user-notes.service';
import { ITEMS_PER_PAGE, Principal } from '../../shared';
import { PaginationConfig } from '../../blocks/config/uib-pagination.config';

@Component({
    selector: 'jhi-registered-user-notes',
    templateUrl: './registered-user-notes.component.html'
})
export class RegisteredUserNotesComponent implements OnInit, OnDestroy {
registeredUsers: RegisteredUserNotes[];
    currentAccount: any;
    eventSubscriber: Subscription;
    currentSearch: string;

    constructor(
        private jhiLanguageService: JhiLanguageService,
        private registeredUserService: RegisteredUserNotesService,
        private alertService: AlertService,
        private eventManager: EventManager,
        private activatedRoute: ActivatedRoute,
        private principal: Principal
    ) {
        this.currentSearch = activatedRoute.snapshot.params['search'] ? activatedRoute.snapshot.params['search'] : '';
        this.jhiLanguageService.setLocations(['registeredUser']);
    }

    loadAll() {
        if (this.currentSearch) {
            this.registeredUserService.search({
                query: this.currentSearch,
                }).subscribe(
                    (res: Response) => this.registeredUsers = res.json(),
                    (res: Response) => this.onError(res.json())
                );
            return;
       }
        this.registeredUserService.query().subscribe(
            (res: Response) => {
                this.registeredUsers = res.json();
                this.currentSearch = '';
            },
            (res: Response) => this.onError(res.json())
        );
    }

    search (query) {
        if (!query) {
            return this.clear();
        }
        this.currentSearch = query;
        this.loadAll();
    }

    clear() {
        this.currentSearch = '';
        this.loadAll();
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInRegisteredUsers();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId (index: number, item: RegisteredUserNotes) {
        return item.id;
    }



    registerChangeInRegisteredUsers() {
        this.eventSubscriber = this.eventManager.subscribe('registeredUserListModification', (response) => this.loadAll());
    }


    private onError (error) {
        this.alertService.error(error.message, null, null);
    }
}

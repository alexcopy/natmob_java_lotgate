import { Component, OnInit, OnDestroy } from '@angular/core';
import { Response } from '@angular/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { EventManager, ParseLinks, PaginationUtil, JhiLanguageService, AlertService } from 'ng-jhipster';

import { OtherWorksNotes } from './other-works-notes.model';
import { OtherWorksNotesService } from './other-works-notes.service';
import { ITEMS_PER_PAGE, Principal } from '../../shared';
import { PaginationConfig } from '../../blocks/config/uib-pagination.config';

@Component({
    selector: 'jhi-other-works-notes',
    templateUrl: './other-works-notes.component.html'
})
export class OtherWorksNotesComponent implements OnInit, OnDestroy {
otherWorks: OtherWorksNotes[];
    currentAccount: any;
    eventSubscriber: Subscription;
    currentSearch: string;

    constructor(
        private jhiLanguageService: JhiLanguageService,
        private otherWorksService: OtherWorksNotesService,
        private alertService: AlertService,
        private eventManager: EventManager,
        private activatedRoute: ActivatedRoute,
        private principal: Principal
    ) {
        this.currentSearch = activatedRoute.snapshot.params['search'] ? activatedRoute.snapshot.params['search'] : '';
        this.jhiLanguageService.setLocations(['otherWorks']);
    }

    loadAll() {
        if (this.currentSearch) {
            this.otherWorksService.search({
                query: this.currentSearch,
                }).subscribe(
                    (res: Response) => this.otherWorks = res.json(),
                    (res: Response) => this.onError(res.json())
                );
            return;
       }
        this.otherWorksService.query().subscribe(
            (res: Response) => {
                this.otherWorks = res.json();
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
        this.registerChangeInOtherWorks();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId (index: number, item: OtherWorksNotes) {
        return item.id;
    }



    registerChangeInOtherWorks() {
        this.eventSubscriber = this.eventManager.subscribe('otherWorksListModification', (response) => this.loadAll());
    }


    private onError (error) {
        this.alertService.error(error.message, null, null);
    }
}

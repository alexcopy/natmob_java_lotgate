import { Component, OnInit, OnDestroy } from '@angular/core';
import { Response } from '@angular/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { EventManager, ParseLinks, PaginationUtil, JhiLanguageService, AlertService } from 'ng-jhipster';

import { WaterChangeNotes } from './water-change-notes.model';
import { WaterChangeNotesService } from './water-change-notes.service';
import { ITEMS_PER_PAGE, Principal } from '../../shared';
import { PaginationConfig } from '../../blocks/config/uib-pagination.config';

@Component({
    selector: 'jhi-water-change-notes',
    templateUrl: './water-change-notes.component.html'
})
export class WaterChangeNotesComponent implements OnInit, OnDestroy {
waterChanges: WaterChangeNotes[];
    currentAccount: any;
    eventSubscriber: Subscription;
    currentSearch: string;

    constructor(
        private jhiLanguageService: JhiLanguageService,
        private waterChangeService: WaterChangeNotesService,
        private alertService: AlertService,
        private eventManager: EventManager,
        private activatedRoute: ActivatedRoute,
        private principal: Principal
    ) {
        this.currentSearch = activatedRoute.snapshot.params['search'] ? activatedRoute.snapshot.params['search'] : '';
        this.jhiLanguageService.setLocations(['waterChange']);
    }

    loadAll() {
        if (this.currentSearch) {
            this.waterChangeService.search({
                query: this.currentSearch,
                }).subscribe(
                    (res: Response) => this.waterChanges = res.json(),
                    (res: Response) => this.onError(res.json())
                );
            return;
       }
        this.waterChangeService.query().subscribe(
            (res: Response) => {
                this.waterChanges = res.json();
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
        this.registerChangeInWaterChanges();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId (index: number, item: WaterChangeNotes) {
        return item.id;
    }



    registerChangeInWaterChanges() {
        this.eventSubscriber = this.eventManager.subscribe('waterChangeListModification', (response) => this.loadAll());
    }


    private onError (error) {
        this.alertService.error(error.message, null, null);
    }
}

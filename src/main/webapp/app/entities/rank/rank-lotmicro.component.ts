import { Component, OnInit, OnDestroy } from '@angular/core';
import { Response } from '@angular/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { EventManager, ParseLinks, PaginationUtil, JhiLanguageService, AlertService } from 'ng-jhipster';

import { RankLotmicro } from './rank-lotmicro.model';
import { RankLotmicroService } from './rank-lotmicro.service';
import { ITEMS_PER_PAGE, Principal } from '../../shared';
import { PaginationConfig } from '../../blocks/config/uib-pagination.config';

@Component({
    selector: 'jhi-rank-lotmicro',
    templateUrl: './rank-lotmicro.component.html'
})
export class RankLotmicroComponent implements OnInit, OnDestroy {
ranks: RankLotmicro[];
    currentAccount: any;
    eventSubscriber: Subscription;
    currentSearch: string;

    constructor(
        private jhiLanguageService: JhiLanguageService,
        private rankService: RankLotmicroService,
        private alertService: AlertService,
        private eventManager: EventManager,
        private activatedRoute: ActivatedRoute,
        private principal: Principal
    ) {
        this.currentSearch = activatedRoute.snapshot.params['search'] ? activatedRoute.snapshot.params['search'] : '';
        this.jhiLanguageService.setLocations(['rank']);
    }

    loadAll() {
        if (this.currentSearch) {
            this.rankService.search({
                query: this.currentSearch,
                }).subscribe(
                    (res: Response) => this.ranks = res.json(),
                    (res: Response) => this.onError(res.json())
                );
            return;
       }
        this.rankService.query().subscribe(
            (res: Response) => {
                this.ranks = res.json();
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
        this.registerChangeInRanks();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId (index: number, item: RankLotmicro) {
        return item.id;
    }



    registerChangeInRanks() {
        this.eventSubscriber = this.eventManager.subscribe('rankListModification', (response) => this.loadAll());
    }


    private onError (error) {
        this.alertService.error(error.message, null, null);
    }
}

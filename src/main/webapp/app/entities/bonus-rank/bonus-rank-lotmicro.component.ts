import { Component, OnInit, OnDestroy } from '@angular/core';
import { Response } from '@angular/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { EventManager, ParseLinks, PaginationUtil, JhiLanguageService, AlertService } from 'ng-jhipster';

import { BonusRankLotmicro } from './bonus-rank-lotmicro.model';
import { BonusRankLotmicroService } from './bonus-rank-lotmicro.service';
import { ITEMS_PER_PAGE, Principal } from '../../shared';
import { PaginationConfig } from '../../blocks/config/uib-pagination.config';

@Component({
    selector: 'jhi-bonus-rank-lotmicro',
    templateUrl: './bonus-rank-lotmicro.component.html'
})
export class BonusRankLotmicroComponent implements OnInit, OnDestroy {
bonusRanks: BonusRankLotmicro[];
    currentAccount: any;
    eventSubscriber: Subscription;
    currentSearch: string;

    constructor(
        private jhiLanguageService: JhiLanguageService,
        private bonusRankService: BonusRankLotmicroService,
        private alertService: AlertService,
        private eventManager: EventManager,
        private activatedRoute: ActivatedRoute,
        private principal: Principal
    ) {
        this.currentSearch = activatedRoute.snapshot.params['search'] ? activatedRoute.snapshot.params['search'] : '';
        this.jhiLanguageService.setLocations(['bonusRank']);
    }

    loadAll() {
        if (this.currentSearch) {
            this.bonusRankService.search({
                query: this.currentSearch,
                }).subscribe(
                    (res: Response) => this.bonusRanks = res.json(),
                    (res: Response) => this.onError(res.json())
                );
            return;
       }
        this.bonusRankService.query().subscribe(
            (res: Response) => {
                this.bonusRanks = res.json();
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
        this.registerChangeInBonusRanks();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId (index: number, item: BonusRankLotmicro) {
        return item.id;
    }



    registerChangeInBonusRanks() {
        this.eventSubscriber = this.eventManager.subscribe('bonusRankListModification', (response) => this.loadAll());
    }


    private onError (error) {
        this.alertService.error(error.message, null, null);
    }
}

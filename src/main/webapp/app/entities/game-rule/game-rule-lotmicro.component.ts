import { Component, OnInit, OnDestroy } from '@angular/core';
import { Response } from '@angular/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { EventManager, ParseLinks, PaginationUtil, JhiLanguageService, AlertService } from 'ng-jhipster';

import { GameRuleLotmicro } from './game-rule-lotmicro.model';
import { GameRuleLotmicroService } from './game-rule-lotmicro.service';
import { ITEMS_PER_PAGE, Principal } from '../../shared';
import { PaginationConfig } from '../../blocks/config/uib-pagination.config';

@Component({
    selector: 'jhi-game-rule-lotmicro',
    templateUrl: './game-rule-lotmicro.component.html'
})
export class GameRuleLotmicroComponent implements OnInit, OnDestroy {
gameRules: GameRuleLotmicro[];
    currentAccount: any;
    eventSubscriber: Subscription;
    currentSearch: string;

    constructor(
        private jhiLanguageService: JhiLanguageService,
        private gameRuleService: GameRuleLotmicroService,
        private alertService: AlertService,
        private eventManager: EventManager,
        private activatedRoute: ActivatedRoute,
        private principal: Principal
    ) {
        this.currentSearch = activatedRoute.snapshot.params['search'] ? activatedRoute.snapshot.params['search'] : '';
        this.jhiLanguageService.setLocations(['gameRule']);
    }

    loadAll() {
        if (this.currentSearch) {
            this.gameRuleService.search({
                query: this.currentSearch,
                }).subscribe(
                    (res: Response) => this.gameRules = res.json(),
                    (res: Response) => this.onError(res.json())
                );
            return;
       }
        this.gameRuleService.query().subscribe(
            (res: Response) => {
                this.gameRules = res.json();
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
        this.registerChangeInGameRules();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId (index: number, item: GameRuleLotmicro) {
        return item.id;
    }



    registerChangeInGameRules() {
        this.eventSubscriber = this.eventManager.subscribe('gameRuleListModification', (response) => this.loadAll());
    }


    private onError (error) {
        this.alertService.error(error.message, null, null);
    }
}

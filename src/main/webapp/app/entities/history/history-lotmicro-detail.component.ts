import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { HistoryLotmicro } from './history-lotmicro.model';
import { HistoryLotmicroService } from './history-lotmicro.service';

@Component({
    selector: 'jhi-history-lotmicro-detail',
    templateUrl: './history-lotmicro-detail.component.html'
})
export class HistoryLotmicroDetailComponent implements OnInit, OnDestroy {

    history: HistoryLotmicro;
    private subscription: any;

    constructor(
        private jhiLanguageService: JhiLanguageService,
        private historyService: HistoryLotmicroService,
        private route: ActivatedRoute
    ) {
        this.jhiLanguageService.setLocations(['history', 'gamesPlay']);
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe(params => {
            this.load(params['id']);
        });
    }

    load (id) {
        this.historyService.find(id).subscribe(history => {
            this.history = history;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

}

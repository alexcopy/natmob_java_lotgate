import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { BonusRankLotmicro } from './bonus-rank-lotmicro.model';
import { BonusRankLotmicroService } from './bonus-rank-lotmicro.service';

@Component({
    selector: 'jhi-bonus-rank-lotmicro-detail',
    templateUrl: './bonus-rank-lotmicro-detail.component.html'
})
export class BonusRankLotmicroDetailComponent implements OnInit, OnDestroy {

    bonusRank: BonusRankLotmicro;
    private subscription: any;

    constructor(
        private jhiLanguageService: JhiLanguageService,
        private bonusRankService: BonusRankLotmicroService,
        private route: ActivatedRoute
    ) {
        this.jhiLanguageService.setLocations(['bonusRank']);
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe(params => {
            this.load(params['id']);
        });
    }

    load (id) {
        this.bonusRankService.find(id).subscribe(bonusRank => {
            this.bonusRank = bonusRank;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

}

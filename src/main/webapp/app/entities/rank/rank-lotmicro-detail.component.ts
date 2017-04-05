import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { RankLotmicro } from './rank-lotmicro.model';
import { RankLotmicroService } from './rank-lotmicro.service';

@Component({
    selector: 'jhi-rank-lotmicro-detail',
    templateUrl: './rank-lotmicro-detail.component.html'
})
export class RankLotmicroDetailComponent implements OnInit, OnDestroy {

    rank: RankLotmicro;
    private subscription: any;

    constructor(
        private jhiLanguageService: JhiLanguageService,
        private rankService: RankLotmicroService,
        private route: ActivatedRoute
    ) {
        this.jhiLanguageService.setLocations(['rank']);
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe(params => {
            this.load(params['id']);
        });
    }

    load (id) {
        this.rankService.find(id).subscribe(rank => {
            this.rank = rank;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

}

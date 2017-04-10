import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { LocalPlayLotmicro } from './local-play-lotmicro.model';
import { LocalPlayLotmicroService } from './local-play-lotmicro.service';

@Component({
    selector: 'jhi-local-play-lotmicro-detail',
    templateUrl: './local-play-lotmicro-detail.component.html'
})
export class LocalPlayLotmicroDetailComponent implements OnInit, OnDestroy {

    localPlay: LocalPlayLotmicro;
    private subscription: any;

    constructor(
        private jhiLanguageService: JhiLanguageService,
        private localPlayService: LocalPlayLotmicroService,
        private route: ActivatedRoute
    ) {
        this.jhiLanguageService.setLocations(['localPlay', 'gamesPlay']);
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe(params => {
            this.load(params['id']);
        });
    }

    load (id) {
        this.localPlayService.find(id).subscribe(localPlay => {
            this.localPlay = localPlay;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

}

import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { GameRuleLotmicro } from './game-rule-lotmicro.model';
import { GameRuleLotmicroService } from './game-rule-lotmicro.service';

@Component({
    selector: 'jhi-game-rule-lotmicro-detail',
    templateUrl: './game-rule-lotmicro-detail.component.html'
})
export class GameRuleLotmicroDetailComponent implements OnInit, OnDestroy {

    gameRule: GameRuleLotmicro;
    private subscription: any;

    constructor(
        private jhiLanguageService: JhiLanguageService,
        private gameRuleService: GameRuleLotmicroService,
        private route: ActivatedRoute
    ) {
        this.jhiLanguageService.setLocations(['gameRule']);
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe(params => {
            this.load(params['id']);
        });
    }

    load (id) {
        this.gameRuleService.find(id).subscribe(gameRule => {
            this.gameRule = gameRule;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

}

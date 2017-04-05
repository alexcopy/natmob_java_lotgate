import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { GameLotmicro } from './game-lotmicro.model';
import { GameLotmicroService } from './game-lotmicro.service';

@Component({
    selector: 'jhi-game-lotmicro-detail',
    templateUrl: './game-lotmicro-detail.component.html'
})
export class GameLotmicroDetailComponent implements OnInit, OnDestroy {

    game: GameLotmicro;
    private subscription: any;

    constructor(
        private jhiLanguageService: JhiLanguageService,
        private gameService: GameLotmicroService,
        private route: ActivatedRoute
    ) {
        this.jhiLanguageService.setLocations(['game', 'gamesPlay']);
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe(params => {
            this.load(params['id']);
        });
    }

    load (id) {
        this.gameService.find(id).subscribe(game => {
            this.game = game;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

}

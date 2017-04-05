import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { LiveStockNotes } from './live-stock-notes.model';
import { LiveStockNotesService } from './live-stock-notes.service';

@Component({
    selector: 'jhi-live-stock-notes-detail',
    templateUrl: './live-stock-notes-detail.component.html'
})
export class LiveStockNotesDetailComponent implements OnInit, OnDestroy {

    liveStock: LiveStockNotes;
    private subscription: any;

    constructor(
        private jhiLanguageService: JhiLanguageService,
        private liveStockService: LiveStockNotesService,
        private route: ActivatedRoute
    ) {
        this.jhiLanguageService.setLocations(['liveStock', 'stockCase']);
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe(params => {
            this.load(params['id']);
        });
    }

    load (id) {
        this.liveStockService.find(id).subscribe(liveStock => {
            this.liveStock = liveStock;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

}

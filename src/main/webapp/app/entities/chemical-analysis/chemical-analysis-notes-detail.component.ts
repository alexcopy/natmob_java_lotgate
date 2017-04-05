import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { ChemicalAnalysisNotes } from './chemical-analysis-notes.model';
import { ChemicalAnalysisNotesService } from './chemical-analysis-notes.service';

@Component({
    selector: 'jhi-chemical-analysis-notes-detail',
    templateUrl: './chemical-analysis-notes-detail.component.html'
})
export class ChemicalAnalysisNotesDetailComponent implements OnInit, OnDestroy {

    chemicalAnalysis: ChemicalAnalysisNotes;
    private subscription: any;

    constructor(
        private jhiLanguageService: JhiLanguageService,
        private chemicalAnalysisService: ChemicalAnalysisNotesService,
        private route: ActivatedRoute
    ) {
        this.jhiLanguageService.setLocations(['chemicalAnalysis']);
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe(params => {
            this.load(params['id']);
        });
    }

    load (id) {
        this.chemicalAnalysisService.find(id).subscribe(chemicalAnalysis => {
            this.chemicalAnalysis = chemicalAnalysis;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

}

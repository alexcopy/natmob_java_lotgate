import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiLanguageService, DataUtils } from 'ng-jhipster';
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
        private dataUtils: DataUtils,
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
    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

}

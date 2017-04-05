import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatemicroSharedModule } from '../../shared';

import {
    ChemicalAnalysisNotesService,
    ChemicalAnalysisNotesPopupService,
    ChemicalAnalysisNotesComponent,
    ChemicalAnalysisNotesDetailComponent,
    ChemicalAnalysisNotesDialogComponent,
    ChemicalAnalysisNotesPopupComponent,
    ChemicalAnalysisNotesDeletePopupComponent,
    ChemicalAnalysisNotesDeleteDialogComponent,
    chemicalAnalysisRoute,
    chemicalAnalysisPopupRoute,
    ChemicalAnalysisNotesResolvePagingParams,
} from './';

let ENTITY_STATES = [
    ...chemicalAnalysisRoute,
    ...chemicalAnalysisPopupRoute,
];

@NgModule({
    imports: [
        GatemicroSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        ChemicalAnalysisNotesComponent,
        ChemicalAnalysisNotesDetailComponent,
        ChemicalAnalysisNotesDialogComponent,
        ChemicalAnalysisNotesDeleteDialogComponent,
        ChemicalAnalysisNotesPopupComponent,
        ChemicalAnalysisNotesDeletePopupComponent,
    ],
    entryComponents: [
        ChemicalAnalysisNotesComponent,
        ChemicalAnalysisNotesDialogComponent,
        ChemicalAnalysisNotesPopupComponent,
        ChemicalAnalysisNotesDeleteDialogComponent,
        ChemicalAnalysisNotesDeletePopupComponent,
    ],
    providers: [
        ChemicalAnalysisNotesService,
        ChemicalAnalysisNotesPopupService,
        ChemicalAnalysisNotesResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GatemicroChemicalAnalysisNotesModule {}

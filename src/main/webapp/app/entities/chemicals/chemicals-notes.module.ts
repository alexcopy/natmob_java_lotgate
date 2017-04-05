import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatemicroSharedModule } from '../../shared';

import {
    ChemicalsNotesService,
    ChemicalsNotesPopupService,
    ChemicalsNotesComponent,
    ChemicalsNotesDetailComponent,
    ChemicalsNotesDialogComponent,
    ChemicalsNotesPopupComponent,
    ChemicalsNotesDeletePopupComponent,
    ChemicalsNotesDeleteDialogComponent,
    chemicalsRoute,
    chemicalsPopupRoute,
    ChemicalsNotesResolvePagingParams,
} from './';

let ENTITY_STATES = [
    ...chemicalsRoute,
    ...chemicalsPopupRoute,
];

@NgModule({
    imports: [
        GatemicroSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        ChemicalsNotesComponent,
        ChemicalsNotesDetailComponent,
        ChemicalsNotesDialogComponent,
        ChemicalsNotesDeleteDialogComponent,
        ChemicalsNotesPopupComponent,
        ChemicalsNotesDeletePopupComponent,
    ],
    entryComponents: [
        ChemicalsNotesComponent,
        ChemicalsNotesDialogComponent,
        ChemicalsNotesPopupComponent,
        ChemicalsNotesDeleteDialogComponent,
        ChemicalsNotesDeletePopupComponent,
    ],
    providers: [
        ChemicalsNotesService,
        ChemicalsNotesPopupService,
        ChemicalsNotesResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GatemicroChemicalsNotesModule {}

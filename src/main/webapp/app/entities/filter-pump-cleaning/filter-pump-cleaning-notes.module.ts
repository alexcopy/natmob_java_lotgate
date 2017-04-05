import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatemicroSharedModule } from '../../shared';

import {
    FilterPumpCleaningNotesService,
    FilterPumpCleaningNotesPopupService,
    FilterPumpCleaningNotesComponent,
    FilterPumpCleaningNotesDetailComponent,
    FilterPumpCleaningNotesDialogComponent,
    FilterPumpCleaningNotesPopupComponent,
    FilterPumpCleaningNotesDeletePopupComponent,
    FilterPumpCleaningNotesDeleteDialogComponent,
    filterPumpCleaningRoute,
    filterPumpCleaningPopupRoute,
    FilterPumpCleaningNotesResolvePagingParams,
} from './';

let ENTITY_STATES = [
    ...filterPumpCleaningRoute,
    ...filterPumpCleaningPopupRoute,
];

@NgModule({
    imports: [
        GatemicroSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        FilterPumpCleaningNotesComponent,
        FilterPumpCleaningNotesDetailComponent,
        FilterPumpCleaningNotesDialogComponent,
        FilterPumpCleaningNotesDeleteDialogComponent,
        FilterPumpCleaningNotesPopupComponent,
        FilterPumpCleaningNotesDeletePopupComponent,
    ],
    entryComponents: [
        FilterPumpCleaningNotesComponent,
        FilterPumpCleaningNotesDialogComponent,
        FilterPumpCleaningNotesPopupComponent,
        FilterPumpCleaningNotesDeleteDialogComponent,
        FilterPumpCleaningNotesDeletePopupComponent,
    ],
    providers: [
        FilterPumpCleaningNotesService,
        FilterPumpCleaningNotesPopupService,
        FilterPumpCleaningNotesResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GatemicroFilterPumpCleaningNotesModule {}

import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatemicroSharedModule } from '../../shared';

import {
    MeterReadingNotesService,
    MeterReadingNotesPopupService,
    MeterReadingNotesComponent,
    MeterReadingNotesDetailComponent,
    MeterReadingNotesDialogComponent,
    MeterReadingNotesPopupComponent,
    MeterReadingNotesDeletePopupComponent,
    MeterReadingNotesDeleteDialogComponent,
    meterReadingRoute,
    meterReadingPopupRoute,
    MeterReadingNotesResolvePagingParams,
} from './';

let ENTITY_STATES = [
    ...meterReadingRoute,
    ...meterReadingPopupRoute,
];

@NgModule({
    imports: [
        GatemicroSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        MeterReadingNotesComponent,
        MeterReadingNotesDetailComponent,
        MeterReadingNotesDialogComponent,
        MeterReadingNotesDeleteDialogComponent,
        MeterReadingNotesPopupComponent,
        MeterReadingNotesDeletePopupComponent,
    ],
    entryComponents: [
        MeterReadingNotesComponent,
        MeterReadingNotesDialogComponent,
        MeterReadingNotesPopupComponent,
        MeterReadingNotesDeleteDialogComponent,
        MeterReadingNotesDeletePopupComponent,
    ],
    providers: [
        MeterReadingNotesService,
        MeterReadingNotesPopupService,
        MeterReadingNotesResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GatemicroMeterReadingNotesModule {}

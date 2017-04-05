import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatemicroSharedModule } from '../../shared';

import {
    TempMeterNotesService,
    TempMeterNotesPopupService,
    TempMeterNotesComponent,
    TempMeterNotesDetailComponent,
    TempMeterNotesDialogComponent,
    TempMeterNotesPopupComponent,
    TempMeterNotesDeletePopupComponent,
    TempMeterNotesDeleteDialogComponent,
    tempMeterRoute,
    tempMeterPopupRoute,
} from './';

let ENTITY_STATES = [
    ...tempMeterRoute,
    ...tempMeterPopupRoute,
];

@NgModule({
    imports: [
        GatemicroSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        TempMeterNotesComponent,
        TempMeterNotesDetailComponent,
        TempMeterNotesDialogComponent,
        TempMeterNotesDeleteDialogComponent,
        TempMeterNotesPopupComponent,
        TempMeterNotesDeletePopupComponent,
    ],
    entryComponents: [
        TempMeterNotesComponent,
        TempMeterNotesDialogComponent,
        TempMeterNotesPopupComponent,
        TempMeterNotesDeleteDialogComponent,
        TempMeterNotesDeletePopupComponent,
    ],
    providers: [
        TempMeterNotesService,
        TempMeterNotesPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GatemicroTempMeterNotesModule {}

import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatemicroSharedModule } from '../../shared';

import {
    WaterChangeNotesService,
    WaterChangeNotesPopupService,
    WaterChangeNotesComponent,
    WaterChangeNotesDetailComponent,
    WaterChangeNotesDialogComponent,
    WaterChangeNotesPopupComponent,
    WaterChangeNotesDeletePopupComponent,
    WaterChangeNotesDeleteDialogComponent,
    waterChangeRoute,
    waterChangePopupRoute,
} from './';

let ENTITY_STATES = [
    ...waterChangeRoute,
    ...waterChangePopupRoute,
];

@NgModule({
    imports: [
        GatemicroSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        WaterChangeNotesComponent,
        WaterChangeNotesDetailComponent,
        WaterChangeNotesDialogComponent,
        WaterChangeNotesDeleteDialogComponent,
        WaterChangeNotesPopupComponent,
        WaterChangeNotesDeletePopupComponent,
    ],
    entryComponents: [
        WaterChangeNotesComponent,
        WaterChangeNotesDialogComponent,
        WaterChangeNotesPopupComponent,
        WaterChangeNotesDeleteDialogComponent,
        WaterChangeNotesDeletePopupComponent,
    ],
    providers: [
        WaterChangeNotesService,
        WaterChangeNotesPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GatemicroWaterChangeNotesModule {}

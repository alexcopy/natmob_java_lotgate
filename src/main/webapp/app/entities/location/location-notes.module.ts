import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatemicroSharedModule } from '../../shared';

import {
    LocationNotesService,
    LocationNotesPopupService,
    LocationNotesComponent,
    LocationNotesDetailComponent,
    LocationNotesDialogComponent,
    LocationNotesPopupComponent,
    LocationNotesDeletePopupComponent,
    LocationNotesDeleteDialogComponent,
    locationRoute,
    locationPopupRoute,
} from './';

let ENTITY_STATES = [
    ...locationRoute,
    ...locationPopupRoute,
];

@NgModule({
    imports: [
        GatemicroSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        LocationNotesComponent,
        LocationNotesDetailComponent,
        LocationNotesDialogComponent,
        LocationNotesDeleteDialogComponent,
        LocationNotesPopupComponent,
        LocationNotesDeletePopupComponent,
    ],
    entryComponents: [
        LocationNotesComponent,
        LocationNotesDialogComponent,
        LocationNotesPopupComponent,
        LocationNotesDeleteDialogComponent,
        LocationNotesDeletePopupComponent,
    ],
    providers: [
        LocationNotesService,
        LocationNotesPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GatemicroLocationNotesModule {}

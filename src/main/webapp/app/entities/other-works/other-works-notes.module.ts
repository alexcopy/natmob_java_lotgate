import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatemicroSharedModule } from '../../shared';

import {
    OtherWorksNotesService,
    OtherWorksNotesPopupService,
    OtherWorksNotesComponent,
    OtherWorksNotesDetailComponent,
    OtherWorksNotesDialogComponent,
    OtherWorksNotesPopupComponent,
    OtherWorksNotesDeletePopupComponent,
    OtherWorksNotesDeleteDialogComponent,
    otherWorksRoute,
    otherWorksPopupRoute,
} from './';

let ENTITY_STATES = [
    ...otherWorksRoute,
    ...otherWorksPopupRoute,
];

@NgModule({
    imports: [
        GatemicroSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        OtherWorksNotesComponent,
        OtherWorksNotesDetailComponent,
        OtherWorksNotesDialogComponent,
        OtherWorksNotesDeleteDialogComponent,
        OtherWorksNotesPopupComponent,
        OtherWorksNotesDeletePopupComponent,
    ],
    entryComponents: [
        OtherWorksNotesComponent,
        OtherWorksNotesDialogComponent,
        OtherWorksNotesPopupComponent,
        OtherWorksNotesDeleteDialogComponent,
        OtherWorksNotesDeletePopupComponent,
    ],
    providers: [
        OtherWorksNotesService,
        OtherWorksNotesPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GatemicroOtherWorksNotesModule {}

import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatemicroSharedModule } from '../../shared';

import {
    RegisteredUserNotesService,
    RegisteredUserNotesPopupService,
    RegisteredUserNotesComponent,
    RegisteredUserNotesDetailComponent,
    RegisteredUserNotesDialogComponent,
    RegisteredUserNotesPopupComponent,
    RegisteredUserNotesDeletePopupComponent,
    RegisteredUserNotesDeleteDialogComponent,
    registeredUserRoute,
    registeredUserPopupRoute,
} from './';

let ENTITY_STATES = [
    ...registeredUserRoute,
    ...registeredUserPopupRoute,
];

@NgModule({
    imports: [
        GatemicroSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        RegisteredUserNotesComponent,
        RegisteredUserNotesDetailComponent,
        RegisteredUserNotesDialogComponent,
        RegisteredUserNotesDeleteDialogComponent,
        RegisteredUserNotesPopupComponent,
        RegisteredUserNotesDeletePopupComponent,
    ],
    entryComponents: [
        RegisteredUserNotesComponent,
        RegisteredUserNotesDialogComponent,
        RegisteredUserNotesPopupComponent,
        RegisteredUserNotesDeleteDialogComponent,
        RegisteredUserNotesDeletePopupComponent,
    ],
    providers: [
        RegisteredUserNotesService,
        RegisteredUserNotesPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GatemicroRegisteredUserNotesModule {}

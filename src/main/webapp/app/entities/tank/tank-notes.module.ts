import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatemicroSharedModule } from '../../shared';

import {
    TankNotesService,
    TankNotesPopupService,
    TankNotesComponent,
    TankNotesDetailComponent,
    TankNotesDialogComponent,
    TankNotesPopupComponent,
    TankNotesDeletePopupComponent,
    TankNotesDeleteDialogComponent,
    tankRoute,
    tankPopupRoute,
} from './';

let ENTITY_STATES = [
    ...tankRoute,
    ...tankPopupRoute,
];

@NgModule({
    imports: [
        GatemicroSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        TankNotesComponent,
        TankNotesDetailComponent,
        TankNotesDialogComponent,
        TankNotesDeleteDialogComponent,
        TankNotesPopupComponent,
        TankNotesDeletePopupComponent,
    ],
    entryComponents: [
        TankNotesComponent,
        TankNotesDialogComponent,
        TankNotesPopupComponent,
        TankNotesDeleteDialogComponent,
        TankNotesDeletePopupComponent,
    ],
    providers: [
        TankNotesService,
        TankNotesPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GatemicroTankNotesModule {}

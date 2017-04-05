import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatemicroSharedModule } from '../../shared';

import {
    GameLotmicroService,
    GameLotmicroPopupService,
    GameLotmicroComponent,
    GameLotmicroDetailComponent,
    GameLotmicroDialogComponent,
    GameLotmicroPopupComponent,
    GameLotmicroDeletePopupComponent,
    GameLotmicroDeleteDialogComponent,
    gameRoute,
    gamePopupRoute,
} from './';

let ENTITY_STATES = [
    ...gameRoute,
    ...gamePopupRoute,
];

@NgModule({
    imports: [
        GatemicroSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        GameLotmicroComponent,
        GameLotmicroDetailComponent,
        GameLotmicroDialogComponent,
        GameLotmicroDeleteDialogComponent,
        GameLotmicroPopupComponent,
        GameLotmicroDeletePopupComponent,
    ],
    entryComponents: [
        GameLotmicroComponent,
        GameLotmicroDialogComponent,
        GameLotmicroPopupComponent,
        GameLotmicroDeleteDialogComponent,
        GameLotmicroDeletePopupComponent,
    ],
    providers: [
        GameLotmicroService,
        GameLotmicroPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GatemicroGameLotmicroModule {}

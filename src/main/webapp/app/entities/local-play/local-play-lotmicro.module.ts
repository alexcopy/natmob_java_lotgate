import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatemicroSharedModule } from '../../shared';

import {
    LocalPlayLotmicroService,
    LocalPlayLotmicroPopupService,
    LocalPlayLotmicroComponent,
    LocalPlayLotmicroDetailComponent,
    LocalPlayLotmicroDialogComponent,
    LocalPlayLotmicroPopupComponent,
    LocalPlayLotmicroDeletePopupComponent,
    LocalPlayLotmicroDeleteDialogComponent,
    localPlayRoute,
    localPlayPopupRoute,
} from './';

let ENTITY_STATES = [
    ...localPlayRoute,
    ...localPlayPopupRoute,
];

@NgModule({
    imports: [
        GatemicroSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        LocalPlayLotmicroComponent,
        LocalPlayLotmicroDetailComponent,
        LocalPlayLotmicroDialogComponent,
        LocalPlayLotmicroDeleteDialogComponent,
        LocalPlayLotmicroPopupComponent,
        LocalPlayLotmicroDeletePopupComponent,
    ],
    entryComponents: [
        LocalPlayLotmicroComponent,
        LocalPlayLotmicroDialogComponent,
        LocalPlayLotmicroPopupComponent,
        LocalPlayLotmicroDeleteDialogComponent,
        LocalPlayLotmicroDeletePopupComponent,
    ],
    providers: [
        LocalPlayLotmicroService,
        LocalPlayLotmicroPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GatemicroLocalPlayLotmicroModule {}

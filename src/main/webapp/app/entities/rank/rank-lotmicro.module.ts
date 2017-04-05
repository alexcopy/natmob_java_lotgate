import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatemicroSharedModule } from '../../shared';

import {
    RankLotmicroService,
    RankLotmicroPopupService,
    RankLotmicroComponent,
    RankLotmicroDetailComponent,
    RankLotmicroDialogComponent,
    RankLotmicroPopupComponent,
    RankLotmicroDeletePopupComponent,
    RankLotmicroDeleteDialogComponent,
    rankRoute,
    rankPopupRoute,
} from './';

let ENTITY_STATES = [
    ...rankRoute,
    ...rankPopupRoute,
];

@NgModule({
    imports: [
        GatemicroSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        RankLotmicroComponent,
        RankLotmicroDetailComponent,
        RankLotmicroDialogComponent,
        RankLotmicroDeleteDialogComponent,
        RankLotmicroPopupComponent,
        RankLotmicroDeletePopupComponent,
    ],
    entryComponents: [
        RankLotmicroComponent,
        RankLotmicroDialogComponent,
        RankLotmicroPopupComponent,
        RankLotmicroDeleteDialogComponent,
        RankLotmicroDeletePopupComponent,
    ],
    providers: [
        RankLotmicroService,
        RankLotmicroPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GatemicroRankLotmicroModule {}

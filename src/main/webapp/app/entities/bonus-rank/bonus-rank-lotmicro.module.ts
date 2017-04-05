import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatemicroSharedModule } from '../../shared';

import {
    BonusRankLotmicroService,
    BonusRankLotmicroPopupService,
    BonusRankLotmicroComponent,
    BonusRankLotmicroDetailComponent,
    BonusRankLotmicroDialogComponent,
    BonusRankLotmicroPopupComponent,
    BonusRankLotmicroDeletePopupComponent,
    BonusRankLotmicroDeleteDialogComponent,
    bonusRankRoute,
    bonusRankPopupRoute,
} from './';

let ENTITY_STATES = [
    ...bonusRankRoute,
    ...bonusRankPopupRoute,
];

@NgModule({
    imports: [
        GatemicroSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        BonusRankLotmicroComponent,
        BonusRankLotmicroDetailComponent,
        BonusRankLotmicroDialogComponent,
        BonusRankLotmicroDeleteDialogComponent,
        BonusRankLotmicroPopupComponent,
        BonusRankLotmicroDeletePopupComponent,
    ],
    entryComponents: [
        BonusRankLotmicroComponent,
        BonusRankLotmicroDialogComponent,
        BonusRankLotmicroPopupComponent,
        BonusRankLotmicroDeleteDialogComponent,
        BonusRankLotmicroDeletePopupComponent,
    ],
    providers: [
        BonusRankLotmicroService,
        BonusRankLotmicroPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GatemicroBonusRankLotmicroModule {}

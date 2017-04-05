import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatemicroSharedModule } from '../../shared';

import {
    GameRuleLotmicroService,
    GameRuleLotmicroPopupService,
    GameRuleLotmicroComponent,
    GameRuleLotmicroDetailComponent,
    GameRuleLotmicroDialogComponent,
    GameRuleLotmicroPopupComponent,
    GameRuleLotmicroDeletePopupComponent,
    GameRuleLotmicroDeleteDialogComponent,
    gameRuleRoute,
    gameRulePopupRoute,
} from './';

let ENTITY_STATES = [
    ...gameRuleRoute,
    ...gameRulePopupRoute,
];

@NgModule({
    imports: [
        GatemicroSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        GameRuleLotmicroComponent,
        GameRuleLotmicroDetailComponent,
        GameRuleLotmicroDialogComponent,
        GameRuleLotmicroDeleteDialogComponent,
        GameRuleLotmicroPopupComponent,
        GameRuleLotmicroDeletePopupComponent,
    ],
    entryComponents: [
        GameRuleLotmicroComponent,
        GameRuleLotmicroDialogComponent,
        GameRuleLotmicroPopupComponent,
        GameRuleLotmicroDeleteDialogComponent,
        GameRuleLotmicroDeletePopupComponent,
    ],
    providers: [
        GameRuleLotmicroService,
        GameRuleLotmicroPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GatemicroGameRuleLotmicroModule {}

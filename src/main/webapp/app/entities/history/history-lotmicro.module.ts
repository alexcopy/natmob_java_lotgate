import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatemicroSharedModule } from '../../shared';

import {
    HistoryLotmicroService,
    HistoryLotmicroPopupService,
    HistoryLotmicroComponent,
    HistoryLotmicroDetailComponent,
    HistoryLotmicroDialogComponent,
    HistoryLotmicroPopupComponent,
    HistoryLotmicroDeletePopupComponent,
    HistoryLotmicroDeleteDialogComponent,
    historyRoute,
    historyPopupRoute,
    HistoryLotmicroResolvePagingParams,
} from './';

let ENTITY_STATES = [
    ...historyRoute,
    ...historyPopupRoute,
];

@NgModule({
    imports: [
        GatemicroSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        HistoryLotmicroComponent,
        HistoryLotmicroDetailComponent,
        HistoryLotmicroDialogComponent,
        HistoryLotmicroDeleteDialogComponent,
        HistoryLotmicroPopupComponent,
        HistoryLotmicroDeletePopupComponent,
    ],
    entryComponents: [
        HistoryLotmicroComponent,
        HistoryLotmicroDialogComponent,
        HistoryLotmicroPopupComponent,
        HistoryLotmicroDeleteDialogComponent,
        HistoryLotmicroDeletePopupComponent,
    ],
    providers: [
        HistoryLotmicroService,
        HistoryLotmicroPopupService,
        HistoryLotmicroResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GatemicroHistoryLotmicroModule {}

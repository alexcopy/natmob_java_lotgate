import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatemicroSharedModule } from '../../shared';

import {
    LiveStockNotesService,
    LiveStockNotesPopupService,
    LiveStockNotesComponent,
    LiveStockNotesDetailComponent,
    LiveStockNotesDialogComponent,
    LiveStockNotesPopupComponent,
    LiveStockNotesDeletePopupComponent,
    LiveStockNotesDeleteDialogComponent,
    liveStockRoute,
    liveStockPopupRoute,
    LiveStockNotesResolvePagingParams,
} from './';

let ENTITY_STATES = [
    ...liveStockRoute,
    ...liveStockPopupRoute,
];

@NgModule({
    imports: [
        GatemicroSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        LiveStockNotesComponent,
        LiveStockNotesDetailComponent,
        LiveStockNotesDialogComponent,
        LiveStockNotesDeleteDialogComponent,
        LiveStockNotesPopupComponent,
        LiveStockNotesDeletePopupComponent,
    ],
    entryComponents: [
        LiveStockNotesComponent,
        LiveStockNotesDialogComponent,
        LiveStockNotesPopupComponent,
        LiveStockNotesDeleteDialogComponent,
        LiveStockNotesDeletePopupComponent,
    ],
    providers: [
        LiveStockNotesService,
        LiveStockNotesPopupService,
        LiveStockNotesResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GatemicroLiveStockNotesModule {}

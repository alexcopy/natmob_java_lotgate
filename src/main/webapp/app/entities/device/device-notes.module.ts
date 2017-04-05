import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatemicroSharedModule } from '../../shared';

import {
    DeviceNotesService,
    DeviceNotesPopupService,
    DeviceNotesComponent,
    DeviceNotesDetailComponent,
    DeviceNotesDialogComponent,
    DeviceNotesPopupComponent,
    DeviceNotesDeletePopupComponent,
    DeviceNotesDeleteDialogComponent,
    deviceRoute,
    devicePopupRoute,
} from './';

let ENTITY_STATES = [
    ...deviceRoute,
    ...devicePopupRoute,
];

@NgModule({
    imports: [
        GatemicroSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        DeviceNotesComponent,
        DeviceNotesDetailComponent,
        DeviceNotesDialogComponent,
        DeviceNotesDeleteDialogComponent,
        DeviceNotesPopupComponent,
        DeviceNotesDeletePopupComponent,
    ],
    entryComponents: [
        DeviceNotesComponent,
        DeviceNotesDialogComponent,
        DeviceNotesPopupComponent,
        DeviceNotesDeleteDialogComponent,
        DeviceNotesDeletePopupComponent,
    ],
    providers: [
        DeviceNotesService,
        DeviceNotesPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GatemicroDeviceNotesModule {}

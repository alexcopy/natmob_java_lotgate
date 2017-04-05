import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { PaginationUtil } from 'ng-jhipster';

import { DeviceNotesComponent } from './device-notes.component';
import { DeviceNotesDetailComponent } from './device-notes-detail.component';
import { DeviceNotesPopupComponent } from './device-notes-dialog.component';
import { DeviceNotesDeletePopupComponent } from './device-notes-delete-dialog.component';

import { Principal } from '../../shared';


export const deviceRoute: Routes = [
  {
    path: 'device-notes',
    component: DeviceNotesComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'gatemicroApp.device.home.title'
    }
  }, {
    path: 'device-notes/:id',
    component: DeviceNotesDetailComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'gatemicroApp.device.home.title'
    }
  }
];

export const devicePopupRoute: Routes = [
  {
    path: 'device-notes-new',
    component: DeviceNotesPopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'gatemicroApp.device.home.title'
    },
    outlet: 'popup'
  },
  {
    path: 'device-notes/:id/edit',
    component: DeviceNotesPopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'gatemicroApp.device.home.title'
    },
    outlet: 'popup'
  },
  {
    path: 'device-notes/:id/delete',
    component: DeviceNotesDeletePopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'gatemicroApp.device.home.title'
    },
    outlet: 'popup'
  }
];

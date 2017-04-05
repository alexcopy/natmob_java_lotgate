import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { PaginationUtil } from 'ng-jhipster';

import { TempMeterNotesComponent } from './temp-meter-notes.component';
import { TempMeterNotesDetailComponent } from './temp-meter-notes-detail.component';
import { TempMeterNotesPopupComponent } from './temp-meter-notes-dialog.component';
import { TempMeterNotesDeletePopupComponent } from './temp-meter-notes-delete-dialog.component';

import { Principal } from '../../shared';


export const tempMeterRoute: Routes = [
  {
    path: 'temp-meter-notes',
    component: TempMeterNotesComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'gatemicroApp.tempMeter.home.title'
    }
  }, {
    path: 'temp-meter-notes/:id',
    component: TempMeterNotesDetailComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'gatemicroApp.tempMeter.home.title'
    }
  }
];

export const tempMeterPopupRoute: Routes = [
  {
    path: 'temp-meter-notes-new',
    component: TempMeterNotesPopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'gatemicroApp.tempMeter.home.title'
    },
    outlet: 'popup'
  },
  {
    path: 'temp-meter-notes/:id/edit',
    component: TempMeterNotesPopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'gatemicroApp.tempMeter.home.title'
    },
    outlet: 'popup'
  },
  {
    path: 'temp-meter-notes/:id/delete',
    component: TempMeterNotesDeletePopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'gatemicroApp.tempMeter.home.title'
    },
    outlet: 'popup'
  }
];

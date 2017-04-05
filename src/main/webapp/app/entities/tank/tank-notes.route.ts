import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { PaginationUtil } from 'ng-jhipster';

import { TankNotesComponent } from './tank-notes.component';
import { TankNotesDetailComponent } from './tank-notes-detail.component';
import { TankNotesPopupComponent } from './tank-notes-dialog.component';
import { TankNotesDeletePopupComponent } from './tank-notes-delete-dialog.component';

import { Principal } from '../../shared';


export const tankRoute: Routes = [
  {
    path: 'tank-notes',
    component: TankNotesComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'gatemicroApp.tank.home.title'
    }
  }, {
    path: 'tank-notes/:id',
    component: TankNotesDetailComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'gatemicroApp.tank.home.title'
    }
  }
];

export const tankPopupRoute: Routes = [
  {
    path: 'tank-notes-new',
    component: TankNotesPopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'gatemicroApp.tank.home.title'
    },
    outlet: 'popup'
  },
  {
    path: 'tank-notes/:id/edit',
    component: TankNotesPopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'gatemicroApp.tank.home.title'
    },
    outlet: 'popup'
  },
  {
    path: 'tank-notes/:id/delete',
    component: TankNotesDeletePopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'gatemicroApp.tank.home.title'
    },
    outlet: 'popup'
  }
];

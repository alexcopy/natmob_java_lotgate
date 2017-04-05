import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { PaginationUtil } from 'ng-jhipster';

import { WaterChangeNotesComponent } from './water-change-notes.component';
import { WaterChangeNotesDetailComponent } from './water-change-notes-detail.component';
import { WaterChangeNotesPopupComponent } from './water-change-notes-dialog.component';
import { WaterChangeNotesDeletePopupComponent } from './water-change-notes-delete-dialog.component';

import { Principal } from '../../shared';


export const waterChangeRoute: Routes = [
  {
    path: 'water-change-notes',
    component: WaterChangeNotesComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'gatemicroApp.waterChange.home.title'
    }
  }, {
    path: 'water-change-notes/:id',
    component: WaterChangeNotesDetailComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'gatemicroApp.waterChange.home.title'
    }
  }
];

export const waterChangePopupRoute: Routes = [
  {
    path: 'water-change-notes-new',
    component: WaterChangeNotesPopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'gatemicroApp.waterChange.home.title'
    },
    outlet: 'popup'
  },
  {
    path: 'water-change-notes/:id/edit',
    component: WaterChangeNotesPopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'gatemicroApp.waterChange.home.title'
    },
    outlet: 'popup'
  },
  {
    path: 'water-change-notes/:id/delete',
    component: WaterChangeNotesDeletePopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'gatemicroApp.waterChange.home.title'
    },
    outlet: 'popup'
  }
];

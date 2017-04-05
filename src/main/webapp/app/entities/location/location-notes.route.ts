import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { PaginationUtil } from 'ng-jhipster';

import { LocationNotesComponent } from './location-notes.component';
import { LocationNotesDetailComponent } from './location-notes-detail.component';
import { LocationNotesPopupComponent } from './location-notes-dialog.component';
import { LocationNotesDeletePopupComponent } from './location-notes-delete-dialog.component';

import { Principal } from '../../shared';


export const locationRoute: Routes = [
  {
    path: 'location-notes',
    component: LocationNotesComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'gatemicroApp.location.home.title'
    }
  }, {
    path: 'location-notes/:id',
    component: LocationNotesDetailComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'gatemicroApp.location.home.title'
    }
  }
];

export const locationPopupRoute: Routes = [
  {
    path: 'location-notes-new',
    component: LocationNotesPopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'gatemicroApp.location.home.title'
    },
    outlet: 'popup'
  },
  {
    path: 'location-notes/:id/edit',
    component: LocationNotesPopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'gatemicroApp.location.home.title'
    },
    outlet: 'popup'
  },
  {
    path: 'location-notes/:id/delete',
    component: LocationNotesDeletePopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'gatemicroApp.location.home.title'
    },
    outlet: 'popup'
  }
];

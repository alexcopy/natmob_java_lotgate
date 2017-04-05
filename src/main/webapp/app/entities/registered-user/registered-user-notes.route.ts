import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { PaginationUtil } from 'ng-jhipster';

import { RegisteredUserNotesComponent } from './registered-user-notes.component';
import { RegisteredUserNotesDetailComponent } from './registered-user-notes-detail.component';
import { RegisteredUserNotesPopupComponent } from './registered-user-notes-dialog.component';
import { RegisteredUserNotesDeletePopupComponent } from './registered-user-notes-delete-dialog.component';

import { Principal } from '../../shared';


export const registeredUserRoute: Routes = [
  {
    path: 'registered-user-notes',
    component: RegisteredUserNotesComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'gatemicroApp.registeredUser.home.title'
    }
  }, {
    path: 'registered-user-notes/:id',
    component: RegisteredUserNotesDetailComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'gatemicroApp.registeredUser.home.title'
    }
  }
];

export const registeredUserPopupRoute: Routes = [
  {
    path: 'registered-user-notes-new',
    component: RegisteredUserNotesPopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'gatemicroApp.registeredUser.home.title'
    },
    outlet: 'popup'
  },
  {
    path: 'registered-user-notes/:id/edit',
    component: RegisteredUserNotesPopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'gatemicroApp.registeredUser.home.title'
    },
    outlet: 'popup'
  },
  {
    path: 'registered-user-notes/:id/delete',
    component: RegisteredUserNotesDeletePopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'gatemicroApp.registeredUser.home.title'
    },
    outlet: 'popup'
  }
];

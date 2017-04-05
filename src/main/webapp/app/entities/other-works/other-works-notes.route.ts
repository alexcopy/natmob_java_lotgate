import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { PaginationUtil } from 'ng-jhipster';

import { OtherWorksNotesComponent } from './other-works-notes.component';
import { OtherWorksNotesDetailComponent } from './other-works-notes-detail.component';
import { OtherWorksNotesPopupComponent } from './other-works-notes-dialog.component';
import { OtherWorksNotesDeletePopupComponent } from './other-works-notes-delete-dialog.component';

import { Principal } from '../../shared';


export const otherWorksRoute: Routes = [
  {
    path: 'other-works-notes',
    component: OtherWorksNotesComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'gatemicroApp.otherWorks.home.title'
    }
  }, {
    path: 'other-works-notes/:id',
    component: OtherWorksNotesDetailComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'gatemicroApp.otherWorks.home.title'
    }
  }
];

export const otherWorksPopupRoute: Routes = [
  {
    path: 'other-works-notes-new',
    component: OtherWorksNotesPopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'gatemicroApp.otherWorks.home.title'
    },
    outlet: 'popup'
  },
  {
    path: 'other-works-notes/:id/edit',
    component: OtherWorksNotesPopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'gatemicroApp.otherWorks.home.title'
    },
    outlet: 'popup'
  },
  {
    path: 'other-works-notes/:id/delete',
    component: OtherWorksNotesDeletePopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'gatemicroApp.otherWorks.home.title'
    },
    outlet: 'popup'
  }
];

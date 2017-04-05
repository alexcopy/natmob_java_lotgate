import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { PaginationUtil } from 'ng-jhipster';

import { ChemicalsNotesComponent } from './chemicals-notes.component';
import { ChemicalsNotesDetailComponent } from './chemicals-notes-detail.component';
import { ChemicalsNotesPopupComponent } from './chemicals-notes-dialog.component';
import { ChemicalsNotesDeletePopupComponent } from './chemicals-notes-delete-dialog.component';

import { Principal } from '../../shared';

@Injectable()
export class ChemicalsNotesResolvePagingParams implements Resolve<any> {

  constructor(private paginationUtil: PaginationUtil) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
      let page = route.queryParams['page'] ? route.queryParams['page'] : '1';
      let sort = route.queryParams['sort'] ? route.queryParams['sort'] : 'id,asc';
      return {
          page: this.paginationUtil.parsePage(page),
          predicate: this.paginationUtil.parsePredicate(sort),
          ascending: this.paginationUtil.parseAscending(sort)
    };
  }
}

export const chemicalsRoute: Routes = [
  {
    path: 'chemicals-notes',
    component: ChemicalsNotesComponent,
    resolve: {
      'pagingParams': ChemicalsNotesResolvePagingParams
    },
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'gatemicroApp.chemicals.home.title'
    }
  }, {
    path: 'chemicals-notes/:id',
    component: ChemicalsNotesDetailComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'gatemicroApp.chemicals.home.title'
    }
  }
];

export const chemicalsPopupRoute: Routes = [
  {
    path: 'chemicals-notes-new',
    component: ChemicalsNotesPopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'gatemicroApp.chemicals.home.title'
    },
    outlet: 'popup'
  },
  {
    path: 'chemicals-notes/:id/edit',
    component: ChemicalsNotesPopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'gatemicroApp.chemicals.home.title'
    },
    outlet: 'popup'
  },
  {
    path: 'chemicals-notes/:id/delete',
    component: ChemicalsNotesDeletePopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'gatemicroApp.chemicals.home.title'
    },
    outlet: 'popup'
  }
];

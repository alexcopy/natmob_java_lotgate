import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { PaginationUtil } from 'ng-jhipster';

import { LiveStockNotesComponent } from './live-stock-notes.component';
import { LiveStockNotesDetailComponent } from './live-stock-notes-detail.component';
import { LiveStockNotesPopupComponent } from './live-stock-notes-dialog.component';
import { LiveStockNotesDeletePopupComponent } from './live-stock-notes-delete-dialog.component';

import { Principal } from '../../shared';

@Injectable()
export class LiveStockNotesResolvePagingParams implements Resolve<any> {

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

export const liveStockRoute: Routes = [
  {
    path: 'live-stock-notes',
    component: LiveStockNotesComponent,
    resolve: {
      'pagingParams': LiveStockNotesResolvePagingParams
    },
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'gatemicroApp.liveStock.home.title'
    }
  }, {
    path: 'live-stock-notes/:id',
    component: LiveStockNotesDetailComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'gatemicroApp.liveStock.home.title'
    }
  }
];

export const liveStockPopupRoute: Routes = [
  {
    path: 'live-stock-notes-new',
    component: LiveStockNotesPopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'gatemicroApp.liveStock.home.title'
    },
    outlet: 'popup'
  },
  {
    path: 'live-stock-notes/:id/edit',
    component: LiveStockNotesPopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'gatemicroApp.liveStock.home.title'
    },
    outlet: 'popup'
  },
  {
    path: 'live-stock-notes/:id/delete',
    component: LiveStockNotesDeletePopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'gatemicroApp.liveStock.home.title'
    },
    outlet: 'popup'
  }
];

import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { PaginationUtil } from 'ng-jhipster';

import { HistoryLotmicroComponent } from './history-lotmicro.component';
import { HistoryLotmicroDetailComponent } from './history-lotmicro-detail.component';
import { HistoryLotmicroPopupComponent } from './history-lotmicro-dialog.component';
import { HistoryLotmicroDeletePopupComponent } from './history-lotmicro-delete-dialog.component';

import { Principal } from '../../shared';

@Injectable()
export class HistoryLotmicroResolvePagingParams implements Resolve<any> {

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

export const historyRoute: Routes = [
  {
    path: 'history-lotmicro',
    component: HistoryLotmicroComponent,
    resolve: {
      'pagingParams': HistoryLotmicroResolvePagingParams
    },
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'gatemicroApp.history.home.title'
    }
  }, {
    path: 'history-lotmicro/:id',
    component: HistoryLotmicroDetailComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'gatemicroApp.history.home.title'
    }
  }
];

export const historyPopupRoute: Routes = [
  {
    path: 'history-lotmicro-new',
    component: HistoryLotmicroPopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'gatemicroApp.history.home.title'
    },
    outlet: 'popup'
  },
  {
    path: 'history-lotmicro/:id/edit',
    component: HistoryLotmicroPopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'gatemicroApp.history.home.title'
    },
    outlet: 'popup'
  },
  {
    path: 'history-lotmicro/:id/delete',
    component: HistoryLotmicroDeletePopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'gatemicroApp.history.home.title'
    },
    outlet: 'popup'
  }
];

import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { PaginationUtil } from 'ng-jhipster';

import { FilterPumpCleaningNotesComponent } from './filter-pump-cleaning-notes.component';
import { FilterPumpCleaningNotesDetailComponent } from './filter-pump-cleaning-notes-detail.component';
import { FilterPumpCleaningNotesPopupComponent } from './filter-pump-cleaning-notes-dialog.component';
import { FilterPumpCleaningNotesDeletePopupComponent } from './filter-pump-cleaning-notes-delete-dialog.component';

import { Principal } from '../../shared';

@Injectable()
export class FilterPumpCleaningNotesResolvePagingParams implements Resolve<any> {

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

export const filterPumpCleaningRoute: Routes = [
  {
    path: 'filter-pump-cleaning-notes',
    component: FilterPumpCleaningNotesComponent,
    resolve: {
      'pagingParams': FilterPumpCleaningNotesResolvePagingParams
    },
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'gatemicroApp.filterPumpCleaning.home.title'
    }
  }, {
    path: 'filter-pump-cleaning-notes/:id',
    component: FilterPumpCleaningNotesDetailComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'gatemicroApp.filterPumpCleaning.home.title'
    }
  }
];

export const filterPumpCleaningPopupRoute: Routes = [
  {
    path: 'filter-pump-cleaning-notes-new',
    component: FilterPumpCleaningNotesPopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'gatemicroApp.filterPumpCleaning.home.title'
    },
    outlet: 'popup'
  },
  {
    path: 'filter-pump-cleaning-notes/:id/edit',
    component: FilterPumpCleaningNotesPopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'gatemicroApp.filterPumpCleaning.home.title'
    },
    outlet: 'popup'
  },
  {
    path: 'filter-pump-cleaning-notes/:id/delete',
    component: FilterPumpCleaningNotesDeletePopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'gatemicroApp.filterPumpCleaning.home.title'
    },
    outlet: 'popup'
  }
];

import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { PaginationUtil } from 'ng-jhipster';

import { MeterReadingNotesComponent } from './meter-reading-notes.component';
import { MeterReadingNotesDetailComponent } from './meter-reading-notes-detail.component';
import { MeterReadingNotesPopupComponent } from './meter-reading-notes-dialog.component';
import { MeterReadingNotesDeletePopupComponent } from './meter-reading-notes-delete-dialog.component';

import { Principal } from '../../shared';

@Injectable()
export class MeterReadingNotesResolvePagingParams implements Resolve<any> {

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

export const meterReadingRoute: Routes = [
  {
    path: 'meter-reading-notes',
    component: MeterReadingNotesComponent,
    resolve: {
      'pagingParams': MeterReadingNotesResolvePagingParams
    },
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'gatemicroApp.meterReading.home.title'
    }
  }, {
    path: 'meter-reading-notes/:id',
    component: MeterReadingNotesDetailComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'gatemicroApp.meterReading.home.title'
    }
  }
];

export const meterReadingPopupRoute: Routes = [
  {
    path: 'meter-reading-notes-new',
    component: MeterReadingNotesPopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'gatemicroApp.meterReading.home.title'
    },
    outlet: 'popup'
  },
  {
    path: 'meter-reading-notes/:id/edit',
    component: MeterReadingNotesPopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'gatemicroApp.meterReading.home.title'
    },
    outlet: 'popup'
  },
  {
    path: 'meter-reading-notes/:id/delete',
    component: MeterReadingNotesDeletePopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'gatemicroApp.meterReading.home.title'
    },
    outlet: 'popup'
  }
];

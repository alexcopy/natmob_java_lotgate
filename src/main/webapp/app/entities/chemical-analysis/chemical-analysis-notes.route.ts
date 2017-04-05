import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { PaginationUtil } from 'ng-jhipster';

import { ChemicalAnalysisNotesComponent } from './chemical-analysis-notes.component';
import { ChemicalAnalysisNotesDetailComponent } from './chemical-analysis-notes-detail.component';
import { ChemicalAnalysisNotesPopupComponent } from './chemical-analysis-notes-dialog.component';
import { ChemicalAnalysisNotesDeletePopupComponent } from './chemical-analysis-notes-delete-dialog.component';

import { Principal } from '../../shared';

@Injectable()
export class ChemicalAnalysisNotesResolvePagingParams implements Resolve<any> {

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

export const chemicalAnalysisRoute: Routes = [
  {
    path: 'chemical-analysis-notes',
    component: ChemicalAnalysisNotesComponent,
    resolve: {
      'pagingParams': ChemicalAnalysisNotesResolvePagingParams
    },
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'gatemicroApp.chemicalAnalysis.home.title'
    }
  }, {
    path: 'chemical-analysis-notes/:id',
    component: ChemicalAnalysisNotesDetailComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'gatemicroApp.chemicalAnalysis.home.title'
    }
  }
];

export const chemicalAnalysisPopupRoute: Routes = [
  {
    path: 'chemical-analysis-notes-new',
    component: ChemicalAnalysisNotesPopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'gatemicroApp.chemicalAnalysis.home.title'
    },
    outlet: 'popup'
  },
  {
    path: 'chemical-analysis-notes/:id/edit',
    component: ChemicalAnalysisNotesPopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'gatemicroApp.chemicalAnalysis.home.title'
    },
    outlet: 'popup'
  },
  {
    path: 'chemical-analysis-notes/:id/delete',
    component: ChemicalAnalysisNotesDeletePopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'gatemicroApp.chemicalAnalysis.home.title'
    },
    outlet: 'popup'
  }
];

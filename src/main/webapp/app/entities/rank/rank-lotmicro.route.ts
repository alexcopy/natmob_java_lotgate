import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { PaginationUtil } from 'ng-jhipster';

import { RankLotmicroComponent } from './rank-lotmicro.component';
import { RankLotmicroDetailComponent } from './rank-lotmicro-detail.component';
import { RankLotmicroPopupComponent } from './rank-lotmicro-dialog.component';
import { RankLotmicroDeletePopupComponent } from './rank-lotmicro-delete-dialog.component';

import { Principal } from '../../shared';


export const rankRoute: Routes = [
  {
    path: 'rank-lotmicro',
    component: RankLotmicroComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'gatemicroApp.rank.home.title'
    }
  }, {
    path: 'rank-lotmicro/:id',
    component: RankLotmicroDetailComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'gatemicroApp.rank.home.title'
    }
  }
];

export const rankPopupRoute: Routes = [
  {
    path: 'rank-lotmicro-new',
    component: RankLotmicroPopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'gatemicroApp.rank.home.title'
    },
    outlet: 'popup'
  },
  {
    path: 'rank-lotmicro/:id/edit',
    component: RankLotmicroPopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'gatemicroApp.rank.home.title'
    },
    outlet: 'popup'
  },
  {
    path: 'rank-lotmicro/:id/delete',
    component: RankLotmicroDeletePopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'gatemicroApp.rank.home.title'
    },
    outlet: 'popup'
  }
];

import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { PaginationUtil } from 'ng-jhipster';

import { BonusRankLotmicroComponent } from './bonus-rank-lotmicro.component';
import { BonusRankLotmicroDetailComponent } from './bonus-rank-lotmicro-detail.component';
import { BonusRankLotmicroPopupComponent } from './bonus-rank-lotmicro-dialog.component';
import { BonusRankLotmicroDeletePopupComponent } from './bonus-rank-lotmicro-delete-dialog.component';

import { Principal } from '../../shared';


export const bonusRankRoute: Routes = [
  {
    path: 'bonus-rank-lotmicro',
    component: BonusRankLotmicroComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'gatemicroApp.bonusRank.home.title'
    }
  }, {
    path: 'bonus-rank-lotmicro/:id',
    component: BonusRankLotmicroDetailComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'gatemicroApp.bonusRank.home.title'
    }
  }
];

export const bonusRankPopupRoute: Routes = [
  {
    path: 'bonus-rank-lotmicro-new',
    component: BonusRankLotmicroPopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'gatemicroApp.bonusRank.home.title'
    },
    outlet: 'popup'
  },
  {
    path: 'bonus-rank-lotmicro/:id/edit',
    component: BonusRankLotmicroPopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'gatemicroApp.bonusRank.home.title'
    },
    outlet: 'popup'
  },
  {
    path: 'bonus-rank-lotmicro/:id/delete',
    component: BonusRankLotmicroDeletePopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'gatemicroApp.bonusRank.home.title'
    },
    outlet: 'popup'
  }
];

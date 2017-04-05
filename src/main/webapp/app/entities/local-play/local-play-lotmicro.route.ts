import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { PaginationUtil } from 'ng-jhipster';

import { LocalPlayLotmicroComponent } from './local-play-lotmicro.component';
import { LocalPlayLotmicroDetailComponent } from './local-play-lotmicro-detail.component';
import { LocalPlayLotmicroPopupComponent } from './local-play-lotmicro-dialog.component';
import { LocalPlayLotmicroDeletePopupComponent } from './local-play-lotmicro-delete-dialog.component';

import { Principal } from '../../shared';


export const localPlayRoute: Routes = [
  {
    path: 'local-play-lotmicro',
    component: LocalPlayLotmicroComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'gatemicroApp.localPlay.home.title'
    }
  }, {
    path: 'local-play-lotmicro/:id',
    component: LocalPlayLotmicroDetailComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'gatemicroApp.localPlay.home.title'
    }
  }
];

export const localPlayPopupRoute: Routes = [
  {
    path: 'local-play-lotmicro-new',
    component: LocalPlayLotmicroPopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'gatemicroApp.localPlay.home.title'
    },
    outlet: 'popup'
  },
  {
    path: 'local-play-lotmicro/:id/edit',
    component: LocalPlayLotmicroPopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'gatemicroApp.localPlay.home.title'
    },
    outlet: 'popup'
  },
  {
    path: 'local-play-lotmicro/:id/delete',
    component: LocalPlayLotmicroDeletePopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'gatemicroApp.localPlay.home.title'
    },
    outlet: 'popup'
  }
];

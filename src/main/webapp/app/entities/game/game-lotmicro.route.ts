import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { PaginationUtil } from 'ng-jhipster';

import { GameLotmicroComponent } from './game-lotmicro.component';
import { GameLotmicroDetailComponent } from './game-lotmicro-detail.component';
import { GameLotmicroPopupComponent } from './game-lotmicro-dialog.component';
import { GameLotmicroDeletePopupComponent } from './game-lotmicro-delete-dialog.component';

import { Principal } from '../../shared';


export const gameRoute: Routes = [
  {
    path: 'game-lotmicro',
    component: GameLotmicroComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'gatemicroApp.game.home.title'
    }
  }, {
    path: 'game-lotmicro/:id',
    component: GameLotmicroDetailComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'gatemicroApp.game.home.title'
    }
  }
];

export const gamePopupRoute: Routes = [
  {
    path: 'game-lotmicro-new',
    component: GameLotmicroPopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'gatemicroApp.game.home.title'
    },
    outlet: 'popup'
  },
  {
    path: 'game-lotmicro/:id/edit',
    component: GameLotmicroPopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'gatemicroApp.game.home.title'
    },
    outlet: 'popup'
  },
  {
    path: 'game-lotmicro/:id/delete',
    component: GameLotmicroDeletePopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'gatemicroApp.game.home.title'
    },
    outlet: 'popup'
  }
];

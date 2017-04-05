import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { PaginationUtil } from 'ng-jhipster';

import { GameRuleLotmicroComponent } from './game-rule-lotmicro.component';
import { GameRuleLotmicroDetailComponent } from './game-rule-lotmicro-detail.component';
import { GameRuleLotmicroPopupComponent } from './game-rule-lotmicro-dialog.component';
import { GameRuleLotmicroDeletePopupComponent } from './game-rule-lotmicro-delete-dialog.component';

import { Principal } from '../../shared';


export const gameRuleRoute: Routes = [
  {
    path: 'game-rule-lotmicro',
    component: GameRuleLotmicroComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'gatemicroApp.gameRule.home.title'
    }
  }, {
    path: 'game-rule-lotmicro/:id',
    component: GameRuleLotmicroDetailComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'gatemicroApp.gameRule.home.title'
    }
  }
];

export const gameRulePopupRoute: Routes = [
  {
    path: 'game-rule-lotmicro-new',
    component: GameRuleLotmicroPopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'gatemicroApp.gameRule.home.title'
    },
    outlet: 'popup'
  },
  {
    path: 'game-rule-lotmicro/:id/edit',
    component: GameRuleLotmicroPopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'gatemicroApp.gameRule.home.title'
    },
    outlet: 'popup'
  },
  {
    path: 'game-rule-lotmicro/:id/delete',
    component: GameRuleLotmicroDeletePopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'gatemicroApp.gameRule.home.title'
    },
    outlet: 'popup'
  }
];

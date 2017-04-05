import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { GatemicroRegisteredUserNotesModule } from './registered-user/registered-user-notes.module';
import { GatemicroLocationNotesModule } from './location/location-notes.module';
import { GatemicroTankNotesModule } from './tank/tank-notes.module';
import { GatemicroDeviceNotesModule } from './device/device-notes.module';
import { GatemicroMeterReadingNotesModule } from './meter-reading/meter-reading-notes.module';
import { GatemicroWaterChangeNotesModule } from './water-change/water-change-notes.module';
import { GatemicroLiveStockNotesModule } from './live-stock/live-stock-notes.module';
import { GatemicroChemicalAnalysisNotesModule } from './chemical-analysis/chemical-analysis-notes.module';
import { GatemicroChemicalsNotesModule } from './chemicals/chemicals-notes.module';
import { GatemicroOtherWorksNotesModule } from './other-works/other-works-notes.module';
import { GatemicroRankLotmicroModule } from './rank/rank-lotmicro.module';
import { GatemicroBonusRankLotmicroModule } from './bonus-rank/bonus-rank-lotmicro.module';
import { GatemicroGameLotmicroModule } from './game/game-lotmicro.module';
import { GatemicroGameRuleLotmicroModule } from './game-rule/game-rule-lotmicro.module';
import { GatemicroLocalPlayLotmicroModule } from './local-play/local-play-lotmicro.module';
import { GatemicroHistoryLotmicroModule } from './history/history-lotmicro.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        GatemicroRegisteredUserNotesModule,
        GatemicroLocationNotesModule,
        GatemicroTankNotesModule,
        GatemicroDeviceNotesModule,
        GatemicroMeterReadingNotesModule,
        GatemicroWaterChangeNotesModule,
        GatemicroLiveStockNotesModule,
        GatemicroChemicalAnalysisNotesModule,
        GatemicroChemicalsNotesModule,
        GatemicroOtherWorksNotesModule,
        GatemicroRankLotmicroModule,
        GatemicroBonusRankLotmicroModule,
        GatemicroGameLotmicroModule,
        GatemicroGameRuleLotmicroModule,
        GatemicroLocalPlayLotmicroModule,
        GatemicroHistoryLotmicroModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GatemicroEntityModule {}

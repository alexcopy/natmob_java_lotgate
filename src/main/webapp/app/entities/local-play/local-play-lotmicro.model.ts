
const enum GameType {
    'LOCAL',
    'MANUAL',
    'REJECTED',
    'REAL'

};

const enum GamesPlay {
    'EML',
    'NAT',
    'THB',
    'HOT',
    'EMLBONUS',
    'THBBONUS',
    'EMLBALLS',
    'NATBALLS',
    'THBBALLS'

};
export class LocalPlayLotmicro {
    constructor(
        public id?: number,
        public drawDate?: any,
        public draw?: string,
        public sumB?: number,
        public sumS?: number,
        public drawType?: string,
        public gameType?: GameType,
        public hash?: string,
        public prize?: number,
        public checked?: number,
        public bonusrankid?: number,
        public game?: GamesPlay,
        public rankId?: number,
        public bonusrankId?: number,
    ) {
    }
}

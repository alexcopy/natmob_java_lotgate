
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
        public checked?: number,
        public game?: GamesPlay,
        public rankId?: number,
        public bonusrankId?: number,
    ) {
    }
}


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
export class GameLotmicro {
    constructor(
        public id?: number,
        public gameName?: GamesPlay,
    ) {
    }
}

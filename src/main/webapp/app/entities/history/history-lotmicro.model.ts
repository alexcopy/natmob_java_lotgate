
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
export class HistoryLotmicro {
    constructor(
        public id?: number,
        public drawDate?: any,
        public ball1?: number,
        public ball2?: number,
        public ball3?: number,
        public ball4?: number,
        public ball5?: number,
        public ball6?: number,
        public bonusBall1?: number,
        public bonusBall2?: number,
        public drawNumber?: number,
        public ballSet?: string,
        public wins?: string,
        public machine?: string,
        public sumB?: number,
        public sumS?: number,
        public jackpot?: number,
        public hash?: string,
        public drawHash?: string,
        public game?: GamesPlay,
    ) {
    }
}

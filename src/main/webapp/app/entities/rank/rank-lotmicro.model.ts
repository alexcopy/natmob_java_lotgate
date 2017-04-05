export class RankLotmicro {
    constructor(
        public id?: number,
        public allNumbersRank?: number,
        public longOddEvenRank?: number,
        public shortOddEvenRank?: number,
        public shortHistorySumRank?: number,
        public longHistSumRank?: number,
        public summInHistRank?: number,
        public beenDrawnInPast?: number,
        public summInRecentHistRank?: number,
        public totalRank?: number,
    ) {
    }
}

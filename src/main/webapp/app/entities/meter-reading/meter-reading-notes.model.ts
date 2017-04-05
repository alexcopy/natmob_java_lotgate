export class MeterReadingNotes {
    constructor(
        public id?: number,
        public readingDate?: any,
        public reading?: number,
        public tempVal?: number,
        public timestamp?: number,
        public description?: string,
        public userId?: number,
    ) {
    }
}

export class WaterChangeNotes {
    constructor(
        public id?: number,
        public changeDate?: any,
        public readingBefore?: number,
        public readingAfter?: number,
        public tempVal?: number,
        public description?: string,
    ) {
    }
}


const enum StockCase {
    'ADDED',
    'REMOVED',
    'DIED',
    'HERON',
    'OTHER'

};
export class LiveStockNotes {
    constructor(
        public id?: number,
        public date?: any,
        public reason?: StockCase,
        public description?: string,
        public qty?: number,
        public tempVal?: number,
    ) {
    }
}

export class ChemicalAnalysisNotes {
    constructor(
        public id?: number,
        public date?: any,
        public nO2?: string,
        public nO3?: string,
        public nH4?: string,
        public ph?: string,
        public tempVal?: number,
        public timestamp?: number,
        public description?: string,
        public userId?: number,
    ) {
    }
}

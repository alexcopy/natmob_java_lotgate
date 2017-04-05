
const enum TankType {
    'POND',
    'AQUARIUM',
    'OTHER'

};
export class TankNotes {
    constructor(
        public id?: number,
        public tankName?: string,
        public tankType?: TankType,
        public description?: string,
        public timestamp?: number,
    ) {
    }
}


const enum DeviceType {
    'PUMP',
    'FILTER',
    'UVLAMP',
    'UVCLARIFIER',
    'AIRPUMP',
    'OTHER'

};
export class DeviceNotes {
    constructor(
        public id?: number,
        public deviceName?: string,
        public deviceType?: DeviceType,
        public description?: string,
        public timestamp?: number,
    ) {
    }
}

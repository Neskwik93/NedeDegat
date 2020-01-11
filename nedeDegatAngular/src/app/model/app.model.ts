export class Boss {
    name: string;
    saved: boolean;
    armure: string;
    pv: number;
    bd: number;
    constructor(info: any) {
        for (let k in info) {
            if (info.hasOwnProperty(k)) {
                this[k] = info[k];
            }
        }
    }
}

export class LigneDegat {
    min: number | string;
    max: number | string;
    plate: number | string;
    cuirrasse: number | string;
    ecaille: number | string;
    maille: number | string;
    cuirR: number | string;
    cuirS: number | string;
    sa: number | string;
}
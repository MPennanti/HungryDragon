import { IActionMap } from "../action/actionMap";
import MoveAction from "../action/moveAction";
import SleepAction from "../action/sleepAction";
import ZoneMap from "./zoneMap";
import Enemy from "../enemy";
import * as Random from "../../util/random";

export interface INearbyZones {
    nw?: string;
    n?: string;
    ne?: string;
    w?: string;
    c?: string;
    e?: string;
    sw?: string;
    s?: string;
    se?: string;
}

export interface IZoneConfig {
    id: string;
    name: string;
    description: string;
    monsters: Enemy[];
    monsterChance: number;
    nearbyZones: INearbyZones;
}

export default class Zone {
    public id: string;
    public name: string;
    public description: string;
    public monsters: Enemy[];
    public monsterChance: number;
    public nearbyZones: INearbyZones;

    constructor(zone: IZoneConfig) {
        this.id = zone.id;
        this.name = zone.name;
        this.description = zone.description;
        this.monsters = zone.monsters;
        this.monsterChance = zone.monsterChance;
        this.nearbyZones = zone.nearbyZones;
    }

    public getMonster(): Enemy {
        return Random.pick(this.monsters);
    }

    public getActionMap(): IActionMap {
        let actionConfig: IActionMap = {};
        Object.keys(this.nearbyZones).forEach((direction: string) => {
            let targetZone: string = this.nearbyZones[direction];
            if (targetZone) {
                if (targetZone === "sleep") {
                    actionConfig[direction] = new SleepAction();
                } else {
                    actionConfig[direction] = new MoveAction(ZoneMap[targetZone]);
                }
            }
        });
        return actionConfig;
    }
}

import { IActionMap } from "../action/actionMap";
import MoveAction from "../action/moveAction";
import SleepAction from "../action/sleepAction";
import Enemy from "../enemy";
import * as Random from "../../util/random";
import GameState from "../gameState";

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

type EnemyOrEnemyWeight = Enemy | [number, Enemy];

export interface IZoneConfig {
    id: string;
    name: string;
    description: string;
    monsters: EnemyOrEnemyWeight[];
    monsterChance: number;
    nearbyZones: INearbyZones;
}

export interface IZoneMap {
    [key: string]: Zone;
}

function expandMonsters(monsterConfig: EnemyOrEnemyWeight[]): Enemy[] {
    let result: Enemy[] = [];
    monsterConfig.forEach((value) => {
        if (Array.isArray(value)) {
            let [weight, enemy] = value;
            while (weight-- > 0) {
                result.push(enemy);
            }
        } else {
            result.push(value);
        }
    });
    return result;
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
        this.monsters = expandMonsters(zone.monsters);
        this.monsterChance = zone.monsterChance;
        this.nearbyZones = zone.nearbyZones;
    }

    public getMonster(): Enemy {
        return Random.pick(this.monsters);
    }

    public getActionMap(state: GameState): IActionMap {
        let actionConfig: IActionMap = {};
        Object.keys(this.nearbyZones).forEach((direction: string) => {
            let targetZone: string = this.nearbyZones[direction];
            if (targetZone) {
                if (targetZone === "sleep") {
                    actionConfig[direction] = new SleepAction();
                } else {
                    actionConfig[direction] = new MoveAction(state.getZone(targetZone));
                }
            }
        });
        return actionConfig;
    }

}

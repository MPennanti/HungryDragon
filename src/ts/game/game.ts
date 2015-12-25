import * as Immutable from "immutable";
import GameState from "./gameState";
import ActionMap, {IActionMap} from "./action/actionMap";
import Action from "./action/action";
import AttackAction from "./action/attackAction";
import DevourAction from "./action/devourAction";
import * as Helpers from "./gameHelpers";
import Zone from "./zone/zone";
import ZoneMap from "./zone/zoneMap";
import {strawPile} from "./zone/startingArea";
import * as Random from "../util/random";

export function turn(state: GameState, playerAction: Action): GameState {
    let result = state;

    if (playerAction.isEmpty) {
        return result;
    }

    result = Helpers.clearLog(result);

    if (result.player.IsAlive) {
        result = playerAction.execute(result, result.player);
        let zone = ZoneMap[result.zone];
        result = spawnMonster(result, zone);
        if (result.enemy) {
            result = enemyTurn(result);
        }
    }

    if (result.player.IsAlive === false) {
        result = Helpers.appendLog(result, "You are dead!");
    }

    return result;
}

export function enemyTurn(state: GameState): GameState {
    let result = state;
    let enemy = state.enemy;
    if (enemy.IsAlive) {
        let action = enemy.getAction();
        result = action.execute(state, enemy);
    }

    if (result.enemy.IsAlive === false) {
        result = Helpers.appendLog(result, `You have defeated the ${enemy.name}!`);
    }
    return result;
}

export function getAvailableActions(state: GameState): ActionMap {
    let availableActions: IActionMap = {};
    if (state.player.IsAlive) {
        if (state.enemy && state.enemy.IsAlive) {
            availableActions.c = new AttackAction();
        } else if (state.enemy) { // dead monster
            availableActions.c = new DevourAction();
        } else { // no monster
            availableActions = ZoneMap[state.zone].getActionMap();
        }
    }
    return ActionMap.from(availableActions);
}

export function spawnMonster(state: GameState, zone: Zone): GameState {
    let result = state;

    if (!result.enemy && result.canSpawn) {
        result = result.setCanSpawn(false);
        if (Random.bool(zone.monsterChance)) {
            result = result.setEnemy(zone.getMonster());
            result = Helpers.appendLog(result, `You encounter a ${result.enemy.name}!`);
        }
    }

    return result;
}

const defaultLog = Immutable.List<string>(["You wake up on a pile of straw."]);
export const defaultState = new GameState(Immutable.Map({
    log: defaultLog,
    zone: strawPile
}));

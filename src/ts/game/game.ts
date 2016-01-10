import * as Immutable from "immutable";
import GameState from "./gameState";
import ActionMap, {IActionMap} from "./action/actionMap";
import Action from "./action/action";
import AttackAction from "./action/attackAction";
import DevourAction from "./action/devourAction";
import RestAction from "./action/restAction";
import SpareMonsterAction from "./action/spareMonsterAction";
import * as Helpers from "./gameHelpers";
import Zone from "./zone/zone";
import AllZones from "./zone/allZones";
import {strawPile} from "./zone/startingArea";
import * as Random from "../util/random";

export function turn(state: GameState, playerAction: Action): GameState {
    let result = state;

    if (playerAction.isEmpty) {
        return result;
    }

    result = Helpers.clearLog(result);

    if (result.player.IsAlive) {
        result = playerAction.execute(result);

        if (result.player.IsOverfull) {
            result = Helpers.appendLog(result, "You moan and are unable to move much due to your dragging stomach.");
        }

        result = spawnMonster(result, result.getCurrentZone());

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
    let enemy = result.enemy;
    if (enemy.IsAlive) {
        result = Helpers.attack(result,  false);
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
            if (!state.player.IsOverfull && state.enemy.mass <= state.player.stomach) {
                availableActions.c = new DevourAction();
            }
            availableActions.s = new SpareMonsterAction();
        } else if (!state.player.IsOverfull) { // no monster
            availableActions = state.getCurrentZone().getActionMap(state);
        }
    }
    return ActionMap.from(availableActions);
}

export function getAuxiliaryActions(state: GameState): Action[] {
    let availableActions: Action[] = [];
    if (state.player.IsAlive && !state.enemy) {
        availableActions.push(new RestAction());
    }
    return availableActions;
}

export function spawnMonster(state: GameState, zone: Zone): GameState {
    let result = state;

    if (!result.enemy && result.canSpawn) {
        result = result.setCanSpawn(false);
        if (Random.bool(zone.monsterChance)) {
            result = result.setEnemy(zone.getMonster());
            result = Helpers.appendLog(result, result.enemy.foundText);
        }
    }

    return result;
}

const defaultLog = Immutable.List<string>(["You wake up on a pile of straw."]);
export const defaultState = new GameState(Immutable.Map({
    log: defaultLog,
    zone: strawPile.id,
    zoneMap: AllZones
}));

///<reference path="../../../typings/references.d.ts"/>
"use strict";

import GameState from "./gameState";
import ActionMap, {IActionMap} from "./action/actionMap";
import Action from "./action/action";
import AttackAction from "./action/attackAction";
import SpawnMonsterAction from "./action/spawnMonsterAction";
import DevourAction from "./action/devourAction";
import * as Helpers from "./gameHelpers";

export function turn(state: GameState, playerAction: Action): GameState {
    let result = state;

    if (playerAction.isEmpty) {
        return result;
    }

    result = Helpers.clearLog(result);

    if (result.player.IsAlive) {
        result = playerAction.execute(result, result.player);

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
        let action = enemy.defaultAction;
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
            availableActions.c = new SpawnMonsterAction();
        }
    }
    return ActionMap.from(availableActions);
}

export { defaultState } from "./gameState";

///<reference path="../../../typings/references.d.ts"/>
"use strict";

import GameState from "./gameState";
import ActionMap, {IActionMap} from "./actionMap";
import {Action, AttackAction} from "./action";
import * as Helpers from "./gameHelpers";
import {riceBag} from "./enemies";

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
        let newEnemy = riceBag;
        result = Helpers.appendLog(result, `You encounter a ${newEnemy.name}!`);
        result = result.setEnemy(newEnemy);
    }
    return result;
}

export function getAvailableActions(state: GameState): ActionMap {
    let availableActions: IActionMap = {};
    if (state.player.IsAlive) {
        availableActions.c = new AttackAction();
    }
    return ActionMap.from(availableActions);
}

export { defaultState } from "./gameState";

///<reference path="../../../typings/references.d.ts"/>
"use strict";

import GameState from "./gameState";
import {Action} from "./action";
import * as Helpers from "./gameHelpers";
import {riceBag} from "./enemies";

export function turn(state: GameState, playerAction: Action): GameState {
    let result = state;

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

export { defaultState } from "./gameState";

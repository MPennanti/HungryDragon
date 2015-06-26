///<reference path="../../../typings/references.d.ts"/>
"use strict";

import GameState from "./gameState";
import * as Immutable from "immutable";

export function tick(state: GameState, seconds: number): GameState {
    return state.setTime(state.time + Math.floor(seconds));
}

export function attack(state: GameState, random = Math.random): GameState {
    let actionLog: string[] = [];
    let result = state;

    if (result.player.IsAlive) {
        actionLog.push("You hit the rice bag for 1 hp!");
        if (random() < .5) {
            actionLog.push("The rice bag falls on you doing 1 damage");
            result = result.setPlayer(result.player.setHealth(result.player.health - 1));
        }
    }

    if (result.player.IsAlive === false) {
        actionLog.push("You are dead!");
    }

    result = result.setLog(Immutable.List<string>(actionLog));
    return result;
}

export { defaultState } from "./gameState";

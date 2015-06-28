///<reference path="../../../typings/references.d.ts"/>
"use strict";

import * as Immutable from "immutable";
import GameState from "./gameState";

export function tick(state: GameState, seconds: number): GameState {
    return state.setTime(state.time + Math.floor(seconds));
}

export function clearLog(state: GameState): GameState {
    return state.setLog(Immutable.List<string>());
}

export function appendLog(state: GameState, message: string): GameState {
    return state.setLog(state.log.push(message));
}

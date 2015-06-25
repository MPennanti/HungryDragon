///<reference path="../../../typings/references.d.ts"/>
"use strict";
import GameState from "./gameState";

export function tick(state: GameState, seconds: number): GameState {
    return state.setTime(state.time + Math.floor(seconds));
}

export { defaultState } from "./gameState";

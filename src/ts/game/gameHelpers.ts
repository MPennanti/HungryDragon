///<reference path="../../../typings/references.d.ts"/>
"use strict";

import * as Immutable from "immutable";
import GameState, {HOUR_LENGTH} from "./gameState";

export function tick(state: GameState, seconds: number): GameState {
    seconds = Math.floor(seconds);
    let result = state.setTime(state.time + seconds);
    result = digest(result, seconds);
    return result;
}

export function digest(state: GameState, seconds: number): GameState {
    seconds = Math.floor(seconds);
    let result = state;
    let player = result.player;
    let fullness = result.player.stomachFullness / result.player.stomachSize;

    if (player.stomachFullness > 0) {
        // 8 hours to empty, 12.5% per hour
        let digestionAmount = seconds / HOUR_LENGTH * .125 * player.stomachSize;
        let originalFullness = fullness;
        player = player.setStomachFullness(player.stomachFullness - digestionAmount);
        fullness = player.stomachFullness / player.stomachSize;
        // heal 100% for 100% stomach digestion
        if (player.health < player.maxHealth) {
            let healAmount = (originalFullness - fullness) * player.maxHealth;
            player = player.setHealth(player.health + healAmount);
        }
        result = result.setPlayer(player);
    }

    // TODO: more random digest flavor text
    let message = "Your stomach gurgles happily.";
    if (result.player.IsOverfull) {
        message = "Your stomach groans and tries to digest its massive meal.";
    } else if (fullness === 0) {
        message = "Your stomach growls, ravenous.";
    } else if (fullness >= 1) {
        message = "Your stomach revels in fullness.";
    } else if (fullness < .15) {
        message = "Your stomach rumbles hungrily.";
    }
    result = appendLog(result, message);

    return result;
}

export function clearLog(state: GameState): GameState {
    return state.setLog(Immutable.List<string>());
}

export function appendLog(state: GameState, message: string): GameState {
    return state.setLog(state.log.push(message));
}

///<reference path="../../../typings/references.d.ts"/>
"use strict";

import * as Immutable from "immutable";
import GameState, {HOUR_LENGTH} from "./gameState";
import Player from "./player";

const GROWTH_RATE = .05;

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
    let fullness = result.player.stomachFullness / result.player.stomach;

    if (player.stomachFullness > 0) {
        // 8 hours to empty, 12.5% per hour
        let digestionAmount = seconds / HOUR_LENGTH * .125 * player.stomach;
        let originalFullness = fullness;
        player = player.setStomachFullness(player.stomachFullness - digestionAmount);
        fullness = player.stomachFullness / player.stomach;
        // heal 100% for 100% stomach digestion
        if (player.health < player.maxHealth) {
            let healAmount = (originalFullness - fullness) * player.maxHealth;
            player = player.setHealth(player.health + healAmount);
        }
        // above 25% stomach capacity, we're going to grow
        if (originalFullness > .25) {
            let growthFactor = (originalFullness - Math.max(fullness, .25));
            let newMass = player.mass + growthFactor / .75 * GROWTH_RATE * player.mass;
            player = updatePlayerMass(player, newMass);
        }
        result = result.setPlayer(player);
    }

    result = appendLog(result, getStomachText(fullness, result.player.IsOverfull));

    return result;
}

// TODO: more random digest flavor text
export function getStomachText(fullness: number, isOverfull: boolean): string {
    let message = "Your stomach gurgles happily.";
    if (isOverfull) {
        message = "Your stomach groans and tries to digest its massive meal.";
    } else if (fullness === 0) {
        message = "Your stomach growls, ravenous.";
    } else if (fullness >= 1) {
        message = "Your stomach revels in fullness.";
    } else if (fullness < .15) {
        message = "Your stomach rumbles hungrily.";
    }
    return message;
}

export function updatePlayerMass(player: Player, mass: number): Player {
    player = player.setMass(mass);
    player = player.setStomach(mass / 2);
    // health and damage scale linearly with size
    let size = player.size;
    let newMaxHealth = Math.round(size * 1.07407 - 22.2222);
    player = player.setMaxHealth(newMaxHealth);
    let newDamage = Math.round(size * 0.36667 - 10);
    player = player.setHitDamage(newDamage);
    return player;
}

export function clearLog(state: GameState): GameState {
    return state.setLog(Immutable.List<string>());
}

export function appendLog(state: GameState, message: string): GameState {
    return state.setLog(state.log.push(message));
}

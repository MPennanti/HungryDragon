import * as Immutable from "immutable";
import GameState, {HOUR_LENGTH} from "./gameState";
import Player from "./player";
import * as Random from "../util/random";
import Entity from "./entity";
import Enemy from "./enemy";

const GROWTH_RATE = .05;
// when stomach is more than 100% full, the player grows
const GROWTH_THRESHOLD = 1;

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
        // above stomach capacity, we're going to grow
        if (originalFullness > GROWTH_THRESHOLD) {
            let growthFactor = (originalFullness - Math.max(fullness, GROWTH_THRESHOLD));
            let newMass = player.mass + growthFactor * GROWTH_RATE * player.mass;
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

export function attack(state: GameState, isPlayer: boolean = true): GameState {
    let result = state;
    let target: Entity;
    let actor: Entity;
    let damageText: string;

    if (isPlayer) {
        target = state.enemy;
        actor = state.player;
        damageText = state.enemy.damageTakenText;
    } else {
        target = state.player;
        actor = state.enemy;
        damageText = state.enemy.damageDealtText;
    }

    if (target && Random.bool(actor.hitChance)) {
        let max = actor.hitDamage;
        let min = Math.max(1, Math.floor(max * 0.7));
        let damage = Random.integer(min, max);
        result = appendLog(result, `${damageText} (-${damage} hp)`);
        target = target.setHealth(target.health - damage);

        if (isPlayer) {
            result = result.setEnemy(target as Enemy);
        } else {
            result = result.setPlayer(target as Player);
        }
    } else if (target) { // missed
        if (isPlayer) {
            result = appendLog(result, "Your attack misses your opponent!");
        } else {
            result = appendLog(result, "Your opponent tries to attack you, but misses!");
        }
    }
    return result;
}

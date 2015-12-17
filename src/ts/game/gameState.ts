///<reference path="../../../typings/references.d.ts"/>
"use strict";
import * as Immutable from "immutable";
import Model from "./model";
import Player, { newPlayer } from "./player";
import Enemy from "./enemy";

export const MINUTE_LENGTH = 60;
export const HOUR_LENGTH = MINUTE_LENGTH * 60;
export const DAY_LENGTH = HOUR_LENGTH * 24;

const emptyList = Immutable.List<any>();

export default class GameState extends Model {

    /**
     * The time in seconds.
     */
    public get time(): number {
        return this._data.get("time", 0);
    }

    public setTime(time: number): GameState {
        return this.set("time", time);
    }

    /**
     * The day from the start of the game
     */
    public get day(): number {
        return Math.floor(this.time / DAY_LENGTH);
    }

    /**
     * The current hour
     */
    public get hour(): number {
        return Math.floor((this.time % DAY_LENGTH) / HOUR_LENGTH);
    }

    /**
     * The current minute
     */
    public get minute(): number {
        return Math.floor((this.time % HOUR_LENGTH) / MINUTE_LENGTH);
    }

    /**
     * The current second
     */
    public get second(): number {
        return this.time % MINUTE_LENGTH;
    }

    /**
     * Formats the time like Day 5 [12:53]
     */
    public get prettyTime(): string {
        return `Day ${this.day} [${this.leftPad(this.hour)}:${this.leftPad(this.minute)}]`;
    }

    /**
     * The current list of actions to print to the player
     */
    public get log(): Immutable.List<string> {
        return this._data.get("log", emptyList);
    }

    public setLog(log: Immutable.List<string>): GameState {
        return this.set("log", log);
    }

    /**
     * The player herself
     */
    public get player(): Player {
        return this._data.get("player", newPlayer);
    }

    public setPlayer(player: Player): GameState {
        return this.set("player", player);
    }

    /**
     * The current active enemy (if one exists)
     */
    public get enemy(): Enemy {
        return this._data.get("enemy");
    }

    public setEnemy(enemy: Enemy): GameState {
        return this.set("enemy", enemy);
    }

    private leftPad(num: number): string {
        return num < 10 ? "0" + num : num.toString();
    }

}

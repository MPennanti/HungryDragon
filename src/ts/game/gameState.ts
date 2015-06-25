///<reference path="../../../typings/references.d.ts"/>
"use strict";
import Model from "./model";
import * as Immutable from "immutable";

export const MINUTE_LENGTH = 60;
export const HOUR_LENGTH = MINUTE_LENGTH * 60;
export const DAY_LENGTH = HOUR_LENGTH * 24;

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

    private set(name: string, value: any): GameState {
        return this.setValue(GameState, name, value);
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

    private leftPad(num: number): string {
        return num < 10 ? "0" + num : num.toString();
    }

}

export const defaultState = new GameState(Immutable.Map({}));

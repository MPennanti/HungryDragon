///<reference path="../../../../typings/references.d.ts"/>
"use strict";

import GameState from "../gameState";
import Entity from "../entity";
import Player from "../player";
import Enemy from "../enemy";

export default class Action {

    public name = "";
    public isEmpty = false;

    protected _actor: Entity;
    protected _target: Entity;
    protected _isPlayer: boolean;

    public execute(state: GameState, actor: Entity): GameState {

        this._actor = actor;
        if (state.player === actor) {
            this._target = state.enemy;
            this._isPlayer = true;
        } else {
            this._target = state.player;
            this._isPlayer = false;
        }

        //TODO: handle action time and validity
        let result = this.doExecute(state);

        if (this.player !== state.player) {
            result = result.setPlayer(this.player as Player);
        }
        if (this.enemy !== state.enemy) {
            result = result.setEnemy(this.enemy as Enemy);
        }

        return result;
    }

    protected get player(): Entity {
        return this._isPlayer ? this._actor : this._target;
    }

    protected get enemy(): Entity {
        return this._isPlayer ? this._target : this._actor;
    }

    protected doExecute(state: GameState): GameState {
        throw new Error("Override this in your action helper");
    }

}

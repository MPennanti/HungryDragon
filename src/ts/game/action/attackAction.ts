///<reference path="../../../../typings/references.d.ts"/>
"use strict";

import GameState from "../gameState";
import * as Helpers from "../gameHelpers";
import {format} from "../../util/string";
import Action from "./action";

export default class AttackAction extends Action {
    public name = "Attack";

    protected doExecute(state: GameState): GameState {
        let result = state;

        if (this._target && Math.random() < this._actor.hitChance) {
            let damage = this._actor.hitDamage;
            result = Helpers.appendLog(state, format(this._actor.damageText, damage, this._target.name));
            this._target = this._target.setHealth(this._target.health - damage);
        }
        return result;
    }
}

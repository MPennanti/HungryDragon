///<reference path="../../../../typings/references.d.ts"/>
"use strict";

import GameState from "../gameState";
import * as Helpers from "../gameHelpers";
import Action from "./action";

export default class DevourAction extends Action {
    public name = "Devour";

    protected doExecute(state: GameState): GameState {
        let result = state;
        let enemy = state.enemy;

        if (enemy) {
            result = Helpers.appendLog(result, `You consume the ${enemy.name}!`);
            this._actor = this._actor.setStomachFullness(this._actor.stomachFullness + enemy.mass);
            this._target = null;
        }
        return result;
    }
}

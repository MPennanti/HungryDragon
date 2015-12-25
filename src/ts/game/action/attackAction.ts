import GameState from "../gameState";
import * as Helpers from "../gameHelpers";
import {format} from "../../util/string";
import * as Random from "../../util/random";
import Action from "./action";

export default class AttackAction extends Action {
    public name = "Attack";

    protected doExecute(state: GameState): GameState {
        let result = state;

        if (this._target && Random.bool(this._actor.hitChance)) {
            let max = this._actor.hitDamage;
            let min = Math.max(1, Math.floor(max * 0.7));
            let damage = Random.integer(min, max);
            result = Helpers.appendLog(state, format(this._actor.damageText, damage, this._target.name));
            this._target = this._target.setHealth(this._target.health - damage);
        }
        return result;
    }
}

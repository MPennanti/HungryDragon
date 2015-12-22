import GameState from "../gameState";
import * as Helpers from "../gameHelpers";
import Action from "./action";
import Player from "../player";

export default class DevourAction extends Action {
    public name = "Devour";

    protected doExecute(state: GameState): GameState {
        let result = state;
        let enemy = state.enemy;

        if (enemy) {
            result = Helpers.appendLog(result, `You consume the ${enemy.name}!`);
            // todo: find a more clever way of doing this
            let player = this._actor as Player;
            this._actor = player.setStomachFullness(player.stomachFullness + enemy.mass);
            this._target = null;
        }
        return result;
    }
}
